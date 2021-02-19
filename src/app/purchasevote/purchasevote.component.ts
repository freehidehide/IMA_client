
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../api/services/toast-service';
import { UserService } from '../api/services/user.service';
import { PaymentService } from '../api/services/payment.service';
import { SessionService } from '../api/services/session-service';
import { UserBaseComponent } from '../user.base.component';
import { QueryParam } from '../api/models/query-param';
import { User } from '../api/models/user';
import { VotePackage } from '../api/models/vote-package';
import { StartupService } from '../api/services/startup.service';
@Component({
    selector: 'app-purchasevote',
    templateUrl: './purchasevote.component.html',
    styleUrls: ['./purchasevote.component.scss']
})
export class PurchasevoteComponent extends UserBaseComponent
implements OnInit {
    public votePackages: VotePackage[] = [];
    public settings: any;
    public type: string;
    public customCount = 2;
    constructor(
        protected router: Router,
        protected userService: UserService,
        protected toastService: ToastService,
        private activatedRoute: ActivatedRoute,
        public sessionService: SessionService,
        public startupService: StartupService,
        public paymentService: PaymentService
    ) {
        super(router, userService, toastService);
    }

    ngOnInit(): void {
        this.settings = this.startupService.startupData();
        this.type = this.activatedRoute.snapshot.paramMap.get('type');
        this.username = this.activatedRoute.snapshot.paramMap.get('username');
        this.categoryId = window.history.state.category_id;
        if (this.username) {
            this.getUser(null);
            this.getvotePackagesList();
        } else {
            this.router.navigate(['/']);
        }
    }

    getvotePackagesList(): void {
        this.paymentService
            .votePackages(null)
            .subscribe((response) => {
              if (response.data) {
                this.votePackages = response.data;
              }
              this.toastService.clearLoading();
            });
    }

    redirect(id: number): void {
        let url: string;
        let state: any = null;
        if (this.router.url.includes('/instant_vote/')) {
            url = 'checkout/instant_votes?contest=' + id + '&username=' + this.username + '&customcount=' + this.customCount;
        } else {
            url = 'checkout/votes?package=' + id + '&username=' + this.username + '&customcount=' + this.customCount;
            state = {
                state: {
                    category_id: this.categoryId
                }
            };
        }
        // if (!this.sessionService.isAuth) {
        //      url = url.replace('?', '#');
        //      url = '/login?f=' + url;
        //      if (state !== null) {
        //         this.router.navigateByUrl(url, state);
        //      } else {
        //         this.router.navigateByUrl(url);
        //      }
        // } else {
            this.router.navigate([url]);
        ///}
    }
}
