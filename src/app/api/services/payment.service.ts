
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AppConst } from '../../utils/app-const';
import { Observable } from 'rxjs';
import { VotePackageList } from '../models/vote-package-list';
import { PaymentGatewaysListData } from '../models/payment-gateways-list-data';
import { Payment } from '../models/payment';
import { QueryParam } from '../models/query-param';

@Injectable()
export class PaymentService {
    constructor(private apiService: ApiService) {}

    paymentGateway(queryParam: QueryParam): Observable<PaymentGatewaysListData> {
        const url: string = AppConst.NON_AUTH_SERVER_URL.PAYMENT_GATEWAYS;
        return this.apiService.httpGet(url, queryParam);
    }

    votePackages(queryParam: QueryParam): Observable<VotePackageList> {
        const votePackagesList: string = AppConst.NON_AUTH_SERVER_URL.VOTEPACKAGES;
        return this.apiService.httpGet(votePackagesList, queryParam);
    }

    fund(queryParam: QueryParam): Observable<Payment> {
        const url: string = AppConst.NON_AUTH_SERVER_URL.FUND;
        return this.apiService.httpGet(url, queryParam);
    }

    subscription(queryParam: QueryParam): Observable<Payment> {
        const url: string = AppConst.NON_AUTH_SERVER_URL.SUBSCRIPTION;
        return this.apiService.httpGet(url, queryParam);
    }
}
