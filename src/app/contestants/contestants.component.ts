import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ToastService } from '../api/services/toast-service';
import { CategoryService } from '../api/services/category.service';
import { CategoriesList } from '../api/models/categories-list';
import { UserList } from '../api/models/user-list';
import { User } from '../api/models/user';
import { QueryParam } from '../api/models/query-param';
import { BaseComponent } from '../base.component';
import { AppConst } from '../utils/app-const';
@Component({
    selector: 'app-contestants',
    templateUrl: './contestants.component.html',
    styleUrls: ['./contestants.component.scss']
})
export class ContestantsComponent extends BaseComponent implements OnInit {
    public categoriesList: CategoriesList;
    public userList: UserList;
    public users: User[] = [];
    public isNodata: boolean;
    public slug = '';
    public pageType: number;

    @Input('type')
    set type(value: number) {
        if (value) {
            this.pageType = value;
        }
    }
    @Input('usersData')
    set usersData(value: User[]) {
        if (value && value.length > 0) {
            this.users = value;
        }
    }
    constructor(
        protected router: Router,
        private categoryService: CategoryService,
        private activatedRoute: ActivatedRoute,
        private toastService: ToastService,
    ) {
        super();
    }

    ngOnInit(): void {
        if (this.router.url.indexOf(AppConst.SERVER_URL.CONTESTANTS) > -1) {
            this.slug = this.activatedRoute.snapshot.paramMap.get('slug');
            if (this.slug) {
                this.pageType = 1;
                this.slug = this.activatedRoute.snapshot.paramMap.get(
                    'slug'
                );
                this.categoryService.getAll(null).subscribe((response) => {
                    this.categoriesList = response;
                    this.categoriesList.data.forEach(category => {
                        if (category.slug === this.slug) {
                            this.getContestantsByCategories(category.id);
                            return;
                        }
                    });
                });
            }
        }
    }

    getContestantsByCategories(catId): void {
        this.toastService.showLoading();
        this.isNodata = true;
        const queryParam: QueryParam = {
            page: 1,
            sortby: 'desc',
            category_id: catId
        };
        this.categoryService
            .getContestantsList(queryParam)
            .subscribe((data) => {
                this.userList = data;
                if (
                    this.userList.error &&
                    this.userList.error.code !== AppConst.SERVICE_STATUS.SUCCESS
                ) {
                    this.toastService.error(this.userList.error.message);
                } else {
                    this.users = this.userList.data;
                    this.isNodata = this.userList.data.length === 0;
                }
                this.toastService.clearLoading();
            });
    }

    trackById(index: number, el: any): number {
        return el.id;
    }

    redirect(user: User): void {
        const url: string = '/profile/' + user.category.category.slug + '/' + user.username;
        this.router.navigate([url]);
    }
}
