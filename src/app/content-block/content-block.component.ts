import {Component, Input} from '@angular/core';
import {Line} from "./line";

@Component({
  selector: 'app-content-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.css']
})
export class ContentBlockComponent {
  @Input() type: string;
  @Input() lines: Line[];
  subtype: string = '';

  constructor() {}

  ngOnInit() {
    if(this.type.indexOf('code-') != -1){
      this.subtype = this.type.slice(5);
      this.type = 'code';
    }
  }
}
