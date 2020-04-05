import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';
import { SharedCommonContestantModule } from '../../../../shared-common/shared-common-contestant.module';
@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    SharedCommonContestantModule
  ]
})
export class AddModule { }
