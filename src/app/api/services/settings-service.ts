/** @format */

import {Injectable} from '@angular/core';
import {QueryParam} from '../models/query-param';
import {ApiService} from './api.service';
import {AppConst} from '../../utils/app-const';
@Injectable()
export class SettingsService {
    public settings: any;
    constructor(private apiService: ApiService) {}
    setSettings(): void {
        const settingsList: string = AppConst.NON_AUTH_SERVER_URL.SETTINGS;
        const queryParam: QueryParam = {
            is_web: true
        };
        this.apiService.httpGet(settingsList, queryParam).subscribe((data) => {
            this.settings = data;
        });
    }
}
