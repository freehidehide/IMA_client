/** @format */

import {User} from './api/models/user';
import {Router} from '@angular/router';
import {UserService} from './api/services/user.service';
import {ToastService} from './api/services/toast-service';
import {AppConst} from './utils/app-const';
import {FormGroup} from '@angular/forms';
import {QueryParam} from './api/models/query-param';
export abstract class UserBaseComponent {
    public user: User;
    public userId: number;
    public editProfileForm: FormGroup;
    public categoryId: number;
    constructor(
        protected router: Router,
        protected userService: UserService,
        protected toastService: ToastService
    ) {}

    getUser(callback): void {
        this.toastService.showLoading();
        let queryParam: QueryParam;
            if (this.categoryId) {
                queryParam = {
                    category_id: this.categoryId
                };
            } else {
                queryParam = null;
            }
        this.userService.findById(this.userId, queryParam).subscribe((response) => {
            this.user = response.data;
            if (
                this.user.error &&
                this.user.error.code !== AppConst.SERVICE_STATUS.SUCCESS
            ) {
                this.router.navigate(['/']);
            }
            if (callback !== null) {
                this.patchuser(response);
            }
            this.toastService.clearLoading();
        });
    }

    patchuser(user: User) {
        this.editProfileForm.patchValue({
            first_name: user.data.first_name,
            last_name: user.data.last_name,
            email: user.data.email,
            address: {
                addressline1: user.data.address.addressline1,
                addressline2: user.data.address.addressline2,
                city: user.data.address.city,
                state: user.data.address.state,
                country: user.data.address.country,
                zipcode: user.data.address.zipcode
            }
        });
    }
}
