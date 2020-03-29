/** @format */

import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastService } from '../api/services/toast-service';
import { UserService } from '../api/services/user.service';
import { SessionService } from '../api/services/session-service';
import { UserBaseComponent } from '../user.base.component';

@Component({
	selector: 'app-editprofile',
	templateUrl: './editprofile.component.html',
	styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent extends UserBaseComponent implements OnInit {

    public userId: number;
    public userClass = 'UserAvatar';
    public multiple = 'multiple';
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
        this.userId = this.sessionService.user.id;
        this.getUser();
    }



}
