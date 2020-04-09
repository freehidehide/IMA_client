import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../api/services/category.service';
import { ToastService } from '../api/services/toast-service';
import { User } from '../api/models/user';
import { Contest } from '../api/models/contest';
import { QueryParam } from '../api/models/query-param';
import { AppConst } from '../utils/app-const';
import { BaseComponent } from '../base.component';
import { SessionService } from '../api/services/session-service';
@Component({
    selector: 'app-instantvote',
    templateUrl: './instantvote.component.html',
    styleUrls: ['./instantvote.component.scss']
})
export class InstantvoteComponent extends BaseComponent implements OnInit {
    public users: User[] = [];
    public contests: Contest[] = [];
    public contest: Contest;
    public isNodata: boolean;
    public categoryId = 1;
    public categoryName = '';
    public pageType: number;
    public interVal: number;
    public distance: number;
    public days: number;
    public hours: number;
    public minutes: number;
    public seconds: number;
    public pageTitle: string;
    public end_date: string;
    public isShowTime = false;
    public isShopTime = false;
    constructor(
        private router: Router,
        private categoryService: CategoryService,
        private activatedRoute: ActivatedRoute,
        private toastService: ToastService,
        public sessionService: SessionService
    ) {
        super();
    }

    ngOnInit(): void {
        this.getContestantsList();
        this.getContest();
    }

    getContestantsList(): void {
      this.toastService.showLoading();
      const queryParam: QueryParam = {
            contest_id: 1
        };
      this.categoryService
          .getContestantsList(queryParam)
          .subscribe((response) => {
            if (response.data && response.data) {
              this.users = response.data;
            }
            this.toastService.clearLoading();
          });
    }

    getContest(): void {
       this.categoryService
            .getContest(null)
            .subscribe((response) => {
              if (response.data && response.data) {
                this.contests = response.data;
                if (this.contests.length > 0) {
                  this.contest = this.contests[0];
                  this.end_date = this.contest.end_date + ' 00:00:00';
                  this.isShowTime = true;
                }
              }
            });
    }

    stopTimer() {
      this.isShowTime = false;
    }

    redirect(user: User): void {
      if (!this.isShopTime) {
        const url: string = '/purchase/' + user.id + '/1';
        this.router.navigate([url]);
      }
    }
  }
