import {Injectable} from '@angular/core'
import 'rxjs/Rx';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Http} from '@angular/http';
import {UserModel} from "./model/user.model";

@Injectable()
export class UserVideoService {
    BACKEND_URL = "http://localhost:8080";
    INVALID_TOKEN_VALUE = -1;
    AUTH_BEAN = 'AUTH_BEAN';

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
        return this.httpClient.post(url, authBean);
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

    saveVideo() {
        const url = this.BACKEND_URL + "/user/video/save";
        const paramss = new HttpParams().append("userName", 'user1').append('videoIds', [2].toString());
        return this.httpClient.post(url, {}, {
            params: paramss
        });
    }
}