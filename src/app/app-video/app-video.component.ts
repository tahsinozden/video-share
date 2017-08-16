import { Component, OnInit } from '@angular/core';
import { VideoEntity } from './entity/video.entity'
import { VideoService } from './video.service'

@Component({
  selector: 'app-video',
  templateUrl: './app-video.component.html',
  styleUrls: ['./app-video.component.css'],
  providers: [VideoService]
})
export class AppVideoComponent implements OnInit {
  clickedVideo: VideoEntity;
  hideNoVideoInfo = false;

  constructor(private videoService: VideoService) { 
    this.videoService.newVideoAdded.subscribe(data => {
      this.hideNoVideoInfo = true;
    });         
  }

  onRecentVideoClicked(video: VideoEntity) {
    this.clickedVideo = video;
    this.hideNoVideoInfo = true;
  }

  ngOnInit() {
  }

}
