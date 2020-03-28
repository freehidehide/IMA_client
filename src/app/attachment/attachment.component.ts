/** @format */

import {Component, OnInit, Input} from '@angular/core';
import {Attachment} from '../api/models/attachment';
import {Md5} from 'ts-md5/dist/md5';
// import { environment } from "../../environments/environment";

@Component({
	selector: 'app-attachment',
	templateUrl: './attachment.component.html',
	styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent {
	public url: string;
	public imageClass: string = 'original';

	@Input('type')
	set class(value: string) {
		this.imageClass = value;
	}

	@Input('attachment')
	set attachment(value: Attachment) {
		if (value && value.id) {
			const id: string = value.id.toString();
			const hash: string = Md5.hashStr(
				value.class + id + 'jpg' + this.imageClass
			).toString();
			this.url =
				'http://3.132.95.244/images/original/' +
				value.class +
				'/' +
				id +
				'.' +
				hash +
				'.jpg';
		} else {
			this.url =
				'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg';
		}
	}
}
