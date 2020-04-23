
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentComponent } from './attachment/attachment.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AttachmentUploadComponent } from './attachment-upload/attachment-upload.component';
import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tab/tabs.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AttachmentComponent,
        AttachmentUploadComponent,
        PaginationComponent,
        TabComponent,
        TabsComponent
    ],
    imports: [CommonModule, NgbModule],
    exports: [
        AttachmentComponent,
        AttachmentUploadComponent,
        PaginationComponent,
        TabComponent,
        TabsComponent
    ]
})
export class SharedCommonModule {}
