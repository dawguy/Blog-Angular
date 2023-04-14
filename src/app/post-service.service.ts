import { Injectable } from '@angular/core';
import {Content} from "./content-block/content";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  public postUrl = 'http://localhost:8080/posts';

  constructor(private http: HttpClient) { }

  getPost(postId: string): Observable<Content> {
    return this.http
      .get<Content>(`${this.postUrl}/${postId}`)
      .pipe(map(data => data), catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return throwError(res.error || 'Server error');
  }
}
