import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../api/services/category.service';
import { ToastService } from '../api/services/toast-service';
import { User } from '../api/models/user';
import { QueryParam } from '../api/models/query-param';
import { AppConst } from '../utils/app-const';
import { BaseComponent } from '../base.component';
import { SessionService } from '../api/services/session-service';
@Component({
  selector: 'app-recent-winner',
  templateUrl: './recent-winner.component.html',
  styleUrls: ['./recent-winner.component.scss']
})
export class RecentWinnerComponent extends BaseComponent implements OnInit {
  public users: User[] = [];
  public isNodata: boolean;
  public categoryId = 1;
  public categoryName = '';
  public pageType: number;
  public pageTitle: string;
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
      this.getRecentWinnerList();
  }

  getRecentWinnerList(): void {
    this.toastService.showLoading();
    this.categoryService
        .getRecentWinnerList(null)
        .subscribe((response) => {
          if (response.data && response.data) {
            this.users = response.data;
          }
          this.toastService.clearLoading();
        });
  }

  redirect(user: User): void {
      const url: string = '/profile/' + user.id;
      this.router.navigate([url]);
  }
}
