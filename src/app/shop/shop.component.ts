/** @format */

import {Component, OnInit} from '@angular/core';
import {ToastService} from '../api/services/toast-service';
import {ProductService} from '../api/services/product.service';
import {ServiceResponse} from '../api/models/service-response';
import {ProductList} from '../api/models/product-list';
import {AppConst} from '../utils/app-const';
import {BaseComponent} from '../base.component';
import {QueryParam} from '../api/models/query-param';

@Component({
	selector: 'app-shop',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.scss']
})
export class ShopComponent extends BaseComponent implements OnInit {
	public productList: ProductList;
	public isNodata: boolean;
	constructor(
		private productService: ProductService,
		private toastService: ToastService
	) {
		super();
	}

	ngOnInit(): void {
		this.getProducts();
	}

	getProducts(): void {
		this.toastService.showLoading();
		this.isNodata = true;
		const queryParam: QueryParam = {
			page: 1,
			sortby: 'desc'
		};
		this.productService.getAll(queryParam).subscribe((data) => {
			this.productList = data;
			if (
				this.productList.error &&
				this.productList.error.code !== AppConst.SERVICE_STATUS.SUCCESS
			) {
				this.toastService.error(this.productList.error.message);
			} else {
				if (this.productList.data.length !== 0) {
					this.isNodata = false;
				}
			}
			this.toastService.clearLoading();
		});
	}

	trackById(index: number, el: any): number {
		return el.id;
	}
}
