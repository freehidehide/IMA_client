
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { PaymentService } from '../api/services/payment.service';
import { CategoryService } from '../api/services/category.service';
@NgModule({
    declarations: [CheckoutComponent],
    imports: [CommonModule, CheckoutRoutingModule, FormsModule],
    providers: [PaymentService, CategoryService]

})
export class CheckoutModule {}
