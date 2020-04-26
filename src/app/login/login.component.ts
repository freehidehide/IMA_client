
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../api/services/toast-service';
import { UserService } from '../api/services/user.service';
import { SessionService } from '../api/services/session-service';
import { ServiceResponse } from '../api/models/service-response';
import { User } from '../api/models/user';
import { AppConst } from '../utils/app-const';
import { BaseComponent } from '../base.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent extends BaseComponent implements OnInit {
    public loginForm: FormGroup;
    public serviceResponse: ServiceResponse = new ServiceResponse();
    public submitted: Boolean;
    public user: User = new User();
    constructor(
        public router: Router,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private sessionService: SessionService,
        private toastService: ToastService
    ) {
        super();
    }

    ngOnInit() {
        const isSessionExpired = sessionStorage.getItem('session_expired');
        const isBackendFailure = sessionStorage.getItem('backend_failure');
        if (isSessionExpired !== undefined && isSessionExpired === 'true') {
            sessionStorage.removeItem('session_expired');
            this.toastService.warning('Session Expired');
        } else if (
            isBackendFailure !== undefined &&
            isBackendFailure === 'true'
        ) {
            sessionStorage.removeItem('backend_failure');
            this.toastService.error(
                'We are facing a backend problem, please try again after sometimes or if the issue exist kindly contact adminstrator'
            );
        }
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    get f() {
        return this.loginForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.toastService.showLoading();
        this.userService.login(this.loginForm).subscribe((data) => {
            this.submitted = false;
            this.user = data;
            if (
                this.user.error &&
                this.user.error.code === AppConst.SERVICE_STATUS.SUCCESS
            ) {
                this.toastService.success(this.user.error.message);
                sessionStorage.setItem(
                    'user_context',
                    JSON.stringify(this.user)
                );
                sessionStorage.setItem('access_token', this.user.access_token);
                sessionStorage.setItem('refresh_token', this.user.refresh_token);
                const dt = new Date();
                dt.setMinutes( dt.getMinutes() + 60 );
                sessionStorage.setItem(
                    'login_time', dt.toString()
                );
                this.sessionService.isLogined();
                if (this.user.role.id === AppConst.ROLE.ADMIN || this.user.role.id === AppConst.ROLE.COMPANY) {
                    this.router.navigate(['/admin']);
                } else if (this.user.role.id === AppConst.ROLE.CONTESTANT) {
                    this.router.navigate(['/profile/' + this.user.slug]);
                } else {
                    this.router.navigate(['/']);
                }
            } else {
                this.toastService.error(this.user.error.message);
            }
            this.toastService.clearLoading();
        });
    }

    onKeydown(event): void {
        if (event.key === 'Enter') {
            this.onSubmit();
        }
    }
}
