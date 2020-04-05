
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewprofileRoutingModule } from './viewprofile-routing.module';
import { ViewprofileComponent } from './viewprofile.component';
@NgModule({
    declarations: [ViewprofileComponent],
    imports: [CommonModule, ViewprofileRoutingModule]
})
export class ViewprofileModule {}
