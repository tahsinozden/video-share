import {EventEmitter, Injectable} from '@angular/core'
import 'rxjs/Rx';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Http} from '@angular/http';
import {UserModel} from "./model/user.model";
import {VideoModel} from "./video.model";

@Injectable()
export class UserVideoService {
    BACKEND_URL = "http://localhost:8080";
    INVALID_TOKEN_VALUE = -1;
    AUTH_BEAN = 'AUTH_BEAN';
    userVideoAdded = new EventEmitter<VideoModel>();
    userSessionStatusEvent = new EventEmitter<boolean>();

    constructor(private httpClient: HttpClient,
                private http: Http) {

    }

    loginUser(userModel: UserModel) {
        const url = this.BACKEND_URL + "/user/login";
        return this.httpClient.post(url, userModel);
    }

    logout(userName: string) {
        const url = this.BACKEND_URL + "/user/logout";
        const paramss = new HttpParams().append("userName", userName);
        return this.httpClient.post(url, {}, {
            params: paramss
        });
    }
    isUserLogged() {
        const url = this.BACKEND_URL + "/user/authenticate";
        let authBean = this.getAuthBean();
        return this.httpClient.post(url, {authBean: authBean});
    }

    getAuthBean() {
        return JSON.parse(localStorage.getItem(this.AUTH_BEAN));
    }

    saveAuthBean(bean) {
        localStorage.setItem(this.AUTH_BEAN, JSON.stringify(bean));
    }

    removeAuthBean() {
        localStorage.removeItem(this.AUTH_BEAN);
    }

    loginSuccess(token) {
        return token !== this.INVALID_TOKEN_VALUE;
    }

    saveVideo(video: VideoModel) {
        const url = this.BACKEND_URL + "/user/video/save";
        let bean = this.getAuthBean();
        // const paramss = new HttpParams().append("authBean", JSON.stringify(bean)).append('videoIds', [video.id].toString());
        return this.httpClient.post(url, {authBean: bean, videoIds: [video.id]}, {
            // params: paramss
        });
    }

    getUserVideos(userName: string) {
        const url = this.BACKEND_URL + "/user/video/" + userName;
        return this.httpClient.get(url);
    }
}