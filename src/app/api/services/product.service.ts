/** @format */

import {Injectable} from '@angular/core'
import {ApiService} from './api.service'
import {AppConst} from '../../utils/app-const'
import {Observable} from 'rxjs'

import {ProductList} from '../models/product-list'

@Injectable()
export class ProductService {
	constructor(private apiService: ApiService) {}

	getAll(): Observable<ProductList> {
		const products: string = AppConst.SERVER_URL.PRODUCTS
		return this.apiService.httpGet(products)
	}
}
