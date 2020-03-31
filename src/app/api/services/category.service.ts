/** @format */

import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {AppConst} from '../../utils/app-const';
import {Observable} from 'rxjs';

import {CategoriesList} from '../models/categories-list';
import {UserList} from '../models/user-list';
import {QueryParam} from '../models/query-param';

@Injectable()
export class CategoryService {
    constructor(private apiService: ApiService) {}

    getAll(queryParam: QueryParam): Observable<CategoriesList> {
        const categoriesList: string = AppConst.NON_AUTH_SERVER_URL.ALLCATEGORY;
        return this.apiService.httpGet(categoriesList, queryParam);
    }

    getContestantsList(queryParam: QueryParam): Observable<UserList> {
        const contestantsList: string =
            AppConst.NON_AUTH_SERVER_URL.CONTESTANTS;
        return this.apiService.httpGet(contestantsList, queryParam);
    }
}
