import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudComponent } from './crud.component';
import { CrudRoutingModule } from './crud-routing.module';
import { SharedCommonContestantModule } from '../../shared-common/shared-common-contestant.module';
import { SharedCommonCrudModule } from '../common-shared/shared-common.crud.module';
@NgModule({
  declarations: [CrudComponent],
  imports: [
    CommonModule,
    CrudRoutingModule,
    SharedCommonContestantModule,
    SharedCommonCrudModule
  ]
})
export class CrudModule { }
