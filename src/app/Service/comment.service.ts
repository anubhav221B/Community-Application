import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IComment } from '../Model/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = environment.hostUrl + "comment";

  constructor(private http: HttpClient, private router: Router) { }

  postComment(comment: IComment, id: number): Observable<IComment>{
    return this.http.post<IComment>(this.url+"/"+id, comment).pipe(catchError(this.handleError));
  }

  likeComment(id: number): Observable<IComment>{
    return this.http.put<IComment>(this.url+"/like/"+id,"").pipe(catchError(this.handleError));
  }

  correctComment(id: number): Observable<IComment>{
    return this.http.put<IComment>(this.url+"/correct/"+id,"").pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    }else if (err.status === 401) {
      // If invalid JWT
      errorMessage = "Unauthorized User Please Login Again";
      localStorage.clear();
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Internal Server Error`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
