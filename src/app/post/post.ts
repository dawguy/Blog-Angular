import {Content} from "../content-block/content";

export class Post {
  post_id: string;
  content: Content[];
  summary: string;
  title: string;
  type: string;
  url: string;

  constructor(content?: Content[], summary?: string, title?: string, type?: string, url?: string, post_id?: string) {
    this.post_id = post_id ?? '';
    this.content = content ?? [];
    this.summary = summary ?? '';
    this.title =  title ?? '';
    this.type = type ?? '';
    this.url = url ?? '';
  }
}
