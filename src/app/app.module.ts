import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {AppVideoComponent} from './app-video/app-video.component';
import {VideoUploaderComponent} from './app-video/video-uploader/video-uploader.component';
import {RandomVideoComponent} from './app-video/random-video/random-video.component';
import {RecentVideosBarComponent} from './app-video/recent-videos-bar/recent-videos-bar.component';
import {VideoTagSelectorComponent} from './app-video/random-video/video-tag-selector/video-tag-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    AppVideoComponent,
    VideoUploaderComponent,
    RandomVideoComponent,
    RecentVideosBarComponent,
    VideoTagSelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    // this is for @ng-bootstrap/ng-bootstrap
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
