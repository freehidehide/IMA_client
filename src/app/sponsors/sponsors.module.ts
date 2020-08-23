import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsorsComponent } from './sponsors.component';
import { SponsorsRoutingModule } from './sponsors-routing.module';
@NgModule({
  declarations: [
    SponsorsComponent
  ],
  imports: [
    CommonModule,
    SponsorsRoutingModule
  ]
})
export class SponsorsModule { }
