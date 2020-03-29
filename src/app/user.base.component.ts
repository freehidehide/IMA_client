/** @format */

import { User } from './api/models/user';
import { Router } from '@angular/router';
import { UserService } from './api/services/user.service';
import { ToastService } from './api/services/toast-service';
import { AppConst } from './utils/app-const';

export abstract class UserBaseComponent {
    public user: User;
	public userId: number;
    constructor(
        protected router: Router,
		protected userService: UserService,
        protected toastService: ToastService,
    ) {}

    getUser(callback): void {
		this.toastService.showLoading();
		this.userService.findById(this.userId).subscribe((response) => {
			this.user = response;
			if (
				this.user.error &&
				this.user.error.code !== AppConst.SERVICE_STATUS.SUCCESS
			) {
                this.router.navigate(['/not-found']);
                if (callback !== null) {
                    callback();
                }
			}
			this.toastService.clearLoading();
		});
	}
}
