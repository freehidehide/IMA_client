/** @format */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttachmentComponent} from './attachment/attachment.component';
import {AttachmentUploadComponent} from './attachment-upload/attachment-upload.component';
import {PaginationComponent} from './pagination/pagination.component';

@NgModule({
	declarations: [
		AttachmentComponent,
		AttachmentUploadComponent,
		PaginationComponent
	],
	imports: [CommonModule],
	exports: [
		AttachmentComponent,
		AttachmentUploadComponent,
		PaginationComponent
	]
})
export class SharedCommonModule {}
