import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, of, share, throwError} from "rxjs";
import {Post} from "./post/post";
import {DraftService} from "./draft.service";
import {Content} from "./content-block/content";

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  public backendUrl = 'http://localhost:8888';
  public draftPostUrl = '/assets/draft-posts';

  $recentBlogPosts : Observable<Post[]>;
  $recentProjectPosts : Observable<Post[]>;

  constructor(private http: HttpClient,
              private draftService: DraftService) {
    this.$recentBlogPosts = this.getRecentPosts("blog").pipe(share());
    this.$recentProjectPosts = this.getRecentPosts("project").pipe(share());
  }

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

  getRecentPosts(type?: string, page?: number): Observable<Post[]> {
    let httpParams = new HttpParams();
    if(type && type != "all"){
      httpParams = httpParams.append("type", type);
    }
    if(page){
      httpParams = httpParams.append("page", page);
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
