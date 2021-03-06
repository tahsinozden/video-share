import {Component, OnInit} from '@angular/core';
import {VideoService} from './video.service'
import {VideoModel} from './video.model';
import {UserVideoService} from "./user.video.service";

@Component({
    selector: 'app-video',
    templateUrl: './app-video.component.html',
    styleUrls: ['./app-video.component.css'],
    providers: [VideoService, UserVideoService]
})
export class AppVideoComponent implements OnInit {
    clickedVideo: VideoModel;
    hideNoVideoInfo = false;

    constructor(private videoService: VideoService) {
        this.videoService.newVideoAdded.subscribe(data => {
            this.hideNoVideoInfo = true;
        });
    }

    onRecentVideoClicked(video: VideoModel) {
        this.clickedVideo = video;
        this.hideNoVideoInfo = true;
    }

    ngOnInit() {
    }

}
