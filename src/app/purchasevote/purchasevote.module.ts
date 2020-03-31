/** @format */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PurchasevoteRoutingModule} from './purchasevote-routing.module';
import {PurchasevoteComponent} from './purchasevote.component';
@NgModule({
    declarations: [PurchasevoteComponent],
    imports: [CommonModule, PurchasevoteRoutingModule]
})
export class PurchasevoteModule {}
