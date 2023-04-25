import { Component } from '@angular/core';
import {PostServiceService} from "../post-service.service";
import {Post} from "../post/post";

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.css']
})
export class RightBarComponent {

  projectPosts?: Post[];
  blogPosts?: Post[];

  constructor(private postService: PostServiceService) {
    this.postService.$recentBlogPosts.subscribe(posts => this.blogPosts = posts);
    this.postService.$recentProjectPosts.subscribe(posts => this.projectPosts = posts);
  }
  ngOnInit() {}
}
