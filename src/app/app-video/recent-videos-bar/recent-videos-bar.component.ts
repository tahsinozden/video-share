import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VideoEntity } from '../entity/video.entity'
import { VideoService } from '../video.service'

@Component({
  selector: 'recent-videos-bar',
  templateUrl: './recent-videos-bar.component.html',
  styleUrls: ['./recent-videos-bar.component.css'],
  providers: []
})
export class RecentVideosBarComponent implements OnInit {

  @Output("videoClicked") videoClicked = new EventEmitter<VideoEntity>();
  recentVideosObjectList: VideoEntity[] = [];

  constructor(private videoService: VideoService) {
    // subsribe to the randomly loaded videos
    this.videoService.newVideoAdded.subscribe(videoData => {
      this.recentVideosObjectList.unshift(videoData);
      console.log(videoData.url);
    });
   }

  selectVideo(video: VideoEntity) {
    this.videoClicked.emit(video);
    this.videoService.videoOnRecentBarClicked.emit(video);
  }

  ngOnInit() {
  }

}
