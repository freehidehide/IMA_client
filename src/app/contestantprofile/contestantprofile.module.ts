/** @format */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from '../api/services/user.service';
import {ContestantprofileRoutingModule} from './contestantprofile-routing.module';
import {SharedCommonModule} from '../shared-common/shared-common.module';
import {ContestantprofileComponent} from './contestantprofile.component';
@NgModule({
    declarations: [ContestantprofileComponent],
    imports: [CommonModule, ContestantprofileRoutingModule, SharedCommonModule],
    providers: [UserService]
})
export class ContestantprofileModule {}
