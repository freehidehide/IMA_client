/** @format */

import {Component, Input} from '@angular/core';
import {ImageService} from 'src/app/api/services/image.service';
import {QueryParam} from 'src/app/api/models/query-param';

@Component({
	selector: 'app-attachment-upload',
	templateUrl: './attachment-upload.component.html',
	styleUrls: ['./attachment-upload.component.css']
})
export class AttachmentUploadComponent {
	@Input() class: string;
	@Input() isMultiple: boolean;

	constructor(public imageService: ImageService) {
		this.isMultiple = false;
	}

	fileUpload(event) {
		const formData = new FormData();
		if (this.isMultiple) {
			formData.append('file', event.target.files);
		} else {
			formData.append('file', event.target.files[0]);
		}
		const queryParam: QueryParam = {
			class: this.class
		};
		this.imageService
			.updateUserAvatar(formData, queryParam)
			.subscribe((data) => {
				console.log('data', data);
			});
	}
}
