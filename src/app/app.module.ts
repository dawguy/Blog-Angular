import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PostComponent } from './post/post.component';
import { ProjectComponent } from './project/project.component';
import { HeaderComponent } from './header/header.component';
import { ProjectsComponent } from './projects/projects.component';
import { LeftBarComponent } from './left-bar/left-bar.component';
import { RightBarComponent } from './right-bar/right-bar.component';
import { BlogComponent } from './blog/blog.component';
import { ContentBlockComponent } from './content-block/content-block.component';
import {HttpClientModule} from "@angular/common/http";
import { DraftPostComponent } from './draft-post/draft-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    PostComponent,
    ProjectComponent,
    HeaderComponent,
    ProjectsComponent,
    LeftBarComponent,
    RightBarComponent,
    BlogComponent,
    ContentBlockComponent,
    DraftPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
