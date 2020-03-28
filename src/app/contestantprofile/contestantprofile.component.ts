/** @format */

import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {ToastService} from '../api/services/toast-service';
import {UserService} from '../api/services/user.service';
import {User} from '../api/models/user';
import {QueryParam} from '../api/models/query-param';
import {AppConst} from '../utils/app-const';
import {BaseComponent} from '../base.component';
import {SessionService} from '../api/services/session-service';
@Component({
	selector: 'app-contestantprofile',
	templateUrl: './contestantprofile.component.html',
	styleUrls: ['./contestantprofile.component.scss']
})
export class ContestantprofileComponent extends BaseComponent
	implements OnInit {
	public user: User;
	public userId: number = 1;

	constructor(
		private router: Router,
		private userService: UserService,
		private toastService: ToastService,
		private activatedRoute: ActivatedRoute,
		public sessionService: SessionService
	) {
		super();
	}

	ngOnInit(): void {
		this.userId = +this.activatedRoute.snapshot.paramMap.get('id');
		if (this.userId) {
			this.getUser();
		}
	}

	getUser(): void {
		this.toastService.showLoading();
		this.userService.findById(this.userId).subscribe((response) => {
			this.user = response;
			if (
				this.user.error &&
				this.user.error.code !== AppConst.SERVICE_STATUS.SUCCESS
			) {
				this.router.navigate(['/not-found']);
			}
			this.toastService.clearLoading();
		});
	}
}
