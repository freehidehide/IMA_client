
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { AppConst } from '../../utils/app-const';
@Injectable()
export class SessionService {
    public isAuth: boolean;
    public user: User;
    public auth: string;
    private _adminSettings: any;
    constructor(public router: Router,
        private apiService: ApiService) {}

    isLogined(): void {
        this.auth = sessionStorage.getItem('user_context');
        this.isAuth = (this.auth !== undefined && this.auth !== null);
        if (this.isAuth) {
            this.setAuthResponse();
        }
    }

    setAuthResponse(): void {
        this.user = JSON.parse(sessionStorage.getItem('user_context'));
    }

    setAdminSettingList(value) {
        this._adminSettings = value;
    }

    getAdminSettingList() {
        return this._adminSettings;
    }

    getAdminSettingsHandler(): Observable<any> {
        const adminConfigUrl: string = AppConst.SERVER_URL.ADMIN_CONFIG;
        return this.apiService.httpGet(adminConfigUrl, null);
    }

    logout(): void {
        sessionStorage.removeItem('user_context');
        this.isAuth = false;
    }
}
