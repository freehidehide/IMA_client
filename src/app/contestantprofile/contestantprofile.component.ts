
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef, OnDestroy, AfterViewInit  } from '@angular/core';
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
/* import * as adapter from 'webrtc-adapter/out/adapter_no_global';
import * as RecordRTC from 'recordrtc';
import * as Record from 'videojs-record/dist/videojs.record';
import videojs from 'video.js';*/
@Component({
    selector: 'app-contestantprofile',
    templateUrl: './contestantprofile.component.html',
    styleUrls: ['./contestantprofile.component.scss']
})
export class ContestantprofileComponent extends UserBaseComponent
    implements OnInit, OnDestroy, AfterViewInit {
    // reference to the element itself: used to access events and methods
    // https://github.com/collab-project/videojs-record/wiki/Angular
    // https://www.npmjs.com/package/videojs-record
    // https://collab-project.github.io/videojs-record/examples/audio-video.html
    private _elementRef: ElementRef;

    // index to create unique ID for component
    idx = 'clip1';
    public userCategoryList: UserCategoryList;
    public userCategories: UserCategory[];
    public category_id: number;
    private config: any;
    private player: any;
    private plugin: any;
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
        this.player = false;

        // save reference to plugin (so it initializes)
        // this.plugin = Record;

        // video.js configuration
        this.config = {
        controls: true,
        autoplay: false,
        fluid: false,
        loop: false,
        width: 320,
        height: 240,
        controlBar: {
            volumePanel: false
        },
        plugins: {
            /*
            // wavesurfer section is only needed when recording audio-only
            wavesurfer: {
                src: 'live',
                waveColor: '#36393b',
                progressColor: 'black',
                debug: true,
                cursorWidth: 1,
                msDisplayMax: 20,
                hideScrollbar: true
            },
            */
            // configure videojs-record plugin
            record: {
            audio: false,
            video: true,
            debug: true
            }
        }
        };
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

    ngAfterViewInit() {
        // ID with which to access the template's video element
        const el = 'video_' + this.idx;

        // setup the player via the unique element ID
        /* this.player = videojs(document.getElementById(el), this.config, () => {
          console.log('player ready! id:', el);

          // print version information at startup
          const msg = 'Using video.js ' + videojs.VERSION +
            ' with videojs-record ' + videojs.getPluginVersion('record') +
            ' and recordrtc ' + RecordRTC.version;
          videojs.log(msg);
        });

        // device is ready
        this.player.on('deviceReady', () => {
          console.log('device is ready!');
        });

        // user clicked the record button and started recording
        this.player.on('startRecord', () => {
          console.log('started recording!');
        });

        // user completed recording and stream is available
        this.player.on('finishRecord', () => {
          // recordedData is a blob object containing the recorded data that
          // can be downloaded by the user, stored on server etc.
          console.log('finished recording: ', this.player.recordedData);
        });

        // error handling
        this.player.on('error', (element, error) => {
          console.warn(error);
        });

        this.player.on('deviceError', () => {
          console.error('device error:', this.player.deviceErrorCode);
        });*/
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

    ngOnDestroy() {
        if (this.player) {
            this.player.dispose();
            this.player = false;
        }
    }
}
