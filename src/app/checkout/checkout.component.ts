
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../api/services/payment.service';
import { ToastService } from '../api/services/toast-service';
import { Payment } from '../api/models/payment';
import { AppConst } from '../utils/app-const';
import { QueryParam } from '../api/models/query-param';
import { UserCategoryList } from '../api/models/user-category-list';
import { UserCategory } from '../api/models/user-category';
import { AddressList } from '../api/models/address-list';
import { Address } from '../api/models/address';
import { PaymentGatewaysListData } from '../api/models/payment-gateways-list-data';
import { PaymentGatewaysList } from '../api/models/payment-gateways-list';
import { StartupService } from '../api/services/startup.service';
import { CategoryService } from '../api/services/category.service';
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
    public cart = 'cart';
    public votes = 'votes';
    public instaVotes = 'insta_votes';
    public name: string;
    public paymentType: string;
    public payment_gatewayId: number;
    public user_address_id: number;
    public amount: number;
    public settings: any;
    public packageId: string;
    public categoryId: number;
    public contestantId: string;
    public userCategories: UserCategory[];
    public addressList: AddressList[] = [];
    public address: Address;
    public userCategoryList: UserCategoryList;
    public category_id: number;
    public isCategory = false;
    constructor(public paymentService: PaymentService,
        private toastService: ToastService,
        private activatedRoute: ActivatedRoute,
        public startupService: StartupService,
        public categoryService: CategoryService) {
            this.paymentType = this.activatedRoute.snapshot.paramMap.get('type');
            if (this.paymentType.indexOf('?') > -1) {
                const params = this.paymentType.split('?');
                this.paymentType = params[0];
                const types = params[1].split('&');
                const packId = types[0] ? types[0].split('=')[1] : 0;
                this.packageId = packId.toString();
                const contestantUserId = types[1] ? types[1].split('=')[1] : 0;
                this.contestantId = contestantUserId.toString();
                const catId = types[2] ? types[2].split('=')[1] : 0;
                this.categoryId = +catId;
            }
        }

    ngOnInit(): void {
        this.settings = this.startupService.startupData();
        this.paymentGateway();
        if (this.paymentType === this.fund) {
            this.name = 'Donate';
            this.isFund = true;
        } else if (this.paymentType === this.subscription) {
            this.name = 'Subscription';
        } else if (this.paymentType === this.votes) {
            this.name = 'votes';
            this.isCategory = true;
            this.getCategories();
        } else if (this.paymentType === this.instaVotes) {
            this.name = 'Instant votes';
        } else if (this.paymentType === this.cart) {
            this.name = 'Cart';
            this.isProduct = true;
            this.getAddress();
        }
    }

    getCategories() {
        this.toastService.showLoading();
        this.categoryService
            .getUserCategory(+this.contestantId, null)
            .subscribe((response) => {
                this.userCategoryList = response;
                this.userCategories = this.userCategoryList.data;
                if (this.categoryId !== 0) {
                    this.category_id = this.categoryId;
                } else {
                    this.category_id = this.userCategories[0].category.id;
                }
                this.toastService.clearLoading();
            });
    }

    getAddress() {
        this.toastService.showLoading();
        this.paymentService
            .address(null)
            .subscribe((response) => {
                /*this.addressList = response.data;
                const addressDetail: Address = new Address();
                addressDetail = {
                    name: 'Add New Address',
                    addressline1: '',
                    addressline2: '',
                    city: '',
                    state: '',
                    country: '',
                    zipcode: ''
                };
                this.addressList.push(addressDetail);
                this.user_address_id = this.addressList[0].id;
                this.address = this.addressList[0];
                this.toastService.clearLoading();*/
            });
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
                this.payment_gatewayId = this.paymentGateways[0].id;
                this.toastService.clearLoading();
            });
    }

    pay() {
        if (this.paymentType === this.fund) {
            this.donate();
        } else if (this.paymentType === this.subscription) {
            this.subscriptions();
        } else if (this.paymentType === this.votes) {
            this.votePurchase();
        } else if (this.paymentType === this.instaVotes) {
            this.instantVotePurchase();
        } else if (this.paymentType === this.cart) {
            this.cartCheckout();
        }
    }

    donate() {
        if (this.amount > 1) {
            this.toastService.showLoading();
            // this.payment_gatewayId
            const queryParam: QueryParam = {
                payment_gateway_id: 1,
                amount: this.amount,
                is_web: true
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
            payment_gateway_id: 1,
            is_web: true
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

    votePurchase() {
        this.toastService.showLoading();
        // this.payment_gatewayId
        const queryParam: QueryParam = {
            payment_gateway_id: 1,
            contestant_id: this.contestantId,
            category_id: this.category_id,
            is_web: true
        };
        this.paymentService
            .votePurchase(this.packageId, queryParam)
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

    instantVotePurchase() {
        this.toastService.showLoading();
        // this.payment_gatewayId
        const queryParam: QueryParam = {
            payment_gateway_id: 1,
            contestant_id: this.contestantId,
            is_web: true
        };
        this.paymentService
            .instantVotePurchase(this.packageId, queryParam)
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

    cartCheckout() {
        this.toastService.showLoading();
        // this.payment_gatewayId
        const queryParam: QueryParam = {
            payment_gateway_id: 1,
            is_web: true
           // user_address_id: this.contestantId
        };
        this.paymentService
            .cartPurchase(queryParam)
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
