/** @format */

import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {ForgotpasswordRoutingModule} from './forgotpassword-routing.module'
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import {ForgotpasswordComponent} from './forgotpassword.component'
import {LanguageTranslationModule} from '../shared/modules/language-translation/language-translation.module'

@NgModule({
	declarations: [ForgotpasswordComponent],
	imports: [
		CommonModule,
		ForgotpasswordRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		LanguageTranslationModule
	]
})
export class ForgotpasswordModule {}
