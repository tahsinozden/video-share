import {Component, OnInit} from '@angular/core';
import {VideoService} from "../video.service";
import {VideoModel} from "../video.model";

@Component({
    selector: 'app-video-menu-holder',
    templateUrl: './video-menu-holder.component.html',
    styleUrls: ['./video-menu-holder.component.css']
})
export class VideoMenuHolderComponent implements OnInit {

    clickedVideo: VideoModel;
    hideNoVideoInfo = false;

    constructor(private videoService: VideoService) {
        this.videoService.newVideoAdded.subscribe(data => {
            this.hideNoVideoInfo = true;
        });
    }

    ngOnInit() {
    }
}
