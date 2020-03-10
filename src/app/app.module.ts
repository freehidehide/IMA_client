import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ToastrModule } from 'ngx-toastr';
import { ApiService } from './api/services/api.service';
import { ShopComponent } from './shop/shop.component';
import { AdvertisersComponent } from './advertisers/advertisers.component';
import { ContestantprofileComponent } from './contestantprofile/contestantprofile.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        ToastrModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        FooterComponent,
        HeaderComponent,
		    ShopComponent,
		    AdvertisersComponent,
        ContestantprofileComponent
    ],
    providers: [
      AuthGuard,
      ApiService
    ],
    bootstrap: [
      AppComponent
    ]
})
export class AppModule {}
