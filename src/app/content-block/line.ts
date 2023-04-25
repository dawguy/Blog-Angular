export class Line {
  line: string;
  line_id: number;
  content_id: number;
  order_id: number;

  constructor(line: string, line_id?: number, content_id?: number, order_id?: number) {
    this.line = line ?? ''
    this.line_id = line_id ?? -1;
    this.content_id = content_id ?? -1;
  }
}
