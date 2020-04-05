
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PurchasevoteRoutingModule} from './purchasevote-routing.module';
import {PurchasevoteComponent} from './purchasevote.component';
import {UserService} from '../api/services/user.service';
import {PaymentService} from '../api/services/payment.service';
import {SharedCommonContestantModule} from '../shared-common/shared-common-contestant.module';
@NgModule({
    declarations: [PurchasevoteComponent],
    imports: [CommonModule, PurchasevoteRoutingModule, SharedCommonContestantModule],
    providers: [UserService, PaymentService]
})
export class PurchasevoteModule {}
