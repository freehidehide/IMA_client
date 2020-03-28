/** @format */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryService} from '../api/services/category.service';
import {ContestantsRoutingModule} from './contestants-routing.module';

@NgModule({
	declarations: [],
	imports: [CommonModule, ContestantsRoutingModule],
	providers: [CategoryService]
})
export class ContestantsModule {}
