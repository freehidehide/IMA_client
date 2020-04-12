import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../api/services/toast-service';
import { ProductService } from '../api/services/product.service';
import { ServiceResponse } from '../api/models/service-response';
import { ProductList } from '../api/models/product-list';
import { User } from '../api/models/user';
import { Attachment } from '../api/models/attachment';
import { AppConst } from '../utils/app-const';
import { BaseComponent } from '../base.component';
import { QueryParam } from '../api/models/query-param';
import { Product } from '../api/models/product';
import { ProductSize } from '../api/models/product-size';
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
    public productDetail: Product;
    public productDetails: Product[] = [];
    public role_id: number;
    public q: string;
    public filterBy = 'Filter By All';

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
        this.role_id = undefined;
        this.q = undefined;
        this.getProducts();
    }

    role(id: number, by: string) {
        this.role_id = (id !== 0) ? id : undefined;
        this.filterBy = by;
    }

    getProducts(): void {
        this.toastService.showLoading();
        this.isNodata = true;
        const queryParam: QueryParam = {};
        queryParam.page = 1;
        queryParam.sortby = 'desc';
        if (this.role_id) {
            queryParam.role_id = this.role_id;
        }
        if (this.q) {
            queryParam.q = this.q;
        }
        this.productService.getAll(queryParam).subscribe((response) => {
            this.productList = response;
            if (
                this.productList.error &&
                this.productList.error.code !== AppConst.SERVICE_STATUS.SUCCESS
            ) {
                this.toastService.error(this.productList.error.message);
            } else {
                if (this.productList.data.length !== 0) {
                    this.isNodata = false;
                    this.productDetails = this.productList.data;
                    this.addInitialProducts();
                }
            }
            this.toastService.clearLoading();
        });
    }

    addInitialProducts() {
        this.productDetails.forEach(product => {
            product = this.formatProduct(product, 0);
        });
    }

    formatProduct(product: Product, detail: number) {
        product.showDetail = product.details[detail];
        product.showDetail.panelImage = product.details[detail].attachments[0];
        product.colors[0].isactive = true;
        product.showDetail.cart = {
            quantity: 0,
            sizes: [],
            coupon: {
                coupon_code: '',
                isValid: false
            }
        };
        if (product.showDetail.carts.length > 0) {
            product.showDetail.cart.quantity = product.showDetail.carts[0].quantity;
            if (product.showDetail.carts[0].coupon && product.showDetail.carts[0].coupon.coupon_code) {
                product.showDetail.cart.coupon.isValid = true;
                product.showDetail.cart.coupon.coupon_code = product.showDetail.carts[0].coupon.coupon_code;
            } else {
                product.showDetail.cart.coupon.coupon_code = '';
            }
            const sizes = [];
            product.showDetail.carts.forEach(cart => {
                if (cart.product_size_id !== 0) {
                    sizes.push({
                        product_size_id: cart.product_size_id,
                        quantity: cart.quantity
                    });
                }
            });
            product.showDetail.cart.sizes = sizes;
        }
        return product;
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
        this.productDetails[productIndex].showDetail = this.productDetails[productIndex].details[index];
        this.productDetails[productIndex].showDetail.panelImage = this.productDetails[productIndex].details[index].attachments[0];
        this.productDetails[productIndex] = this.formatProduct(this.productDetails[productIndex], index);
    }

    addToCart(product: Product) {
        if (this.sessionService.isAuth) {
            let isSize = false;
            const queryParam: QueryParam[] = [];
            if (product.showDetail.cart.quantity === 0) {
                this.toastService.error('Please add quantity');
                return;
            } else if (product.showDetail.sizes && product.showDetail.sizes.length > 1 ) {
                isSize = true;
                if (product.showDetail.cart.sizes.length === 0) {
                    this.toastService.error('Please choose size');
                    return;
                }
            }
            if (isSize) {
                product.showDetail.cart.sizes.forEach(sizesElement => {
                    queryParam.push({
                        product_detail_id: product.showDetail.id,
                        product_size_id: sizesElement.product_size_id,
                        quantity: sizesElement.quantity,
                        coupon_code: product.showDetail.cart.coupon.coupon_code
                    });
                });
            } else {
                queryParam.push({
                    product_detail_id: product.showDetail.id,
                    product_size_id: 0,
                    quantity: product.showDetail.cart.quantity,
                    coupon_code: product.showDetail.cart.coupon.coupon_code
                });
            }
            this.toastService.showLoading();
            this.productService.addToCart(queryParam).subscribe((response) => {
                this.productDetail = response;
                if (
                    this.productDetail.error &&
                    this.productDetail.error.code !== AppConst.SERVICE_STATUS.SUCCESS
                ) {
                    product.showDetail.cart.coupon_code = '';
                    this.toastService.error(this.productDetail.error.message);
                } else {
                    this.toastService.success(this.productDetail.error.message);
                }
                this.toastService.clearLoading();
            });
        } else {
            this.router.navigate(['/login']);
        }
    }

    addQuantity(product: Product) {
        product.showDetail.cart.quantity = (!product.showDetail.cart.quantity) ? 0 :
        product.showDetail.cart.quantity;
        if (product.showDetail.cart.quantity < product.showDetail.amount_detail.quantity) {
            product.showDetail.cart.quantity = ++product.showDetail.cart.quantity;
        }
    }

    removeQuantity(product: Product) {
        product.showDetail.cart.quantity = (!product.showDetail.cart.quantity) ? 0 :
        product.showDetail.cart.quantity;
        if (product.showDetail.cart.quantity !== 0) {
            product.showDetail.cart.quantity = --product.showDetail.cart.quantity;
        }

        product.showDetail.cart.sizes.forEach(sizeElement => {
            sizeElement.isactive = false;
        });
    }

    chooseSize(size: ProductSize, product: Product) {
        product.showDetail.cart.sizes.forEach(sizeElement => {
            sizeElement.isactive = false;
        });
        size.isactive = true;
    }
}
