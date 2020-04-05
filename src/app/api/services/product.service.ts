
import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {AppConst} from '../../utils/app-const';
import {Observable} from 'rxjs';

import {ProductList} from '../models/product-list';
import {QueryParam} from '../models/query-param';
@Injectable()
export class ProductService {
    constructor(private apiService: ApiService) {}

    getAll(queryParam: QueryParam): Observable<ProductList> {
        const products: string = AppConst.NON_AUTH_SERVER_URL.PRODUCTS;
        return this.apiService.httpGet(products, queryParam);
    }
}
