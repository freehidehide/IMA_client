
import { Component, OnInit, Input } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Attachment } from 'src/app/api/models/attachment';
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
    public isPlayVideo: boolean;

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
        if (!this.isVideo && value && value.id) {
            const id: string = value.id.toString();
            const filename: string = value.filename.split('.').pop();
            const hash: string = Md5.hashStr(
                value.class + id + filename + this.imageClass
            ).toString();
            this.url =
            'http://app.itstheimas.com/images/' + this.imageClass + '/' +
                value.class +
                '/' +
                id +
                '.' +
                hash +
                '.' + filename;
        } else if (this.isVideo && value.thumb.id) {
            const id: string = value.thumb.id.toString();
            const filename: string = value.thumb.filename.split('.').pop();
            const hash: string = Md5.hashStr(
                value.thumb.class + id + filename + this.imageClass
            ).toString();
            this.url =
                'http://app.itstheimas.com/images/' + this.imageClass + '/' +
                value.thumb.class +
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
