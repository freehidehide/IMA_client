/** @format */
import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {ToastService} from '../api/services/toast-service';
import {CategoryService} from '../api/services/category.service';
import {UserList} from '../api/models/user-list';
import {QueryParam} from '../api/models/query-param';
import {AppConst} from '../utils/app-const';
import {BaseComponent} from '../base.component';
@Component({
    selector: 'app-contestants',
    templateUrl: './contestants.component.html',
    styleUrls: ['./contestants.component.scss']
})
export class ContestantsComponent extends BaseComponent implements OnInit {
    public userList: UserList;
    public isNodata: boolean;
    public categoryId: number = 1;
    public categoryName: string = '';
    constructor(
        private categoryService: CategoryService,
        private toastService: ToastService,
        private activatedRoute: ActivatedRoute
    ) {
        super();
    }

    ngOnInit(): void {
        this.categoryId = +this.activatedRoute.snapshot.paramMap.get('id');
        if (this.categoryId) {
            this.categoryName = this.activatedRoute.snapshot.paramMap.get(
                'name'
            );
            this.getContestantsByCategories();
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
                    this.isNodata = this.userList.data.length === 0;
                }
                this.toastService.clearLoading();
            });
    }

    trackById(index: number, el: any): number {
        return el.id;
    }
}
