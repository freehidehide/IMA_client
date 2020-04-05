import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
// import { SharedCommonContestantModule } from '../../shared-common/shared-common-contestant.module';
@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
   // SharedCommonContestantModule
  ]
})
export class ListModule { }
