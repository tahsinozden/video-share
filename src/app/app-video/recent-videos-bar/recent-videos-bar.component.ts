import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {VideoService} from '../video.service'
import {VideoModel} from './../video.model';

@Component({
    selector: 'recent-videos-bar',
    templateUrl: './recent-videos-bar.component.html',
    styleUrls: ['./recent-videos-bar.component.css'],
    providers: []
})
export class RecentVideosBarComponent implements OnInit {

    @Output("videoClicked") videoClicked = new EventEmitter<VideoModel>();
    recentVideosObjectList: VideoModel[] = [];

    constructor(private videoService: VideoService) {
        // subscribe to the randomly loaded videos
        this.videoService.newVideoAdded.subscribe(videoData => {
            this.recentVideosObjectList.unshift(videoData);
            console.log(videoData.url);
        });
    }

    selectVideo(video: VideoModel) {
        this.videoClicked.emit(video);
        this.videoService.videoOnRecentBarClicked.emit(video);
    }

    ngOnInit() {
    }

}
