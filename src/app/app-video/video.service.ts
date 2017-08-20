import { VideoTagModel } from './video-tag.model';
import { Injectable, EventEmitter } from '@angular/core'
import 'rxjs/Rx';
import { VideoModel } from './video.model'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ServerVideoModel } from "./server-video.model";

@Injectable()
export class VideoService {
    BACKEND_URL = "http://localhost:8080";
    newVideoAdded = new EventEmitter<VideoModel>();
    videoOnRecentBarClicked = new EventEmitter<VideoModel>();
    randomVideo: VideoModel;

    constructor(private httpClient: HttpClient,
                private http: Http) {

    }

    loadRandomVideo() {
        return this.httpClient.get(this.BACKEND_URL + '/randomvideo');
    }
    
    loadRandomVideoObject() {
      return this.httpClient.get<ServerVideoModel>(this.BACKEND_URL + '/api/v2/randomvideo');
    }

    loadAndPlayVideo(videoElement: HTMLVideoElement) {
        if (videoElement == null) {
          return;
        }

        videoElement.load();
        videoElement.play();
      }
    
      uploadVideo(fileInput: HTMLInputElement, videoTags?: string[]) {    
        const files = fileInput;
        const formData = new FormData();
        formData.append('file', files[0]);
    
        // TODO: handle it with httpClient
        // const requestHeaders = new HttpHeaders().set('Content-Type', 'multipart/form-data; boundary=----WebKitFormBoundarysDyUAE7vSG0Eskwt')
        // console.log(requestHeaders);

        const url = this.BACKEND_URL + "/api/v2/uploader";
        const headers = new Headers({headers: {'Content-Type': 'multipart/form-data'}});
        let options = new RequestOptions({ headers: headers, params: {'videoTagNames' : videoTags}});

        return this.http.post(url, formData, options);
      }

      getAvailableVideoTags() {
        return this.httpClient.get(this.BACKEND_URL + "/data/videotags")
          .map((response: VideoTagModel[]) => {
            return response;
          })
      }

      getAvailableVideoTagsString() {
        return this.getAvailableVideoTags()
            .map((response: VideoTagModel[]) => {
                return response.map(function(item, index) {
                  return item.tagName;
                })
                .join(",");
            });
      }

      getVideoTagsById(ids: string[]) {
          let options = new RequestOptions({ params: {'ids' : ids}});
          return this.http
            .get(this.BACKEND_URL + "/data/videotags", options)
            .map((response) => {
              return response.json();
            })
      }
}