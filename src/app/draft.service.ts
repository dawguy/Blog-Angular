import { Injectable } from '@angular/core';
import {Post} from "./post/post";
import {Content} from "./content-block/content";
import {Line} from "./content-block/line";

@Injectable({
  providedIn: 'root'
})
export class DraftService {

  constructor() {}

  getDraftPost(s: string): Post {
    let blocks = s.split('---');

    let lines = blocks.map(b => {
      return b.split('\n')
              .filter(s => s.length > 0) // Get non empty lines
              .map(s => s.trim());
    }).filter( b => b.length > 0);

    if(lines.length == 0){
      return new Post();
    }

    let type = lines[0][0] ?? "blog";
    let title = lines[0][1] ?? "EMPTY DRAFT TITLE";
    let url = lines[0][2] ?? "new-draft-post";
    let summary = lines[0][3] ?? "";

    lines = lines.slice(1);

    let content = lines.map((b, i) => {
      return new Content(b[0], b.slice(1).map(s => new Line(s)), i);
    });

    let post = new Post(content, summary, title, type, url);

    // console.log(lines);
    // console.log(content);
    // console.log(post);

    return post;
  }
}
