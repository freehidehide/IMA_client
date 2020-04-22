
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../api/services/user.service';
import { ContestantprofileRoutingModule } from './contestantprofile-routing.module';
import { SharedCommonModule } from '../shared-common/shared-common.module';
import { ContestantprofileComponent } from './contestantprofile.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../api/services/category.service';
@NgModule({
    declarations: [ContestantprofileComponent],
    imports: [CommonModule, ContestantprofileRoutingModule, SharedCommonModule,
        NgbModule, FormsModule],
    providers: [UserService, CategoryService]
})
export class ContestantprofileModule {}
