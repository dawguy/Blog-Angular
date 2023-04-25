import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {Post} from "./post/post";
import {DraftService} from "./draft.service";
import {Content} from "./content-block/content";

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  public backendUrl = 'http://localhost:8888';
  public draftPostUrl = '/assets/draft-posts';

  constructor(private http: HttpClient,
              private draftService: DraftService) { }

  getPostById(postId: string): Observable<Post> {
    return this.http
      .get<Post>(`${this.backendUrl}/post/id/${postId}`)
      .pipe(map(data => data), catchError(this.handleError));
  }

  getPostByName(name: string): Observable<{post: Post, contents: Content[]}> {
    return this.http
      .get<{post: Post, contents: Content[]}>(`${this.backendUrl}/post/name/${name}`)
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

  getRecentPosts(type?: string): Observable<Post[]> {
    let httpParams = new HttpParams();
    if(type){
      httpParams = httpParams.append("type", type);
    }

    return this.http
      .get<Post[]>(`${this.backendUrl}/post/recent`, {
        params: httpParams
      })
      .pipe(map(data => data), catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return throwError(res.error || 'Server error');
  }
}
