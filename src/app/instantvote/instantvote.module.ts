/** @format */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InstantvoteRoutingModule} from './instantvote-routing.module';
import {InstantvoteComponent} from './instantvote.component';

@NgModule({
	declarations: [InstantvoteComponent],
	imports: [CommonModule, InstantvoteRoutingModule]
})
export class InstantvoteModule {}
