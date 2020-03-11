import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastMessage } from '../utils/toast-message';
import { UserService } from '../api/services/user.service';
import { ServiceResponse } from '../api/models/service-response';
import { UserResponse } from '../api/models/user-response';
import { AppConst } from '../utils/app-const';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    
    public loginForm: FormGroup;
    public serviceResponse: ServiceResponse = new ServiceResponse();
    public submitted: Boolean;
    public userResponse: UserResponse = new UserResponse();
    constructor(
        public router: Router,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private toastMessage: ToastMessage
      ) {}

      ngOnInit() {
        const isSessionExpired = sessionStorage.getItem('session_expired');
        const isBackendFailure = sessionStorage.getItem('backend_failure');
        if (isSessionExpired !== undefined && isSessionExpired === 'true') {
            sessionStorage.removeItem('session_expired');
            this.toastMessage.error(null, 'Session Expired');
        } else if (isBackendFailure !== undefined && isBackendFailure === 'true') {
            sessionStorage.removeItem('backend_failure');
            this.toastMessage.error(null, 'We are facing a backend problem, please try again after sometimes or if the issue exist kindly contact adminstrator');
        }
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            role_id: [2]
        });
    }

    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.userService.login(this.loginForm)
            .subscribe(data => {
                this.submitted = false;
                this.userResponse = data;                
                if (this.userResponse.error && this.userResponse.error.code === AppConst.SERVICE_STATUS.SUCCESS) {
                    this.toastMessage.success(null, this.userResponse.error.message);
                    sessionStorage.setItem('user_context', JSON.stringify(this.userResponse));
                    if (this.userResponse.role.id === AppConst.ROLE.USER) {
                        this.router.navigate(['/dashboard']);
                    } else {
                        this.router.navigate(['/contestants']);
                    }
                } else {
                    this.toastMessage.error(null, this.userResponse.error.message);
                }
            });
    }
	
	onKeydown(event) {
	  if (event.key === "Enter") {
		this.onSubmit();
	  }
	}
}
