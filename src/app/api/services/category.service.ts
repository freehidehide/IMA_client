
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AppConst } from '../../utils/app-const';
import { Observable } from 'rxjs';

import { CategoriesList } from '../models/categories-list';
import { WinnerList } from '../models/winner-list';
import { UserList } from '../models/user-list';
import { ContestList } from '../models/contest-list';
import { QueryParam } from '../models/query-param';

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

    getWinnerList(queryParam: QueryParam): Observable<WinnerList> {
        const contestantsList: string =
            AppConst.NON_AUTH_SERVER_URL.HIGHEST_VOTES;
        return this.apiService.httpGet(contestantsList, queryParam);
    }

    getRecentWinnerList(queryParam: QueryParam): Observable<UserList> {
        const contestantsList: string =
            AppConst.NON_AUTH_SERVER_URL.RECENT_WINNER;
        return this.apiService.httpGet(contestantsList, queryParam);
    }

    getContest(queryParam: QueryParam): Observable<ContestList> {
        const contestList: string =
            AppConst.NON_AUTH_SERVER_URL.CONTEST;
        return this.apiService.httpGet(contestList, queryParam);
    }
}
