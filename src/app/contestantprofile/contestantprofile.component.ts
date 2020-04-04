/** @format */

import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {ToastService} from '../api/services/toast-service';
import {UserService} from '../api/services/user.service';
import {SessionService} from '../api/services/session-service';
import {UserBaseComponent} from '../user.base.component';
import {QueryParam} from '../api/models/query-param';
@Component({
    selector: 'app-contestantprofile',
    templateUrl: './contestantprofile.component.html',
    styleUrls: ['./contestantprofile.component.scss']
})
export class ContestantprofileComponent extends UserBaseComponent
    implements OnInit {
    constructor(
        protected router: Router,
        protected userService: UserService,
        protected toastService: ToastService,
        private activatedRoute: ActivatedRoute,
        public sessionService: SessionService
    ) {
        super(router, userService, toastService);
    }

    ngOnInit(): void {
        this.userId = +this.activatedRoute.snapshot.paramMap.get('id');
        this.categoryId = +this.activatedRoute.snapshot.paramMap.get('categoryId');
        if (this.userId) {
            this.getUser(null);
        } else {
            this.router.navigate(['/']);
        }
    }
}
