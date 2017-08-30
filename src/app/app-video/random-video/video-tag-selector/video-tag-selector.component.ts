import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
    allVideoTags: VideoTagModel[] = [];
    filteredVideoTags: VideoTagModel[] = [];
    selectedVideoTags: VideoTagModel[] = [];
    // ViewChild must be used to reach the html reference
    @ViewChild('searchElm') searchElm: ElementRef;
    currentValue: VideoTagModel = new VideoTagModel(-1, "");

    constructor(private videoService: VideoService) {
    }

    onTagSelected(tag: VideoTagModel) {
        if (tag != null) {
            this.selectedVideoTags.push(tag);
            this.videoService.videoTagSelectedForRandomVideo.emit(this.convertToIdList(this.selectedVideoTags));
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

    onValueChanged(elm: HTMLInputElement) {
        this.handleAutoComplete();
    }

    onInputClicked(elm: HTMLInputElement) {
        this.loadAvailableTags();
    }

    private handleAutoComplete() {
        if (this.currentValue != null && this.currentValue.tagName.length >= 2) {
            let currentTagName = this.currentValue.tagName;
            this.filteredVideoTags = this.allVideoTags
                .filter(item => item.tagName.toLowerCase().indexOf(currentTagName.toLowerCase()) > -1)
                .slice(0, 3);

        } else {
            this.filteredVideoTags = [];
        }
    }

    private loadAvailableTags() {
        this.allVideoTags = [];
        this.videoService.getAvailableVideoTags().subscribe(data => {
            data.map(val => {
                this.allVideoTags.push(val);
            })
        })
    }

    ngOnInit() {
    }

}
