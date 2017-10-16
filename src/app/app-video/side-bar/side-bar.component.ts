import {Component, OnInit} from '@angular/core';
import {UserVideoService} from "../user.video.service";
import {concatStatic} from "rxjs/operator/concat";

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

    constructor(private userVideoService: UserVideoService) {
    }

    save() {
        this.userVideoService.loginUser().subscribe(data => {
            console.log(data);
        });
        this.userVideoService.saveVideo().subscribe(data => {
            console.log(data);
        });
    }

    ngOnInit() {
    }

}
