import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdvertiserService } from "../api/services/advertisers.service";
import { AdvertisersRoutingModule } from "./advertisers-routing.module";

@NgModule({
    declarations: [],
    imports: [CommonModule, AdvertisersRoutingModule],
    providers: [AdvertiserService]
})
export class AdvertisersModule {}
