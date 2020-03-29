/** @format */

import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../api/services/toast-service';
import { UserService } from '../api/services/user.service';
import { SessionService } from '../api/services/session-service';
import { UserBaseComponent } from '../user.base.component';
import { User } from '../api/models/user';

@Component({
	selector: 'app-editprofile',
	templateUrl: './editprofile.component.html',
	styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent extends UserBaseComponent implements OnInit {
    public isSubmitted: boolean;
    public userId: number;
    public userClass = 'UserAvatar';
    public multiple = 'multiple';
    public editProfileForm: FormGroup;
    public user: User;
	constructor(
        protected router: Router,
		private formBuilder: FormBuilder,
		protected toastService: ToastService,
        protected userService: UserService,
        private sessionService: SessionService
    ) {
        super(router, userService, toastService);
    }

    ngOnInit(): void {
        this.editProfileForm = this.formBuilder.group({
            first_name: ['', [Validators.required]],
            last_name: ['', [Validators.required]],
            // email: ['', [Validators.required, Validators.email]],
            username: ['', [Validators.required]],
            address: this.formBuilder.group({
                addressline1: ['', [Validators.required]],
                addressline2: ['', [Validators.required]],
                city: ['', [Validators.required]],
                state: ['', [Validators.required]],
                country: ['', [Validators.required]],
                zipcode: ['', [Validators.required]]
            })
        });
        this.editProfileForm.patchValue({
            first_name: 'test',
        });
        this.userId = this.sessionService.user.id;
        this.getUser();
        setTimeout(() => {
            console.log('user', this.user);
        }, 500);

    }

    get f() {
		return this.editProfileForm.controls;
	}

    onSubmit() {
        this.isSubmitted = true;
        if (this.editProfileForm.invalid) {
			return;
        }
        this.toastService.showLoading();
		this.userService
			.updateUser(this.editProfileForm.value)
			.subscribe((data) => {
				this.isSubmitted = false;
				this.toastService.clearLoading();
				if (data.error.code) {
					this.toastService.error(data.error.message);
				} else {
					this.toastService.success(data.error.message);
				}
			});

    }



}
