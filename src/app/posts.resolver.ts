import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Post} from "./post/post";
import {PostServiceService} from "./post-service.service";

@Injectable({
  providedIn: 'root'
})
export class PostsResolver implements Resolve<{ data: Post[], hasMore: boolean }> {
  constructor(private postService: PostServiceService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ data: Post[], hasMore: boolean }> {
    const type = route.data['type'];
    return this.postService.getPosts(type, 0);
  }
}
