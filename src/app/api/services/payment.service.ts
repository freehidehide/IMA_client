
import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {AppConst} from '../../utils/app-const';
import {Observable} from 'rxjs';
import {VotePackageList} from '../models/vote-package-list';
import {QueryParam} from '../models/query-param';

@Injectable()
export class PaymentService {
    constructor(private apiService: ApiService) {}

    votePackages(queryParam: QueryParam): Observable<VotePackageList> {
        const votePackagesList: string = AppConst.NON_AUTH_SERVER_URL.VOTEPACKAGES;
        return this.apiService.httpGet(votePackagesList, queryParam);
    }
}
