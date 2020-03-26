import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductService } from "../api/services/product.service";
import { ShopRoutingModule } from "./shop-routing.module";

@NgModule({
    declarations: [],
    imports: [CommonModule, ShopRoutingModule],
    providers: [ProductService]
})
export class ShopModule {}
