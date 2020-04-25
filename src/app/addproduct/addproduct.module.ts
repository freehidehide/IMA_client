import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddproductComponent } from './addproduct.component';
import { AddproductRoutingModule } from './addproduct-routing.module';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../api/services/category.service';
import { ColorPickerModule } from 'ngx-color-picker';
import { UserService } from '../api/services/user.service';
@NgModule({
  declarations: [AddproductComponent],
  imports: [
    CommonModule,
    AddproductRoutingModule,
    FormsModule,
    ColorPickerModule
  ],
  providers: [CategoryService, UserService]
})
export class AddproductModule { }
