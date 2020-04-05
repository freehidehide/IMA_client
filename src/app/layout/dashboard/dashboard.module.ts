/** @format */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {NotificationComponent} from './components';
import {StatModule} from '../../shared';
import {ChartsModule} from '../charts/charts.module';
@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartsModule,
        StatModule
    ],
    declarations: [DashboardComponent, NotificationComponent],
    exports: [ChartsModule]
})
export class DashboardModule {}
