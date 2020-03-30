/** @format */

import {Injectable} from '@angular/core';
import {QueryParam} from '../models/query-param';
@Injectable()
export class SettingsService {
	public settings: any;
	setSettings(): void {
		const settingsList: string = AppConst.NON_AUTH_SERVER_URL.SETTINGS;
		const queryParam: QueryParam = {
			is_web: true
		};
		this.settings = this.apiService.httpGet(settingsList, queryParam);
	}
}
