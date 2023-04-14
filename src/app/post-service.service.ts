import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {Post} from "./post/post";
import {DraftService} from "./draft.service";

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  public postUrl = 'http://localhost:8080/posts';
  public draftPostUrl = '/assets/draft-posts';

  constructor(private http: HttpClient,
              private draftService: DraftService) { }

  getPost(postId: string): Observable<Post> {
    return this.http
      .get<Post>(`${this.postUrl}/${postId}`)
      .pipe(map(data => data), catchError(this.handleError));
  }

  getDraftPost(postId: string): Observable<Post> {
    const opts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/html',
      }),
      responseType: 'text' as 'text'
    };

    return this.http
      .get(`${this.draftPostUrl}/${postId}`, opts)
      .pipe(map( data => this.draftService.getDraftPost(data)), catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return throwError(res.error || 'Server error');
  }
}
