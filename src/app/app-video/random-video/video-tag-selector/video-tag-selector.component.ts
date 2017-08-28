import {Component, ElementRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {VideoService} from "../../video.service";
import {VideoTagModel} from "../../video-tag.model";

@Component({
    selector: 'video-tag-selector',
    templateUrl: './video-tag-selector.component.html',
    styleUrls: ['./video-tag-selector.component.css']
})
export class VideoTagSelectorComponent implements OnInit {
    model: string = "";
    allVideoTags: VideoTagModel[] = [];
    selectedVideoTags: VideoTagModel[] = [];
    formatter = (result: VideoTagModel) => result.tagName;
    // ViewChild must be used to reach the html reference
    @ViewChild('searchElm') searchElm: ElementRef;

    constructor(private videoService: VideoService) {
    }

    search = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term.length < 2 ? []
                : this.allVideoTags.filter(v => v.tagName.toLowerCase().indexOf(term.toLowerCase()) > -1) )
                    // .map(item => item.tagName)
                    // .slice(0, 10));

    onTagSelected(event) {
        if (event.item != null) {
            this.selectedVideoTags.push(event.item);
            this.videoService.videoTagSelectedForRandomVideo.emit(this.convertToIdList(this.selectedVideoTags));
            console.log(event.item.tagName);
            this.searchElm.nativeElement.value = "";
            this.model = event.item.tagName;
        }
    }

    onTagRemove(tag: VideoTagModel) {
        const idx = this.selectedVideoTags.indexOf(tag);

        if (idx > -1) {
            this.selectedVideoTags.splice(idx, 1);
            this.videoService.videoTagSelectedForRandomVideo.emit(this.convertToIdList(this.selectedVideoTags));
        }
    }

    private convertToIdList(videoTag: VideoTagModel[]): string[] {
        console.log(videoTag);
        return videoTag.map(item => item.tagId.toString());
    }

    private getTagIdFRomTagName(tagName: string) {
        if (this.selectedVideoTags.length) {
            return this.selectedVideoTags
                .filter(item => item.tagName === tagName)
                .map(item => item.tagId.toString());
        }
        return "";
    }

    ngOnInit() {
        this.videoService.getAvailableVideoTags().subscribe(data => {
            data.map(val => {
                this.allVideoTags.push(val);
            })
        })
    }

}
