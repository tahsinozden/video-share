import {Injectable} from '@angular/core'
import 'rxjs/Rx';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Http} from '@angular/http';

@Injectable()
export class UserVideoService {
    BACKEND_URL = "http://localhost:8080";

    constructor(private httpClient: HttpClient,
                private http: Http) {

    }

    loginUser() {
        const url = this.BACKEND_URL + "/user/login";
        return this.httpClient.post(url, {userName: 'user1', password: 'password1'});
    }

    saveVideo() {
        const url = this.BACKEND_URL + "/user/video/save";
        const paramss = new HttpParams().append("userName", 'user1').append('videoIds', [2].toString());
        return this.httpClient.post(url, {}, {
            params: paramss
        });
    }
}