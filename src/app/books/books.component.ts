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

  constructor(private postService: PostServiceService) {}

  ngOnInit() {
    this.postService.$postLookup.subscribe(v => {
      this.posts = v.data;
      this.hasNextPage = v.hasMore;
    });
    this.postService.getPosts("book", this.page);
  }

  previousPage(): void {
    this.page -= 1;
    this.postService.getPosts("book", this.page);
    window.scroll(0,0);
  }

  nextPage(): void {
    this.postService.getPosts("book", this.page);
    window.scroll(0,0);
  }
}
