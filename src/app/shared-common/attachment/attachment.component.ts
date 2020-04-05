
import {Component, OnInit, Input} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import {Attachment} from 'src/app/api/models/attachment';
// import { environment } from "../../environments/environment";

@Component({
    selector: 'app-attachment',
    templateUrl: './attachment.component.html',
    styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent {
    public url: string;
    public imageClass = 'original';
    public cssClassString: string;
    public isVideo: boolean;

    @Input('type')
    set class(value: string) {
        this.imageClass = value;
    }

    @Input('cssClass') cssClass: string;

    @Input('attachment')
    set attachment(value: Attachment) {
        if (value.thumb) {
            this.isVideo = true;
        } else {
            this.isVideo = false;
        }
        this.isVideo = (value.thumb) ? true : false;
        if (value && value.id) {
            const id: string = value.id.toString();
            const filename: string = value.filename.split('.').pop();
            const hash: string = Md5.hashStr(
                value.class + id + filename + this.imageClass
            ).toString();
            this.url =
                'http://3.132.95.244/images/original/' +
                value.class +
                '/' +
                id +
                '.' +
                hash +
                '.' + filename;
        } else {
            this.url =
                'https://tanzolymp.com/images/default-non-user-no-photo-1.jpg';
        }
    }
}
