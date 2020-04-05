
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from '../api/services/user.service';
import {ContestantprofileRoutingModule} from './contestantprofile-routing.module';
import {SharedCommonContestantModule} from '../shared-common/shared-common-contestant.module';
import {ContestantprofileComponent} from './contestantprofile.component';
@NgModule({
    declarations: [ContestantprofileComponent],
    imports: [CommonModule, ContestantprofileRoutingModule, SharedCommonContestantModule],
    providers: [UserService]
})
export class ContestantprofileModule {}
