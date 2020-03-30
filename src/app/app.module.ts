/** @format */

import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LanguageTranslationModule} from './shared/modules/language-translation/language-translation.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuard} from './shared';

import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {ApiService} from './api/services/api.service';
import {ToastService} from './api/services/toast-service';
import {SessionService} from './api/services/session-service';
import {SettingsService} from './api/services/settings-service';
import {SiteAlertMessageComponent} from './site-alert-message/site-alert-message.component';
import {SiteLoaderComponent} from './site-loader/site-loader.component';

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
		FooterComponent,
		HeaderComponent,
		SiteAlertMessageComponent,
		SiteLoaderComponent
	],
	providers: [AuthGuard, ApiService, ToastService, SessionService, SettingsService],
	bootstrap: [AppComponent]
})
export class AppModule {}
