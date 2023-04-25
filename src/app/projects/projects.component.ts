import {Component, Input} from '@angular/core';
import {Post} from "../post/post";
import {PostServiceService} from "../post-service.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  posts?: Post[];
  @Input() page: number = 0;

  constructor(private postService: PostServiceService) {}

  ngOnInit() {
    this.postService.$recentProjectPosts.subscribe(p => this.posts = p);
  }
}
