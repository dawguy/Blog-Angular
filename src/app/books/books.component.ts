import {Component, Input} from '@angular/core';
import {Post} from "../post/post";
import {PostServiceService} from "../post-service.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  posts?: Post[];
  @Input() page: number = 0;
  hasNextPage: boolean = true;

  constructor(private postService: PostServiceService) {
    this.postService.getRecentPosts("book").subscribe(p => this.posts = p);
  }

  ngOnInit() {}

  previousPage(): void {

  }

  nextPage(): void {

  }
}
