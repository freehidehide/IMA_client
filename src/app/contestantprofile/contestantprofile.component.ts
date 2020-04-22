
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef } from '@angular/core';
import { ToastService } from '../api/services/toast-service';
import { UserService } from '../api/services/user.service';
import { SessionService } from '../api/services/session-service';
import { UserBaseComponent } from '../user.base.component';
import { QueryParam } from '../api/models/query-param';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../api/models/user';
import { CategoryService } from '../api/services/category.service';
import { UserCategoryList } from '../api/models/user-category-list';
import { UserCategory } from '../api/models/user-category';
import { AppConst } from '../utils/app-const';
@Component({
    selector: 'app-contestantprofile',
    templateUrl: './contestantprofile.component.html',
    styleUrls: ['./contestantprofile.component.scss']
})
export class ContestantprofileComponent extends UserBaseComponent{
    public userCategoryList: UserCategoryList;
    public userCategories: UserCategory[];
    public category_id: number;
    public catId: any;
    public location = '';
    public caption = '';
    public imageList: any = [];
    public image: any;
    public video: any;
    public isvideo = false;
    public modalReference = null;
    constructor(
        protected router: Router,
        protected userService: UserService,
        protected toastService: ToastService,
        private activatedRoute: ActivatedRoute,
        public sessionService: SessionService,
        public categoryService: CategoryService,
        private modalService: NgbModal
    ) {
        super(router, userService, toastService);
    }

    getCategories() {
        this.categoryService
            .getUserCategory(+this.sessionService.user.id, null)
            .subscribe((response) => {
                this.userCategoryList = response;
                this.userCategories = this.userCategoryList.data;
                if (this.categoryId !== 0) {
                    this.catId = this.categoryId;
                } else {
                    this.catId = this.userCategories[0].category.id;
                }
            });
    }

    open(content) {
        this.getCategories();
        this.modalReference = this.modalService.open(content);
        this.modalReference.result.then((result) => {
        }, (reason) => {
        });
    }

    uploadImage(event) {
        const formData: any = new FormData();
        if (event.target.files.length > 0) {
            Array.from(event.target.files).forEach((element: any) => {
                formData.append('file[]', element, element.name);
            });
            this.imageList = formData;
        } else {
            this.imageList = '';
        }
    }

    uploadVideo(event) {
        /*const file: any = event.target.files[0];
        const fileReader: any = new FileReader();
        fileReader.onload = function() {
            const blob: any = new File([fileReader.result], {type: file.type});
            const url: any = URL.createObjectURL(blob);
            const video: any = document.createElement('video');
            const timeupdate = function() {
              if (snapImage()) {
                video.removeEventListener('timeupdate', timeupdate);
                video.pause();
              }
            };
            video.addEventListener('loadeddata', function() {
              if (snapImage()) {
                video.removeEventListener('timeupdate', timeupdate);
              }
            });
            const snapImage = function() {
                const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                    const image = canvas.toDataURL();
                    const success = image.length > 100000;
                    if (success) {
                        console.log('image--------', image);
                    }
                    URL.revokeObjectURL(url);
              return success;
            };
            video.addEventListener('timeupdate', timeupdate);
            video.preload = 'metadata';
            video.src = url;
            // Load video in Safari / IE11
            video.muted = true;
            video.playsInline = true;
            video.play();

          };
        const formData: any = new FormData();
        if (event.target.files.length > 0) {
            formData.append('file', event.target.files[0], event.target.files[0].name);

        } else {
            this.imageList = '';
        }*/
    }

    profileUpload() {
        if (this.location.trim() !== '' &&  this.caption.trim() !== '') {
            this.toastService.showLoading();
            const queryParam: QueryParam = {
                class: 'UserProfile',
                category_id: this.catId,
                location: this.location,
                caption: this.caption
            };
            this.userService.postFile(this.imageList, queryParam)
            .subscribe((response) => {
                if (response.error && response.error.code === AppConst.SERVICE_STATUS.SUCCESS) {
                    this.catId = null;
                    this.location = '';
                    this.caption = '';
                    this.imageList = [];
                    this.image = '';
                    this.getUser(null);
                    this.modalReference.close();
                    this.toastService.success(response.error.message);
                } else {
                    this.toastService.error(response.error.message);
                }
                this.toastService.clearLoading();
            });
        } else if (this.location.trim() === '') {
            this.toastService.error('Please enter location');
        } else if (this.caption.trim() === '') {
            this.toastService.error('Please enter caption');
        } else if (!this.isvideo && this.imageList.length === 0) {
            this.toastService.error('Please upload images');
        }
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

    redirect(user: User): void {
        const url: string = '/purchase/vote/' + user.id + '/' + this.categoryId;
        this.router.navigate([url]);
    }

    viewMore(data: any) {
        data.viewmore = true;
    }
}
