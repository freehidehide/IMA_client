
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from './api.service';
import { AppConst } from '../../utils/app-const';
import { Observable } from 'rxjs';
import { QueryParam } from '../models/query-param';
import { User } from '../models/user';

@Injectable()
export class UserService {
    constructor(private apiService: ApiService) {}

    register(registerForm: FormGroup): Observable<User> {
        const register: string = AppConst.SERVER_URL.REGISTER;
        return this.apiService.httpPost(register, registerForm.value);
    }

    login(loginForm: FormGroup): Observable<User> {
        const login: string = AppConst.SERVER_URL.LOGIN;
        return this.apiService.httpPost(login, loginForm.value);
    }

    update(updateForm: FormGroup): Observable<User> {
        const updateDetail: string = AppConst.SERVER_URL.USER;
        return this.apiService.httpPut(updateDetail, updateForm.value);
    }

    updateImage(image: any): Observable<User> {
        const updateDetail: string = AppConst.SERVER_URL.USER_IMAGE;
        return this.apiService.httpPut(updateDetail, image);
    }

    changePassword(changePasswordForm: FormGroup): Observable<User> {
        const changePassword: string =
            AppConst.SERVER_URL.CHANGEPASSWORD;
        return this.apiService.httpPut(
            changePassword,
            changePasswordForm.value
        );
    }

    forgotPassword(forgotForm: FormGroup): Observable<User> {
        const forgotPassword: string =
            AppConst.SERVER_URL.FORGETPASSWORD;
        return this.apiService.httpPost(forgotPassword, forgotForm.value);
    }

    findById(id: number|string, queryParam: QueryParam): Observable<User> {
        const url: string = AppConst.SERVER_URL.USER + '/' + id;
        return this.apiService.httpGet(url, queryParam);
    }

    updateUser(user: User): Observable<User> {
        const userUrl: string = AppConst.SERVER_URL.USER;
        return this.apiService.httpPut(userUrl, user);
    }

    getAllPages(): Observable<any> {
        const url: string = AppConst.SERVER_URL.PAGES;
        return this.apiService.httpGet(url, null);
    }

    getPageContent(slug: number): Observable<any> {
        const url: string = AppConst.SERVER_URL.PAGES + '/' + slug;
        return this.apiService.httpGet(url, null);
    }

    postFile(request: any, queryParam: QueryParam): Observable<any> {
        const url: string = AppConst.SERVER_URL.ATTACHMENTS;
        return this.apiService.httpPostFile(url, request, queryParam);
    }

    logout(): Observable<any> {
        const url: string = AppConst.SERVER_URL.LOGOUT;
        return this.apiService.httpGet(url, null);
    }
}
