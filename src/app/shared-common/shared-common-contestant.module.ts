/** @format */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
    imports: [CommonModule],
    exports: [
        AttachmentComponent,
        PaginationComponent,
        ContestantsComponent,
        WinnerComponent
    ]
})
export class SharedCommonContestantModule {}
