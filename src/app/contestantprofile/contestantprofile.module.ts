/** @format */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from '../api/services/user.service';
import {ContestantprofileRoutingModule} from './contestantprofile-routing.module';

@NgModule({
	declarations: [],
	imports: [CommonModule, ContestantprofileRoutingModule],
	providers: [UserService]
})
export class ContestantprofileModule {}
