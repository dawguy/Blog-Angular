import {Component, Input} from '@angular/core';
import {Content} from "../content-block/content";
import {HttpClient} from "@angular/common/http";
import {PostServiceService} from "../post-service.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Post} from "./post";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post: Post;
  @Input() draftPost: boolean;

  fullPost: boolean;

  constructor(private postService: PostServiceService,
              private route: ActivatedRoute) {}

  ngOnInit(){
    console.log("post component")

    this.route.data.subscribe(({data}) => {
      let p = data.post;
      let c = data.contents;
      p.content = c;
      this.post = p;
    });
    if(typeof this.post == 'undefined' || this.post == null){
      this.route.params.forEach((params: Params) => {
        console.log(params);
        if(params['postUrl'] !== undefined) {
          this.fullPost = true;
        } else {
          this.fullPost = false;
          this.post = new Post();
        }
      })
    }
  }



}
