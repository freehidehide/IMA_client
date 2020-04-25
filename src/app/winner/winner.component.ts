import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../api/services/category.service';
import { ToastService } from '../api/services/toast-service';
import { User } from '../api/models/user';
import { QueryParam } from '../api/models/query-param';
import { AppConst } from '../utils/app-const';
import { BaseComponent } from '../base.component';

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
            this.toastService.clearLoading();
          });
  }

  redirect(user: User): void {
      const url: string = '/profile/' + user.slug;
      this.router.navigate([url]);
  }
}
