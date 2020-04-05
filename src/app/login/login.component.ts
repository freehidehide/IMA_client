
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routerTransition} from '../router.animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../api/services/toast-service';
import {UserService} from '../api/services/user.service';
import {SessionService} from '../api/services/session-service';
import {ServiceResponse} from '../api/models/service-response';
import {User} from '../api/models/user';
import {AppConst} from '../utils/app-const';
import {BaseComponent} from '../base.component';

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
    public User: User = new User();
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
        if (this.sessionService.auth) {
            this.router.navigate(['/contestants']);
        }
        const isSessionExpired = sessionStorage.getItem('session_expired');
        const isBackendFailure = sessionStorage.getItem('backend_failure');
        if (isSessionExpired !== undefined && isSessionExpired === 'true') {
            sessionStorage.removeItem('session_expired');
            this.toastService.error('Session Expired');
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
            password: ['', [Validators.required, Validators.minLength(3)]],
            role_id: [2]
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
            this.User = data;
            this.toastService.clearLoading();
            if (
                this.User.error &&
                this.User.error.code === AppConst.SERVICE_STATUS.SUCCESS
            ) {
                this.toastService.success(this.User.error.message);
                sessionStorage.setItem(
                    'user_context',
                    JSON.stringify(this.User)
                );
                this.sessionService.isLogined();
                if (this.User.role.id === AppConst.ROLE.USER) {
                    this.router.navigate(['/admin']);
                } else {
                    this.router.navigate(['/']);
                }
            } else {
                this.toastService.error(this.User.error.message);
            }
        });
    }

    onKeydown(event): void {
        if (event.key === 'Enter') {
            this.onSubmit();
        }
    }
}
