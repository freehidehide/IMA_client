import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../api/services/transaction.service';
import { QueryParam } from '../api/models/query-param';

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

    constructor(public transactionService: TransactionService) { }

    ngOnInit(): void {
        this.getTransactionDetails('Product');
    }

    tabSelected($event) {
        this.getTransactionDetails($event);
    }

    getTransactionDetails(paramclass: string) {
        const queryParam: QueryParam = {
            class: paramclass
        };
        this.transactionService
            .getTransactionData(queryParam)
            .subscribe((data) => {
                console.log('data', data);
            });
    }
}

