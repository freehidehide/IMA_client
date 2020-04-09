
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../api/services/payment.service';
import { ToastService } from '../api/services/toast-service';
import { Payment } from '../api/models/payment';
import { AppConst } from '../utils/app-const';
import { QueryParam } from '../api/models/query-param';
import { PaymentGatewaysListData } from '../api/models/payment-gateways-list-data';
import { PaymentGatewaysList } from '../api/models/payment-gateways-list';
import { StartupService } from '../api/services/startup.service';
@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
    public payment: Payment;
    public paymentGatewaysListData: PaymentGatewaysListData;
    public paymentGateways: PaymentGatewaysList[] = [];
    public isProduct = false;
    public isFund = false;
    public fund = 'fund';
    public subscription = 'subscription';
    public name: string;
    public paymentType: string;
    public payment_gatewayId: number;
    public amount: number;
    public settings: any;
    constructor(public paymentService: PaymentService,
        private toastService: ToastService,
        private activatedRoute: ActivatedRoute,
        public startupService: StartupService) {}

    ngOnInit(): void {
        this.settings = this.startupService.startupData();
        this.paymentGateway();
        this.paymentType = this.activatedRoute.snapshot.paramMap.get('type');
        if (this.paymentType === this.fund) {
            this.name = 'Donate';
            this.isFund = true;
        }
        if (this.paymentType === this.subscription) {
            this.name = 'Subscription';
        }
    }

    switchPayment() {
        if (this.paymentType === this.fund) {
            //
        }
    }

    paymentGateway() {
        this.toastService.showLoading();
        const queryParam: QueryParam = {
            is_active: true,
            sort: 'id',
            sortby: 'ASC'
        };
        this.paymentService
            .paymentGateway(queryParam)
            .subscribe((response) => {
                this.paymentGatewaysListData = response;
                this.paymentGateways = this.paymentGatewaysListData.data;
                this.toastService.clearLoading();
            });
    }

    pay() {
        if (this.paymentType === this.fund) {
            this.donate();
        } else if (this.paymentType === this.subscription) {
            this.subscriptions();
        }
    }

    donate() {
        if (this.amount > 1) {
            this.toastService.showLoading();
            // this.payment_gatewayId
            const queryParam: QueryParam = {
                payment_gateway_id: 1,
                amount: this.amount
            };
            this.paymentService
                .fund(queryParam)
                .subscribe((response) => {
                    this.payment = response;
                    if (
                    this.payment.error &&
                    this.payment.error.code === AppConst.SERVICE_STATUS.SUCCESS
                ) {
                    window.location.href = this.payment.payUrl;
                } else {
                    this.toastService.error(this.payment.error.message);
                }
                    this.toastService.clearLoading();
                });
        } else {
            this.toastService.error('Amount should be greater then ' + this.settings.CURRENCY_CODE + '1');
        }
    }

    subscriptions() {
        this.toastService.showLoading();
        // this.payment_gatewayId
        const queryParam: QueryParam = {
            payment_gateway_id: 1
        };
        this.paymentService
            .subscription(queryParam)
            .subscribe((response) => {
                this.payment = response;
                if (
                this.payment.error &&
                this.payment.error.code === AppConst.SERVICE_STATUS.SUCCESS
            ) {
                window.location.href = this.payment.payUrl;
            } else {
                this.toastService.error(this.payment.error.message);
            }
                this.toastService.clearLoading();
            });
    }

    trackById(index: number, el: any): number {
        return el.id;
    }
}
