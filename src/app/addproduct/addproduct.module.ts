import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddproductComponent } from './addproduct.component';
import { AddproductRoutingModule } from './addproduct-routing.module';
@NgModule({
  declarations: [AddproductComponent],
  imports: [
    CommonModule,
    AddproductRoutingModule
  ]
})
export class AddproductModule { }
