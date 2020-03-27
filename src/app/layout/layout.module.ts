/** @format */

import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TranslateModule} from '@ngx-translate/core'
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap'

import {LayoutRoutingModule} from './layout-routing.module'
import {LayoutComponent} from './layout.component'
import {SidebarComponent} from './components/sidebar/sidebar.component'
import {DefaultHeaderComponent} from './components/header/default.header.component'

@NgModule({
	imports: [
		CommonModule,
		LayoutRoutingModule,
		TranslateModule,
		NgbDropdownModule
	],
	declarations: [LayoutComponent, SidebarComponent, DefaultHeaderComponent]
})
export class LayoutModule {}
