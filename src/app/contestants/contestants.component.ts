/** @format */
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit, Input} from '@angular/core';
import {ToastService} from '../api/services/toast-service';
import {CategoryService} from '../api/services/category.service';
import {UserList} from '../api/models/user-list';
import {User} from '../api/models/user';
import {QueryParam} from '../api/models/query-param';
import {BaseComponent} from '../base.component';
import {AppConst} from '../utils/app-const';
@Component({
    selector: 'app-contestants',
    templateUrl: './contestants.component.html',
    styleUrls: ['./contestants.component.scss']
})
export class ContestantsComponent extends BaseComponent implements OnInit {
    public userList: UserList;
    public users: User[] = [];
    public isNodata: boolean;
    public categoryId = 1;
    public categoryName = '';
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
        if (this.router.url === AppConst.NON_AUTH_SERVER_URL.CONTESTANTS) {
            this.categoryId = +this.activatedRoute.snapshot.paramMap.get('id');
            if (this.categoryId) {
                this.pageType = 1;
                this.categoryName = this.activatedRoute.snapshot.paramMap.get(
                    'name'
                );
                this.getContestantsByCategories();
            }
        }
    }

    getContestantsByCategories(): void {
        this.toastService.showLoading();
        this.isNodata = true;
        const queryParam: QueryParam = {
            page: 1,
            sortby: 'desc',
            category_id: this.categoryId
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
}
