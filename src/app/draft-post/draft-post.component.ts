import { Component } from '@angular/core';
import {Post} from "../post/post";
import {PostServiceService} from "../post-service.service";
import {ActivatedRoute, Params} from "@angular/router";
import {DraftService} from "../draft.service";
import {map, share, tap} from "rxjs";

@Component({
  selector: 'app-draft-post',
  templateUrl: 'draft-post.component.html',
  styleUrls: ['../post/post.component.css']
})
export class DraftPostComponent {
  postText: string = "";
  post: Post = new Post();
  fullPost: boolean;

  constructor(private postService: PostServiceService,
              private draftService: DraftService,
              private route: ActivatedRoute) {}

  ngOnInit(){
    console.log("draft post component")

    this.route.params.forEach((params: Params) => {
      console.log(params);
      if(params['postUrl'] !== undefined) {
        const id = params['postUrl'];
        this.fullPost = true;
        this.postService.getDraftPostText(id)
          .pipe(tap(s => {
            this.postText = s;
          }))
          .pipe(map(s => {
            return this.draftService.getDraftPost(s);
          }))
          .subscribe(p => {
            this.post = p;
          });
      } else {
        this.fullPost = false;
        this.post = new Post();
      }
    })
  }

  savePost(text: string) {
    console.log("Save Post clicked");
    this.postService.savePost(text)
      .subscribe(v => {
        alert("Post saved!");
      });
  }
}
