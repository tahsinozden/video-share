import {Component, OnInit} from '@angular/core';
import {UserVideoService} from "../user.video.service";
import {VideoModel} from "../video.model";

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
    videoToAdd: VideoModel;

    constructor(private userVideoService: UserVideoService) {
    }

    ngOnInit() {
        this.userVideoService.userVideoAdded.subscribe( (video: VideoModel) => {
            this.videoToAdd = video;
            console.log(video);
            this.userVideoService.saveVideo(video).subscribe();
        });
    }

}
