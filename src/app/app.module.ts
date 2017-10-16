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
import {RouterModule, Routes} from "@angular/router";
import {SideBarComponent} from './app-video/side-bar/side-bar.component';
import {VideoMenuHolderComponent} from './app-video/video-menu-holder/video-menu-holder.component';
import {NavBarComponent} from './app-video/nav-bar/nav-bar.component';

const appRoutes: Routes = [
    {path: '', component: AppVideoComponent},
    // {path: 'about', component: AppAboutComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        AppVideoComponent,
        VideoUploaderComponent,
        RandomVideoComponent,
        RecentVideosBarComponent,
        VideoTagSelectorComponent,
        SideBarComponent,
        VideoMenuHolderComponent,
        NavBarComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpModule,
        FormsModule,
        // this is for @ng-bootstrap/ng-bootstrap
        NgbModule.forRoot(),
        RouterModule.forRoot(
            appRoutes,
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
