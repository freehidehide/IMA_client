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
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        this.userService.login(this.loginForm)
            .subscribe(data => {
                this.serviceResponse = data;
                this.submitted = false;
                if (this.serviceResponse.status === AppConst.SERVICE_STATUS.SUCCESS) {
                    this.userResponse = this.serviceResponse.data;
                    this.toastMessage.success(null, this.serviceResponse.statusMessage);
                    sessionStorage.setItem('user_context', JSON.stringify(this.userResponse));
                    if (this.serviceResponse.data.user.role === 'Admin') {
                        this.router.navigate(['/dashboard']);
                    } else {
                        this.router.navigate(['/contestants']);
                    }
                } else {
                    this.toastMessage.error(null, this.serviceResponse.statusMessage);
                }
            });
    }
	
	onKeydown(event) {
	  if (event.key === "Enter") {
		this.onSubmit();
	  }
	}

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }
}
