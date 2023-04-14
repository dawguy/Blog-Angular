import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {AboutMeComponent} from "./about-me/about-me.component";
import {PostComponent} from "./post/post.component";
import {ProjectComponent} from "./project/project.component";

const routes: Routes = [
  {path: 'home', component: HomepageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'aboutMe', component: AboutMeComponent},
  {path: 'post/:postId', component: PostComponent},
  {path: 'project/:projectId', component: ProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
