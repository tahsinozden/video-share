import { Injectable, EventEmitter } from '@angular/core'
import { VideoEntity } from './entity/video.entity'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class VideoService {
    BACKEND_URL = "http://localhost:8080";
    newVideoAdded = new EventEmitter<VideoEntity>();
    videoOnRecentBarClicked = new EventEmitter<VideoEntity>();
    randomVideo: VideoEntity;

    constructor(private httpClient: HttpClient,
                private http: Http) {

    }

    loadRandomVideo() {
        return this.httpClient.get(this.BACKEND_URL + '/randomvideo');
    }
    
    loadAndPlayVideo(videoElement: HTMLVideoElement) {
        if (videoElement == null) {
          return;
        }

        videoElement.load();
        videoElement.play();
      }
    
      uploadVideo(fileInput: HTMLInputElement) {    
        const files = fileInput;
        const formData = new FormData();
        formData.append('file', files[0]);
    
        // TODO: handle it with httpClient
        // const requestHeaders = new HttpHeaders().set('Content-Type', 'multipart/form-data; boundary=----WebKitFormBoundarysDyUAE7vSG0Eskwt')
        // console.log(requestHeaders);

        const url = this.BACKEND_URL + "/uploader";
        const headers = new Headers({headers: {'Content-Type': 'multipart/form-data'}});
        let options = new RequestOptions({ headers});

        return this.http.post(url, formData, options);
      }
}