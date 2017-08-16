import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppVideoComponent } from './app-video/app-video.component';
import { VideoUploaderComponent } from './app-video/video-uploader/video-uploader.component';
import { RandomVideoComponent } from './app-video/random-video/random-video.component';
import { RecentVideosBarComponent } from './app-video/recent-videos-bar/recent-videos-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    AppVideoComponent,
    VideoUploaderComponent,
    RandomVideoComponent,
    RecentVideosBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
