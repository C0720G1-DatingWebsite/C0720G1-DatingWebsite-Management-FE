import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {IComment} from "../entity/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,PATCH'
  };
  private apiCommentUrl = 'http://localhost:8080/api/public/comment/';

  constructor(private httpClient: HttpClient) {
  }

  findByIdComment(idComment): Observable<IComment> {
    return this.httpClient.get<IComment>(this.apiCommentUrl + 'findById/' + idComment)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  editComment(idComment, comment): Observable<IComment> {
    return this.httpClient.put<IComment>(this.apiCommentUrl + 'update/' + idComment, comment)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllCommentSize(id: number, page: number, size: number):Observable<any> {
    return this.httpClient.get<any>(this.apiCommentUrl + 'findById/' + id + '/comment?page=' + page + '&size=' + size, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllReplySize(id: number, page: number, size: number):Observable<any> {
    return this.httpClient.get<any>(this.apiCommentUrl + 'findById/' + id + '/reply?page=' + page + '&size=' + size, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllReply(id: number, page: number): Observable<any>{
    return this.httpClient.get<any>(this.apiCommentUrl + 'findById/' + id + '/page-reply?page=' + page, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  saveReply(reply): Observable<IComment> {
    return this.httpClient.post<IComment>(this.apiCommentUrl + 'create-reply', reply, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
