import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../api/services/category.service';
import { ToastService } from '../api/services/toast-service';
import { User } from '../api/models/user';
import { QueryParam } from '../api/models/query-param';
import { AppConst } from '../utils/app-const';
import { BaseComponent } from '../base.component';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent extends BaseComponent implements OnInit {
  public usersTop: User[] = [];
  public users: User[] = [];
  public isNodata: boolean;
  public categoryId = 1;
  public categoryName = '';
  public pageType: number;
  public pageTitle: string;
  public left_time: number;
  public isShowTime = false;
  public prettyConfig: CountdownConfig;
  constructor(
      private router: Router,
      private categoryService: CategoryService,
      private activatedRoute: ActivatedRoute,
      private toastService: ToastService,
  ) {
      super();
  }

  ngOnInit(): void {
    this.pageType = 2;
    this.getWinnerList();
  }

  getWinnerList(): void {
      this.toastService.showLoading();
      this.categoryService
          .getWinnerList(null)
          .subscribe((response) => {
            if (response.data.highest_votes && response.data.highest_votes.data) {
              this.usersTop = response.data.highest_votes.data;
              this.pageTitle = response.data.highest_votes.title;
            }
            if (response.data.category_highest_votes) {
              this.users = response.data.category_highest_votes;
            }
            this.left_time = response.data.left_time;
            this.prettyConfig = {
              leftTime: response.data.left_time,
              format: 'HH:mm:ss',
              prettyText: (text) => {
                return text
                  .split(':')
                  .map((v, index) => {
                    if (index === 0) {
                      return '<div class="hours timings text-center"><span class="count">' + v + '</span><span class="timetext text-uppercase">Hours</span></div>';
                    } else if (index === 1) {
                      return '<div class="minutes timings text-center"><span class="count">' + v + '</span><span class="timetext text-uppercase">Minutes</span></div>';
                    } else {
                      return '<div class="seconds timings text-center"><span class="count">' + v + '</span><span class="timetext text-uppercase">Seconds</span></div>';
                    }
                  })
                  .join('<div class="timecolan">:</div>');
              },
            };
            this.isShowTime = true;
            this.toastService.clearLoading();
          });
  }

  redirect(user: User): void {
      const url: string = '/profile/' + user.slug;
      this.router.navigate([url]);
  }
}
