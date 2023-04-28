import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {PostServiceService} from "./post-service.service";
import {Post} from "./post/post";
import {Content} from "./content-block/content";

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<{post: Post, contents: Content[]}> {

  constructor(private postService: PostServiceService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{post: Post, contents: Content[]}> {
    const name = route.paramMap.get('postUrl') ?? '';
    return this.postService.getPostByName(name);
  }
}
