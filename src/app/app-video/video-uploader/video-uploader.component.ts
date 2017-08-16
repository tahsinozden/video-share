import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { VideoService } from '../video.service'

@Component({
  selector: 'video-uploader',
  templateUrl: './video-uploader.component.html',
  styleUrls: ['./video-uploader.component.css']
})
export class VideoUploaderComponent implements OnInit {
  @ViewChild('files') fileInput: ElementRef;
  disableSubmit = true;
  uploadStatus = {
    success: 0,
    fail: 0,
    uploading: 0 
  }

  BACKEND_URL = "http://localhost:8080";

  constructor(private http: Http,
            private videoService: VideoService) {}

  setVideoFile(files: HTMLInputElement) {
    console.log(files.value);
    this.disableSubmit = false;
  }

  uploadVideo() {
    // event.stopPropagation();
    event.preventDefault();

    const files = this.fileInput.nativeElement.files;
    this.uploadStatus.uploading = 1;

    this.videoService.uploadVideo(files)
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


  ngOnInit() {
  }

}
