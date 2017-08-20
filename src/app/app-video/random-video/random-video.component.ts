import { Observable } from 'rxjs';
import { VideoService } from './../video.service';
import { VideoTagModel } from './../video-tag.model';
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
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
  currentVideoTags: Observable<VideoTagModel[]>;

  constructor(private http: HttpClient,
              private videoService: VideoService) {

    this.videoService.videoOnRecentBarClicked.subscribe(video => {
      this.randomVideo = video;
      this.currentVideoTags = this.videoService.getVideoTagsById(this.randomVideo.videoTagIds);
      this.videoService.loadAndPlayVideo(this.videoplayer.nativeElement);
    });                
  }

  loadRandVideo(video: HTMLVideoElement) {
    if (this.randomVideo != undefined) {
      this.videoService.newVideoAdded.emit(this.randomVideo);          
    }
    
    // this.videoService.loadRandomVideo()
    //   .subscribe((data: VideoModel) => {
    //     console.log(data);
    //     data["url"] = this.videoService.BACKEND_URL + data["url"];
    //     this.randomVideo = data;
    //     this.videoService.loadAndPlayVideo(video);
    // });

    this.videoService.loadRandomVideoObject()
      .subscribe(
        serverVideo => {
          this.randomVideo = new VideoModel(serverVideo.videoId, 
                                            this.videoService.BACKEND_URL + serverVideo.videoFilePath, 
                                            serverVideo.videoTagIds.split(","));
          console.log(this.randomVideo);            
          // this.videoService.getVideoTagsById(this.randomVideo.videoTagIds)
          //   .subscribe((data: VideoTagModel[]) => {
          //     console.log(data);
          //   });                
          this.currentVideoTags = this.videoService.getVideoTagsById(this.randomVideo.videoTagIds);                
          this.videoService.loadAndPlayVideo(video);
        },
        error => {
          console.log(error);
        }
    )
  }

  ngOnInit() {
  }

}
