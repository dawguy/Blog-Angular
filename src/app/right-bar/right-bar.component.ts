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

  constructor(private postService: PostServiceService) {}
  ngOnInit() {
    this.postService.getRecentPosts("blog").subscribe(posts => this.blogPosts = posts);
    this.postService.getRecentPosts("project").subscribe(posts => this.projectPosts = posts);
  }
}
