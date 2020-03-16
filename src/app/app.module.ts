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
import { ApiService } from './api/services/api.service';
import { ShopComponent } from './shop/shop.component';
import { AdvertisersComponent } from './advertisers/advertisers.component';
import { ContestantprofileComponent } from './contestantprofile/contestantprofile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { PurchasevoteComponent } from './purchasevote/purchasevote.component';
import { ImalistingComponent } from './imalisting/imalisting.component';
import { CategoriesComponent } from './categories/categories.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResendlinkComponent } from './resendlink/resendlink.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { PasswordchangedComponent } from './passwordchanged/passwordchanged.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { ToastService } from './api/services/toast-service';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        FooterComponent,
        HeaderComponent,
		    ShopComponent,
		    AdvertisersComponent,
        ContestantprofileComponent,
        EditprofileComponent,
        PurchasevoteComponent,
        ImalistingComponent,
        CategoriesComponent,
        ForgotpasswordComponent,
        ResendlinkComponent,
        ResetpasswordComponent,
        PasswordchangedComponent,
        ViewprofileComponent
    ],
    providers: [
      AuthGuard,
      ApiService,
      ToastService
    ],
    bootstrap: [
      AppComponent
    ]
})
export class AppModule {}
