import { Component } from '@angular/core';
import {Post} from "../post/post";
import {PostServiceService} from "../post-service.service";
import {ActivatedRoute, Params} from "@angular/router";
import {DraftService} from "../draft.service";

@Component({
  selector: 'app-draft-post',
  templateUrl: '../post/post.component.html',
  styleUrls: ['../post/post.component.css']
})
export class DraftPostComponent {
  post: Post;
  fullPost: boolean;

  constructor(private postService: PostServiceService,
              private draftService: DraftService,
              private route: ActivatedRoute) {}

  ngOnInit(){
    console.log("post component")
    this.route.params.forEach((params: Params) => {
      console.log(params);
      if(params['postUrl'] !== undefined) {
        const id = params['postUrl'];
        this.fullPost = true;
        this.postService.getDraftPost(id).subscribe(v => {
          this.post = v;
        })
      } else {
        this.fullPost = false;
        this.post = new Post();
      }
    })
  }
}
