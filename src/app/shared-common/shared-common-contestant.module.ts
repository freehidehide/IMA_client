
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AttachmentComponent} from './attachment/attachment.component';
import {PaginationComponent} from './pagination/pagination.component';
import {ContestantsComponent} from '../contestants/contestants.component';
import { WinnerComponent } from '../winner/winner.component';

@NgModule({
    declarations: [
        AttachmentComponent,
        PaginationComponent,
        ContestantsComponent,
        WinnerComponent
    ],
    imports: [
        CommonModule,
        NgbModule
    ],
    exports: [
        AttachmentComponent,
        PaginationComponent,
        ContestantsComponent,
        WinnerComponent
    ]
})
export class SharedCommonContestantModule {}
