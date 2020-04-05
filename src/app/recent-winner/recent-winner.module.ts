import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentWinnerComponent } from './recent-winner.component';
import { RecentWinnerRoutingModule } from './recent-winner-routing.module';
import { SharedCommonContestantModule } from '../shared-common/shared-common-contestant.module';
import { CategoryService } from '../api/services/category.service';
@NgModule({
  declarations: [RecentWinnerComponent],
  imports: [
    CommonModule,
    SharedCommonContestantModule,
    RecentWinnerRoutingModule
  ],
  providers: [CategoryService]
})
export class RecentWinnerModule { }
