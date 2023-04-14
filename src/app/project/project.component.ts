import {Component, Input} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  @Input() projectName: string;

  constructor(private route: ActivatedRoute) {
    this.projectName = '1';
  }

  ngOnInit(): void {
    this.route.params.subscribe((v: Params) => {
      console.log(v);
      this.projectName = v['projectId'];
    });
  }
}
