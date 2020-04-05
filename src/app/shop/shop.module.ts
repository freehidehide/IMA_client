
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductService} from '../api/services/product.service';
import {ShopRoutingModule} from './shop-routing.module';
import {ShopComponent} from './shop.component';
import {SharedCommonModule} from '../shared-common/shared-common.module';
@NgModule({
    declarations: [ShopComponent],
    imports: [CommonModule, ShopRoutingModule, SharedCommonModule],
    providers: [ProductService]
})
export class ShopModule {}
