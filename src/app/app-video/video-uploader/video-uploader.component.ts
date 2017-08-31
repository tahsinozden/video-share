import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {VideoService} from '../video.service'
import {VideoTagModel} from './../video-tag.model';
import {HttpEvent, HttpEventType} from "@angular/common/http";

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
    uploadStatusCode: UploadStatus = UploadStatus.INITIAL;

    constructor(private http: Http,
                private videoService: VideoService) {
    }

    setVideoFile(files: HTMLInputElement) {
        console.log(files.value);
        this.disableSubmit = false;
        this.videoTagList = [];
        this.selectedVideoTag = "";
        this.uploadStatusCode = UploadStatus.INITIAL;
    }

    uploadVideo(event: Event) {
        event.preventDefault();

        const files = this.fileInput.nativeElement.files;

        this.videoService.uploadVideo(files, this.videoTagList)
            .subscribe(
                (event: HttpEvent<any>) => {
                    switch (event.type) {
                        case HttpEventType.Sent:
                            console.log('Request sent!');
                            this.uploadStatusCode = UploadStatus.UPLOADING;
                            break;

                        case HttpEventType.Response:
                            console.log('Done!', event.body);
                            this.uploadStatusCode = UploadStatus.SUCCESS;
                            this.availableVideoTags = this.videoService.getAvailableVideoTags();
                    }
                },
                error => {
                    this.uploadStatusCode = UploadStatus.FAILED;
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
        if (idx > -1) {
            this.videoTagList.splice(idx, 1);
        }
    }

    private isFileUploading() {
        return this.uploadStatusCode === UploadStatus.UPLOADING;
    }

    private isFileUploadSuccess() {
        return this.uploadStatusCode === UploadStatus.SUCCESS;
    }

    private isFileUploadFailed() {
        return this.uploadStatusCode === UploadStatus.FAILED;
    }

    ngOnInit() {
    }

}

enum UploadStatus {
    INITIAL,
    SUCCESS,
    FAILED,
    UPLOADING
}
