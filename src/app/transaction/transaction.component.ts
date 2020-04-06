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
    public transactionData: any;
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
                this.transactionData = data.data;
            });
    }
}
