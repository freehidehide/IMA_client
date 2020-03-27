/** @format */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {SignupRoutingModule} from './signup-routing.module';
import {SignupComponent} from './signup.component';
import {UserService} from '../api/services/user.service';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		TranslateModule,
		SignupRoutingModule,
		ReactiveFormsModule
	],
	providers: [UserService],
	declarations: [SignupComponent]
})
export class SignupModule {}
