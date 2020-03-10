import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContestantprofileComponent } from './Contestantprofile.component';


const routes: Routes = [
  {
      path: '', component: ContestantprofileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestantprofileRoutingModule { }
