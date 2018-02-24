import {Observable} from 'rxjs';
import {VideoService} from './../video.service';
import {VideoTagModel} from './../video-tag.model';
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VideoModel} from './../video.model';
import {UserVideoService} from "../user.video.service";

@Component({
    selector: 'random-video',
    templateUrl: './random-video.component.html',
    styleUrls: ['./random-video.component.css'],
    providers: []
})
export class RandomVideoComponent implements OnInit {
    @Input() recentVideoClicked: VideoModel;
    @ViewChild("videoplayer") videoplayer;
    @Output() userVideo: EventEmitter<VideoModel> = new EventEmitter();
    isUserLogged = false;

    randomVideo: VideoModel;
    currentVideoTags: Observable<VideoTagModel[]>;
    selectedVideoTagIds: string[] = [];
    videoErrorMessage = "";

    constructor(private http: HttpClient,
                private videoService: VideoService,
                private userVideoService: UserVideoService) {

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

        this.videoService.loadRandomVideoObjectWithTags(this.selectedVideoTagIds)
            .subscribe(
                serverVideo => {
                    if (serverVideo.videoId == null) {
                        this.randomVideo = null;
                        this.videoErrorMessage = "No matching video found! Try removing some tags.";
                        return;
                    }
                    this.videoErrorMessage = "";
                    this.randomVideo = new VideoModel(serverVideo.videoId,
                        this.videoService.BACKEND_URL + serverVideo.videoFilePath,
                        serverVideo.videoTagIds.split(","));
                    console.log(this.randomVideo);

                    this.currentVideoTags = this.videoService.getVideoTagsById(this.randomVideo.videoTagIds);
                    this.videoService.loadAndPlayVideo(video);
                },
                error => {
                    console.log(error);
                }
            )
    }

    onSelectedVideoTags(videoTagIds: string[]) {
        this.selectedVideoTagIds = videoTagIds;
        console.log("selected!");
    }

    ngOnInit() {
        this.videoService.videoTagSelectedForRandomVideo.subscribe((data: string[]) => {
            this.selectedVideoTagIds = data;
        });

        // check when the component loaded
        this.userVideoService.isUserLogged().subscribe((loggedIn: boolean) => {
            this.isUserLogged = loggedIn;
        });

        // check when there is a login event
        this.userVideoService.userSessionStatusEvent.subscribe((loggedIn : boolean) => {
            this.isUserLogged = loggedIn;
        });
    }

    onUserVideoAdd(video: VideoModel) {
        this.userVideo.emit(video);
        this.userVideoService.userVideoAdded.emit(video);
    }
}
