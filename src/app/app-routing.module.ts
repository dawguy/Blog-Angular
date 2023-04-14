import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {AboutMeComponent} from "./about-me/about-me.component";
import {PostComponent} from "./post/post.component";
import {ProjectComponent} from "./project/project.component";
import {ProjectsComponent} from "./projects/projects.component";
import {BlogComponent} from "./blog/blog.component";
import {DraftPostComponent} from "./draft-post/draft-post.component";

const routes: Routes = [
  {path: 'home', component: HomepageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'about', component: AboutMeComponent},
  {path: 'post/draft/:postId', component: DraftPostComponent},
  {path: 'post/:postId', component: PostComponent},
  {path: 'project/:projectId', component: ProjectComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'blog', component: BlogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
