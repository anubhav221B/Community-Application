import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { IStatus } from '../Model/Status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private url = environment.hostUrl + "status";

  constructor(private http: HttpClient) { }

  getStatus(): Observable<IStatus>{
    return this.http.get<IStatus>(this.url).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    }else if (err.status === 401) {
      // If invalid JWT
      errorMessage = "Unauthorized User Login Again";
      localStorage.clear();
      location.reload();
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Internal Server Error`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
