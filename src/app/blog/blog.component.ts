import {Component, Input} from '@angular/core';
import {Post} from "../post/post";
import {PostServiceService} from "../post-service.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  posts?: Post[];
  @Input() page: number = 0;
  hasNextPage: boolean = true;
  type: string = 'any';

  constructor(private postService: PostServiceService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.type = this.route.snapshot.data['type'];
    this.route.data.subscribe(({postData}) => {
      this.posts = postData.data;
      this.hasNextPage = postData.hasMore;
    });
    this.postService.getPosts(this.type, this.page + 1).subscribe(v => {}); // preload next page
    }

  previousPage(): void {
    this.page -= 1;
    this.postService.getPosts(this.type ?? 'any', this.page).subscribe(v => {
      this.posts = v.data;
      this.hasNextPage = v.hasMore;
    });
    window.scroll(0,0);
  }

  nextPage(): void {
    this.page += 1;
    this.postService.getPosts(this.type, this.page).subscribe(v => {
      this.posts = v.data;
      this.hasNextPage = v.hasMore;
    });
    this.postService.getPosts(this.type, this.page + 1).subscribe(v => {}); // preload next page
    window.scroll(0,0);
  }
}
