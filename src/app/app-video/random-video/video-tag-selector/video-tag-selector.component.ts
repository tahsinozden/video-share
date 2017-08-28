import {Component, OnInit} from '@angular/core';
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
  public model: any;
  allVideoTags: VideoTagModel[] = [];
  selectedVideoTags: string[] = [];

  constructor(private videoService: VideoService) {
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.allVideoTags.filter(v => v.tagName.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .map(item => item.tagName)
          .slice(0, 10));

  onTagSelected(event) {
    if (event.item != "") {
      this.selectedVideoTags.push(event.item);
    }
  }

  onTagRemove(tagName: string) {
    const idx = this.selectedVideoTags.indexOf(tagName);
    if (idx> -1) {
      this.selectedVideoTags.splice(idx, 1);
    }
  }

  ngOnInit() {
    this.videoService.getAvailableVideoTags().subscribe(data => {
      data.map(val => {
        this.allVideoTags.push(val);
      })
    })
  }

}
