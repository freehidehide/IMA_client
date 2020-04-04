import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../api/services/category.service';
import {ToastService} from '../api/services/toast-service';
import {User} from '../api/models/user';
import {QueryParam} from '../api/models/query-param';
import {AppConst} from '../utils/app-const';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent extends BaseComponent implements OnInit {
  public users: User[] = [];
  public isNodata: boolean;
  public categoryId = 1;
  public categoryName = '';
  public pageType: number;
  constructor(
      private router: Router,
      private categoryService: CategoryService,
      private activatedRoute: ActivatedRoute,
      private toastService: ToastService,
  ) {
      super();
  }

  ngOnInit(): void {
    if (this.router.url === AppConst.NON_AUTH_SERVER_URL.HIGHEST_VOTES) {
      this.pageType = 2;
      this.getWinnerList();
    } else {
      this.pageType = 3;
      this.getRecentWinnerList();
    }
  }

  getWinnerList(): void {
      this.toastService.showLoading();
      this.categoryService
          .getWinnerList(null)
          .subscribe((response) => {
              this.users = response.data.category_highest_votes;
              this.toastService.clearLoading();
          });
  }

  getRecentWinnerList(): void {
    this.toastService.showLoading();
    this.categoryService
        .getRecentWinnerList(null)
        .subscribe((response) => {
          this.users = response.data.category_highest_votes;
          this.toastService.clearLoading();
        });
}
}
