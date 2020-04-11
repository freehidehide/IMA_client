
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AppConst } from '../../utils/app-const';
import { Observable } from 'rxjs';

import { Product } from '../models/product';
import { QueryParam } from '../models/query-param';
import { Coupon } from '../models/coupon';
import { ProductList } from '../models/product-list';
@Injectable()
export class ProductService {
    constructor(private apiService: ApiService) {}

    getAll(queryParam: QueryParam): Observable<ProductList> {
        const products: string = AppConst.SERVER_URL.PRODUCTS;
        return this.apiService.httpGet(products, queryParam);
    }

    addToCart(queryParam: QueryParam | QueryParam[]): Observable<Product> {
        const url: string = AppConst.SERVER_URL.CART;
        return this.apiService.httpPut(url, queryParam);
    }

    deleteCart(queryParam: QueryParam): Observable<Product> {
        const url: string = AppConst.SERVER_URL.CART + '/' + queryParam.id;
        return this.apiService.httpDelete(url, queryParam);
    }

    cart(queryParam: QueryParam | QueryParam[]): Observable<ProductList> {
        const url: string = AppConst.SERVER_URL.CART;
        return this.apiService.httpGet(url, queryParam);
    }
}
