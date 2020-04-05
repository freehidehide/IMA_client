import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
// import { SharedCommonContestantModule } from '../../shared-common/shared-common-contestant.module';
@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    // SharedCommonContestantModule
  ]
})
export class EditModule { }
