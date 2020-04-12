import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../api/services/transaction.service';
import { QueryParam } from '../api/models/query-param';
import { ToastService } from '../api/services/toast-service';

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
    public productTransactionData: [];
    public votePackageTransactionData: [];
    public instantTransactionData: [];
    public subscriptionTransactionData: [];
    public fundTransactionData: [];
    constructor(public transactionService: TransactionService, public toastService: ToastService) {}

    ngOnInit(): void {
        this.getTransactionDetails('Product');
    }

    tabSelected($event) {
        this.getTransactionDetails($event);
    }

    getTransactionDetails(paramclass: string) {
        this.toastService.showLoading();
        const queryParam: QueryParam = {
            class: paramclass
        };
        this.transactionService
            .getTransactionData(queryParam)
            .subscribe((data) => {
                this.toastService.clearLoading();
                if (paramclass === 'Product') {
                    this.productTransactionData = data.data;
                } else if (paramclass === 'VotePackage') {
                    this.votePackageTransactionData = data.data;
                } else if (paramclass === 'InstantPackage') {
                    this.instantTransactionData = data.data;
                } else if (paramclass === 'SubscriptionPackage') {
                    this.subscriptionTransactionData = data.data;
                } else if (paramclass === 'Fund') {
                    this.fundTransactionData = data.data;
                }

            });
    }
}
