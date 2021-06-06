import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IQuestion } from '../Model/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private url = environment.hostUrl + "questions";

  constructor(private http: HttpClient) { }

  postQuestion(question: IQuestion): Observable<IQuestion>{
    return this.http.post<IQuestion>(this.url, question).pipe(catchError(this.handleError));
  }

  searchQuestion(searchParams: object): Observable<[IQuestion]>{
    return this.http.post<[IQuestion]>(this.url+"/search", searchParams).pipe(catchError(this.handleError));
  }

  getQuestions(): Observable<[IQuestion]>{
    return this.http.get<[IQuestion]>(this.url).pipe(catchError(this.handleError));
  }

  getQuestion(id: number): Observable<IQuestion>{
    return this.http.get<IQuestion>(this.url+"/"+id).pipe(catchError(this.handleError));
  }

  setLocalQuestion(localQuestion: string){
    localStorage.setItem("question",localQuestion);
  }

  getLocalQuestion(){
    return localStorage.getItem("question");
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
