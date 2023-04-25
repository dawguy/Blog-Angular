import {Component, Input} from '@angular/core';
import {Post} from "../post/post";
import {PostServiceService} from "../post-service.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  posts?: Post[];
  @Input() page: number = 0;

  constructor(private postService: PostServiceService) {
    this.postService.$recentBlogPosts.subscribe(p => this.posts = p);
  }

  ngOnInit() {}
}
