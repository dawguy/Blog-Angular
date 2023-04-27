import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {PostComponent} from "./post/post.component";
import {ProjectComponent} from "./project/project.component";
import {ProjectsComponent} from "./projects/projects.component";
import {BlogComponent} from "./blog/blog.component";
import {DraftPostComponent} from "./draft-post/draft-post.component";
import {BooksComponent} from "./books/books.component";

const routes: Routes = [
  {path: 'home', component: HomepageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'post/draft/:postUrl', component: DraftPostComponent},
  {path: 'post/:postUrl', component: PostComponent},
  {path: 'project/:projectUrl', component: ProjectComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'books', component: BooksComponent},
  {path: 'blog', component: BlogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
