/** @format */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryService} from '../api/services/category.service';
import {ContestantsRoutingModule} from './contestants-routing.module';
import {SharedCommonModule} from '../shared-common/shared-common.module';
import {ContestantsComponent} from './contestants.component';
@NgModule({
    declarations: [ContestantsComponent],
    imports: [CommonModule, ContestantsRoutingModule, SharedCommonModule],
    providers: [CategoryService]
})
export class ContestantsModule {}
