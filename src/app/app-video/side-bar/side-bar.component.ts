import {Component, OnInit} from '@angular/core';
import {UserVideoService} from "../user.video.service";
import {VideoModel} from "../video.model";
import {VideoService} from "../video.service";

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
    videoToAdd: VideoModel;
    userVideos = [];

    constructor(private userVideoService: UserVideoService,
                private videoService: VideoService) {
    }

    ngOnInit() {
        this.userVideoService.userVideoAdded.subscribe( (video: VideoModel) => {
            this.videoToAdd = video;
            this.userVideoService.saveVideo(video).subscribe();
        });
    }

    onUserVideoClicked() {
        // make a toggle, show/hide videos
        if (this.userVideos.length != 0) {
            this.userVideos = [];
            return;
        }
        let bean = this.userVideoService.getAuthBean();
        if (bean != null && bean.userName != null) {
            this.userVideoService.getUserVideos(bean.userName).subscribe((response : any ) => {
                // this.userVideos = response;
                console.log(response);
                let ids = [];
                for (var i in response) {
                    ids.push(response[i].videoIds);
                }
                console.log(ids);
                this.videoService.getVideoByIds(ids).subscribe((data: any) => {
                    this.userVideos = data;
                });

            });
        }
    }
}
