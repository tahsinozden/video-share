import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { VideoService } from '../video.service'
import { VideoModel } from './../video.model';

@Component({
  selector: 'random-video',
  templateUrl: './random-video.component.html',
  styleUrls: ['./random-video.component.css'],
  providers: []
})
export class RandomVideoComponent implements OnInit {
  @Input() recentVideoClicked: VideoModel;
  @ViewChild("videoplayer") videoplayer;

  randomVideo: VideoModel;

  constructor(private http: HttpClient,
              private videoService: VideoService) {

    this.videoService.videoOnRecentBarClicked.subscribe(video => {
      this.randomVideo = video;
      this.videoService.loadAndPlayVideo(this.videoplayer.nativeElement);
    });                
  }

  loadRandVideo(video: HTMLVideoElement) {
    if (this.randomVideo != undefined) {
      this.videoService.newVideoAdded.emit(this.randomVideo);          
    }
    
    this.videoService.loadRandomVideo()
      .subscribe((data: VideoModel) => {
        console.log(data);
        data["url"] = this.videoService.BACKEND_URL + data["url"];
        this.randomVideo = data;
        this.videoService.loadAndPlayVideo(video);
    });
  }

  ngOnInit() {
  }

}
