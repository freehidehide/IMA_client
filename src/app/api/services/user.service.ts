import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ApiService } from "./api.service";
import { AppConst } from "../../utils/app-const";
import { Observable } from "rxjs";

import { UserResponse } from "../models/user-response";

@Injectable()
export class UserService {
    constructor(private apiService: ApiService) {}

    register(registerForm: FormGroup): Observable<UserResponse> {
        const register: string = AppConst.SERVER_URL.REGISTER;
        return this.apiService.httpPost(register, registerForm.value);
    }

    login(loginForm: FormGroup): Observable<UserResponse> {
        const login: string = AppConst.SERVER_URL.LOGIN;
        return this.apiService.httpPost(login, loginForm.value);
    }

    update(updateForm: FormGroup): Observable<UserResponse> {
        const updateDetail: string = AppConst.SERVER_URL.USER;
        return this.apiService.httpPut(updateDetail, updateForm.value);
    }

    changePassword(changePasswordForm: FormGroup): Observable<UserResponse> {
        const changePassword: string = AppConst.SERVER_URL.CHANGEPASSWORD;
        return this.apiService.httpPut(
            changePassword,
            changePasswordForm.value
        );
    }

    forgotPassword(forgotForm: FormGroup): Observable<UserResponse> {
        const forgotPassword: string = AppConst.SERVER_URL.FORGETPASSWORD;
        return this.apiService.httpPost(forgotPassword, forgotForm.value);
    }
}
