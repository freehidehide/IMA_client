import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../api/services/toast-service';
import { ProductService } from '../api/services/product.service';
import { ServiceResponse } from '../api/models/service-response';
import { ProductList } from '../api/models/product-list';
import { User } from '../api/models/user';
import { Attachment } from '../api/models/attachment';
import { Product } from '../api/models/product';
import { AppConst } from '../utils/app-const';
import { BaseComponent } from '../base.component';
import { QueryParam } from '../api/models/query-param';
import { SessionService } from '../api/services/session-service';
import { StartupService } from '../api/services/startup.service';
@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent extends BaseComponent implements OnInit {
    public productList: ProductList;
    public isNodata: boolean;
    public settings: any;
    constructor(
        protected router: Router,
        private productService: ProductService,
        private toastService: ToastService,
        public sessionService: SessionService,
        public startupService: StartupService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.settings = this.startupService.startupData();
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
                    this.addInitialProducts();
                }
            }
            this.toastService.clearLoading();
        });
    }

    addInitialProducts() {
        this.productList.data.forEach(product => {
            product.showDetail = product.details[0];
            product.showDetail.panelImage = product.details[0].attachments[0];
        });
    }

    trackById(index: number, el: any): number {
        return el.id;
    }

    redirect(user: User): void {
        const url: string = '/profile/' + user.id;
        this.router.navigate([url]);
    }

    changeImage(product: Product, attachment: Attachment) {
        product.showDetail.panelImage = attachment;
    }

    changeDetail(productIndex: number, index: number) {
        this.productList.data[productIndex].showDetail = this.productList.data[productIndex].details[index];
        this.productList.data[productIndex].showDetail.panelImage = this.productList.data[productIndex].details[index].attachments[0];
    }

    addToCart() {
        if (sessionService.isAuth) {

        } else {
            this.router.navigate(['/login']);
        }
    }
}
