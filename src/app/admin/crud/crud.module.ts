import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudComponent } from './crud.component';
import {CrudRoutingModule} from './crud-routing.module';
import {SharedCommonContestantModule} from '../../shared-common/shared-common-contestant.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CrudComponent,
    CrudRoutingModule,
    SharedCommonContestantModule
  ]
})
export class CrudModule { }
