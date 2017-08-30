import {VideoTagModel} from './video-tag.model';
import {Injectable, EventEmitter} from '@angular/core'
import 'rxjs/Rx';
import {VideoModel} from './video.model'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Http, Headers, RequestOptions} from '@angular/http';
import {ServerVideoModel} from "./server-video.model";
import {HttpRequest} from "@angular/common/http";

@Injectable()
export class VideoService {
    BACKEND_URL = "http://localhost:8080";
    newVideoAdded = new EventEmitter<VideoModel>();
    videoOnRecentBarClicked = new EventEmitter<VideoModel>();
    videoTagSelectedForRandomVideo = new EventEmitter<string[]>();
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

    loadRandomVideoObjectWithTags(tagIds: string[]) {
        return tagIds.length == 0 ? this.loadRandomVideoObject()
            : this.httpClient.get<ServerVideoModel>(this.BACKEND_URL + '/api/v2/randomvideo', {
                params: new HttpParams().append("tagIds", tagIds.toString())
            });
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

        const url = this.BACKEND_URL + "/api/v2/uploader";
        // no need to set headers, let the browser set it for you :)
        // const requestHeaders = new HttpHeaders().set('Content-Type', 'multipart/form-data');
        const requestParams = new HttpParams().append('videoTagNames', videoTags.toString());

        // return this.httpClient.post(url, formData, {
        //   params: requestParams,
        //   reportProgress: true
        // });

        // in order for reportProgress to work, customized post request should be created!
        const req = new HttpRequest('POST', url, formData, {
            params: requestParams,
            reportProgress: true
        })
        return this.httpClient.request(req);
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
                return response.map(function (item, index) {
                    return item.tagName;
                })
                    .join(",");
            });
    }

    getVideoTagsById(ids: string[]) {
        let options = new RequestOptions({params: {'ids': ids}});
        return this.http
            .get(this.BACKEND_URL + "/data/videotags", options)
            .map((response) => {
                return response.json();
            })
    }
}