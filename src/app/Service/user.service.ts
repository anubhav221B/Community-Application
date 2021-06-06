import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IResponse } from '../Model/Response';
import { IUser } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.hostUrl;
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private u = JSON.parse(localStorage.getItem('user'));
  private user = new BehaviorSubject<string>(this.u?this.u.fName:null);

  constructor(private http: HttpClient) { }

  authenticate(login: IUser): Observable<IResponse> {
    return this.http.post<IResponse>(this.url + "authenticate", login).pipe(catchError(this.handleError),
      map(result => {

        // login successful if there's a jwt token in the response
        if (result && result.jwt) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          this.loginStatus.next(true);
          localStorage.setItem('loginStatus', '1');
          localStorage.setItem('jwt', result.jwt);
          localStorage.setItem('user', JSON.stringify(result.user));
          var u =JSON.parse(localStorage.getItem('user'));
          this.user.next(u.fName);
        }
        return result;
      })
    );
  }

  register(user: IUser): Observable<IUser>{
    return this.http.post<IUser>(this.url + "register", user).pipe(catchError(this.handleError));
  }

  checkLoginStatus(): boolean {
    var loginCookie = localStorage.getItem("loginStatus");

    if (loginCookie == "1") {
      if (localStorage.getItem('jwt') === null || localStorage.getItem('jwt') === undefined) {
        return false;
      }
      return true;
    }
    return false;
  }

  get isLoggesIn() {
    return this.loginStatus.asObservable();
  }

  get currentUser() {
    return this.user.asObservable();
  }

  getToken(){
    return localStorage.getItem("jwt");
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    }else if (err.status === 401) {
      // If invalid JWT or credencial
      errorMessage = "Unauthorized User or Invalid Credencial";
      localStorage.clear();
    }else if(err.status === 500){
       // If user Already Exist
       errorMessage = "User Already Exists";
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Internal Server Error`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
