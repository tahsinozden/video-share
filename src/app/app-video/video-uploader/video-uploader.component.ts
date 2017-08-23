import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs';
import { VideoService } from '../video.service'
import { VideoTagModel } from './../video-tag.model';

@Component({
  selector: 'video-uploader',
  templateUrl: './video-uploader.component.html',
  styleUrls: ['./video-uploader.component.css']
})
export class VideoUploaderComponent implements OnInit {
  @ViewChild('files') fileInput: ElementRef;
  disableSubmit = true;
  videoTags = "";
  // availableVideoTags: Observable<string> = this.videoService.getAvailableVideoTagsString();
  availableVideoTags: Observable<VideoTagModel[]> = this.videoService.getAvailableVideoTags();
  selectedVideoTag: string;
  videoTagList: string[] = [];

  uploadStatus = {
    success: 0,
    fail: 0,
    uploading: 0 
  }

  constructor(private http: Http,
            private videoService: VideoService) {}

  setVideoFile(files: HTMLInputElement) {
    console.log(files.value);
    this.disableSubmit = false;
    this.videoTagList = [];
    this.selectedVideoTag = "";
  }

  uploadVideo(event: Event) {
    // event.stopPropagation();
    event.preventDefault();

    const files = this.fileInput.nativeElement.files;
    this.uploadStatus.uploading = 1;

    this.videoService.uploadVideo(files, this.videoTagList)
      
      .subscribe(
        body => {
          console.log(body['filename']);
          this.uploadStatus.success = 1;
          this.uploadStatus.uploading = 0;
        },
        error => {
          console.log(error);
          this.uploadStatus.success = 0;
          this.uploadStatus.uploading = 0;
          this.uploadStatus.fail = 1;
        }
    )
  }

  onSelectChanged(event: Event) {
    if (this.videoTagList.indexOf(this.selectedVideoTag) == -1) {
      this.videoTagList.push(this.selectedVideoTag);
    }
  }

  onTagAddClicked(tagName: string) {
    if (tagName != '' && this.videoTagList.indexOf(tagName) == -1) {
      this.videoTagList.push(tagName);
    }
  }

  onTagRemove(tagName: string) {
    const idx = this.videoTagList.indexOf(tagName);
    if (idx> -1) {
      this.videoTagList.splice(idx, 1);
    }
  }

  ngOnInit() {
  }

}
