export class Content {
  type: string;
  lines: string[];
  orderId: number;
  postId: number;
  contentId: number;

  constructor(type: string, lines: string[], orderId?: number) {
    this.type = type;
    this.lines = lines;
    this.orderId = orderId ?? 0;
  }
}
