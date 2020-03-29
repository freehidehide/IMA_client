/** @format */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PasswordchangedRoutingModule} from './passwordchanged-routing.module';
import {PasswordchangedComponent} from './passwordchanged.component';
@NgModule({
	declarations: [PasswordchangedComponent],
	imports: [CommonModule, PasswordchangedRoutingModule]
})
export class PasswordchangedModule {}
