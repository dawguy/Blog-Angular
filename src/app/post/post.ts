import {Content} from "../content-block/content";

export class Post {
  postId: string;
  content: Content[];
  summary: string;
  title: string;
  type: string;

  constructor(postId?: string, content?: Content[], summary?: string, title?: string, type?: string) {
    this.postId = postId ?? '';
    this.content = content ?? [];
    this.summary = summary ?? '';
    this.title =  title ?? '';
    this.type = type ?? '';
  }
}
