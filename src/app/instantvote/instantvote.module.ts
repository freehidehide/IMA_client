import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InstantvoteRoutingModule} from './instantvote-routing.module';
import {InstantvoteComponent} from './instantvote.component';
import {SharedCommonContestantModule} from '../shared-common/shared-common-contestant.module';
import {CategoryService} from '../api/services/category.service';
@NgModule({
    declarations: [InstantvoteComponent],
    imports: [
        CommonModule,
        InstantvoteRoutingModule,
        SharedCommonContestantModule
    ],
    providers: [CategoryService]
})
export class InstantvoteModule {}
