
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, Injectable, Inject, OnInit } from '@angular/core';
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
import { CategoriesList } from '../api/models/categories-list';
import { AppConst } from '../utils/app-const';
import { DOCUMENT } from '@angular/common';
@Component({
    selector: 'app-contestantprofile',
    templateUrl: './contestantprofile.component.html',
    styleUrls: ['./contestantprofile.component.scss']
})
export class ContestantprofileComponent extends UserBaseComponent  implements OnInit {
    public userCategoryList: UserCategoryList;
    public userCategories: UserCategory[];
    public categoriesList: CategoriesList;
    public category_id: number;
    public catId: any;
    public location = '';
    public caption = '';
    public imageList: any = [];
    public image: any;
    public video: any;
    public isvideo = false;
    public slug = '';
    public modalReference = null;
    public linkToShare = 'https://www.google.com/';
    constructor(
        protected router: Router,
        protected userService: UserService,
        protected toastService: ToastService,
        private activatedRoute: ActivatedRoute,
        public sessionService: SessionService,
        public categoryService: CategoryService,
        private modalService: NgbModal,
        @Inject(DOCUMENT) private document: Document
    ) {
        super(router, userService, toastService);
    }

    getCategories() {
        this.categoryService
            .getUserCategory(this.sessionService.user.slug, null)
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

    uploadVideo(parentEvent) {
        // https://stackblitz.com/edit/video-thumbnail?file=app%2Fvideo-processing-service.ts
        const formData: FormData = new FormData();
        const videoName: string = parentEvent.target.files[0].name;
        const file: any = parentEvent.target.files[0];
        const video: HTMLVideoElement = this.document.createElement('video');
        const canvas: HTMLCanvasElement = this.document.createElement('canvas');
        const context: CanvasRenderingContext2D = canvas.getContext('2d');
        return new Promise<string>((resolve, reject) => {
            canvas.addEventListener('error',  reject);
            video.addEventListener('error',  reject);
            video.addEventListener('canplay', event => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                formData.append('file[]', parentEvent.target.files[0], videoName);
                const imageName = videoName.split('.');
                formData.append('image[]', this.dataURItoBlob(canvas.toDataURL('image/jpeg')), 'thumb_' + imageName[0] + '.jpg');
                this.imageList = formData;
                resolve(canvas.toDataURL());
            });
            if (file.type) {
                video.setAttribute('type', file.type);
            }
            video.preload = 'auto';
            video.src = window.URL.createObjectURL(file);
            video.load();
        });
    }

    dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        let byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(dataURI.split(',')[1]);
        } else {
            byteString = unescape(dataURI.split(',')[1]);
        }
        // separate out the mime component
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array
        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], {type: mimeString});
    }

    approval() {
        this.toastService.showLoading();
        this.userService.approval()
            .subscribe((response) => {
                if (response.error && response.error.code === AppConst.SERVICE_STATUS.SUCCESS) {
                    this.getUser(null);
                    this.toastService.success(response.error.message);
                } else {
                    this.toastService.error(response.error.message);
                }
                this.toastService.clearLoading();
            });
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
        this.username = this.activatedRoute.snapshot.paramMap.get('username');
        this.slug = this.activatedRoute.snapshot.paramMap.get('slug');
        if (this.activatedRoute.snapshot.paramMap.get('slug')) {
            this.categoryService.getAll(null).subscribe((response) => {
                this.categoriesList = response;
                this.categoriesList.data.forEach(category => {
                    if (category.slug === this.activatedRoute.snapshot.paramMap.get('slug')) {
                        this.categoryId = category.id;
                        this.getUser(null);
                        return;
                    }
                });
            });
        } else if (this.username) {
            this.getUser(null);
        } else {
            this.router.navigate(['/']);
        }
    }

    openFb() {
        window.open('https://www.facebook.com/sharer/sharer.php?u=http://app.itstheimas.com/vote/' + this.slug, 'pop'
        , 'width=600, height=400, scrollbars=no');
    }

    openTwitter() {
        window.open('https://twitter.com/intent/tweet?url=http://app.itstheimas.com/vote/' + this.slug + '&via=' + this.slug, 'pop',
        'width=600, height=400, scrollbars=no');
    }

    redirect(user: User): void {
        const url: string = '/vote/' + user.username;
        this.router.navigateByUrl(url, { state: { category_id: this.categoryId } });
    }

    viewMore(data: any) {
        data.viewmore = true;
    }
}
