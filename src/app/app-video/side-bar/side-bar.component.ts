import {Component, OnInit} from '@angular/core';
import {UserVideoService} from "../user.video.service";

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

    constructor(private userVideoService: UserVideoService) {
    }

    ngOnInit() {
    }

}
