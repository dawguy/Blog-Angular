import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, of, pipe, share, Subject, tap, throwError} from "rxjs";
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

  $postLookup : Subject<{data: Post[], hasMore: boolean}> = new Subject();

  posts : {
            [type: string]: {
              [page: number]: {
                data: Post[],
                hasMore: boolean,
              }
            }
          } = {};
  limit : number = 10;

  constructor(private http: HttpClient,
              private draftService: DraftService) {
    this.$recentBlogPosts = this.getRecentPosts("blog");
    this.$recentProjectPosts = this.getRecentPosts("project");
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

  getDraftPostText(postId: string): Observable<string> {
    const opts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/html',
      }),
      responseType: 'text' as 'text'
    };

    return this.http
      .get(`${this.draftPostUrl}/${postId}`, opts)
      .pipe(map( data => data), catchError(this.handleError));
  }

  getRecentPosts(type?: string): Observable<Post[]> {
    let httpParams = new HttpParams();
    if(type && type != "all"){
      httpParams = httpParams.append("type", type);
    }

    return this.http
      .get<Post[]>(`${this.backendUrl}/post/recent`, {
        params: httpParams
      })
      .pipe(map(data => data.slice(0, this.limit)), catchError(this.handleError))
  }

  getPosts(type?: string, page?: number): void {
    const t = type ?? 'all';
    const p = page ?? 0;

    // https://github.com/tc39/proposal-optional-chaining
    if(this.posts?.[t]?.[p]){
      console.log(`Returning cached data for ${t} at page ${p}.`)
      this.$postLookup.next(this.posts[t][p]);
      return;
    }

    let httpParams = new HttpParams()
      .append("type", t)
      .append("page", p);

    this.http
      .get<Post[]>(`${this.backendUrl}/post/recent`, {
        params: httpParams
      })
      .pipe(map(data => data), catchError(this.handleError))
      .subscribe(data => {
        if(typeof this.posts[t] == 'undefined' || this.posts[t] == null){
          this.posts[t] = {};
        }
        this.posts[t][p] = {
          data: data.slice(0, this.limit),
          hasMore: data.length >= this.limit,
        };

        this.$postLookup.next(this.posts[t][p]);
      });
  }

  savePost(postText: string): Observable<any> {
    const body = {
      "text": postText
    };
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http
      .post<any>(`${this.backendUrl}/post/save`, body, {"headers": headers})
      .pipe(map(data => data), catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return throwError(res.error || 'Server error');
  }
}
