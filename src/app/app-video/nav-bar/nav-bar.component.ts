import { Component, OnInit } from '@angular/core';
import {UserVideoService} from "../user.video.service";
import {Observable} from "rxjs/Observable";
import {UserModel} from "../model/user.model";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
    user: UserModel = new UserModel("", "");
    isUserLogged: Observable<boolean> = this.userVideoService.isUserLogged();
    userLogged = false;

    constructor(private userVideoService: UserVideoService) { }

    ngOnInit() {
        this.userVideoService.isUserLogged().subscribe((data: boolean) => {
            this.userLogged = data;
        })
    }

    login(user: UserModel) {
        console.log(user);
        this.userVideoService.loginUser(user).subscribe(
            (data: string) => {
                    if (this.userVideoService.loginSuccess(data)) {
                        let bean = {userName: user.userName, authToken: data};
                        this.userVideoService.saveAuthBean(bean);
                        this.userLogged = true;
                        this.userVideoService.userSessionStatusEvent.emit(true);
                    } else {
                        this.userLogged = false;
                    }
                    console.log(data);
                },
            error => {
                this.userLogged = false;
                this.userVideoService.removeAuthBean();
            }
        );
        this.resetForm();
    }

    logout() {
        let bean = this.userVideoService.getAuthBean();
        console.log(bean);
        if (bean != null) {
            this.userVideoService.logout(bean.userName).subscribe(data => {
                this.userLogged = false;
                this.userVideoService.removeAuthBean();
                this.userVideoService.userSessionStatusEvent.emit(false);
            });
        }
    }

    resetForm() {
        this.user = new UserModel("", "");
    }
}
