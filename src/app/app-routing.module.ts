import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {PostComponent} from "./post/post.component";
import {ProjectComponent} from "./project/project.component";
import {ProjectsComponent} from "./projects/projects.component";
import {BlogComponent} from "./blog/blog.component";
import {DraftPostComponent} from "./draft-post/draft-post.component";
import {BooksComponent} from "./books/books.component";
import {PostResolver} from "./post.resolver";
import {PostsResolver} from "./posts.resolver";

const routes: Routes = [
  {path: 'home', component: HomepageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'post/draft/:postUrl', component: DraftPostComponent},
  {path: 'post/:postUrl', component: PostComponent, resolve: {
      data: PostResolver
    }},
  {path: 'project/:projectUrl', component: ProjectComponent},
  {path: 'projects',
    component: BlogComponent,
    // component: ProjectsComponent,
    data: {type: 'project'}, resolve: {postData: PostsResolver}
  },
  {path: 'books',
    component: BlogComponent,
    // component: BooksComponent,
    data: {type: 'book'}, resolve: {postData: PostsResolver}
  },
  {path: 'blog',
    component: BlogComponent,
    data: {type: 'blog'}, resolve: {postData: PostsResolver}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
