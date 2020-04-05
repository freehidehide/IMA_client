
import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable()
export class SessionService {
    public isAuth: boolean;
    public user: User;
    public auth: string;

    isLogined(): void {
        this.auth = sessionStorage.getItem('user_context');
        this.isAuth = this.auth !== undefined && this.auth !== null;
        if (this.isAuth) {
            this.setAuthResponse();
        }
    }

    setAuthResponse(): void {
        this.user = JSON.parse(sessionStorage.getItem('user_context'));
    }

    logout(): void {
        sessionStorage.removeItem('user_context');
        this.isAuth = false;
    }
}
