import {Component, Input} from '@angular/core';
import {Content} from "../content-block/content";
import {HttpClient} from "@angular/common/http";
import {PostServiceService} from "../post-service.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  content: Content[];
  fullPost: boolean;

  constructor(private postService: PostServiceService,
              private route: ActivatedRoute) {}

  ngOnInit(){
    this.route.params.forEach((params: Params) => {
      if(params['id'] !== undefined) {
        const id = params['id'];
        this.fullPost = true;
        this.postService.getPost(id).subscribe(v => {
          // this.content = v;
        })
      } else {
        this.fullPost = false;
        // this.content = new Content();
      }
    })
  }



}
