/** @format */

import {Component, OnInit} from '@angular/core';
import {SessionService} from './api/services/session-service';
import {SettingsService} from './api/services/settings-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private sessionService: SessionService,
        private settingsService: SettingsService
    ) {
        this.sessionService.isLogined();
        if (!this.settingsService.settings) {
            this.settingsService.setSettings();
        }
    }
}
