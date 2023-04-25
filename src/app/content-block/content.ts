import {Line} from "./line";

export class Content {
  type: string;
  lines: Line[];
  order_id: number;
  post_id: number;
  content_id: number;

  constructor(type: string, lines: Line[], order_id?: number, post_id?: number, content_id?: number) {
    this.type = type;
    this.lines = lines;
    this.order_id = order_id ?? 0;
    this.post_id = post_id ?? -1;
    this.content_id = content_id ?? -1;
  }
}
