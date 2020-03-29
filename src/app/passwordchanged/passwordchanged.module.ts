/** @format */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PasswordchangedRoutingModule} from './passwordchanged-routing.module';
import {PasswordchangedComponent} from './passwordchanged.component';
import { LanguageTranslationModule } from '../shared/modules/language-translation/language-translation.module';
@NgModule({
	declarations: [PasswordchangedComponent],
	imports: [
        CommonModule,
        PasswordchangedRoutingModule,
        LanguageTranslationModule
    ]
})
export class PasswordchangedModule {}
