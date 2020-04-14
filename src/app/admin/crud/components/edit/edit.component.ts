import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../../api/services/crud.service';
import { ToastService } from '../../../../api/services/toast-service';
import { SessionService } from '../../../../api/services/session-service';
import { QueryParam } from '../../../../api/models/query-param';
import { AppConst } from '../../../../utils/app-const';
import * as dot from 'dot-object';
import {Location} from '@angular/common';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public apiEndPoint: string;
  public menu: any;
  public responseData: any;
  public settings: any;

  constructor(private activatedRoute: ActivatedRoute,
    private crudService: CrudService,
    private toastService: ToastService,
    private sessionService: SessionService,
    private _location: Location,
    public router: Router) { }

    @Input('menu_detail')
    set meunuItem(value: string) {
        this.menu = value;
    }

    @Input('reload')
    set reloadPage(value: string) {
        this.getRecords();
    }

    ngOnInit(): void {
    }

    getRecords() {
      const endPoint = this.menu.api + '/' + this.activatedRoute.snapshot.paramMap.get('id');
      this.toastService.showLoading();
        this.crudService.get(endPoint, null)
        .subscribe((response) => {
            this.responseData = response.data;
            const formatObj = {};
            dot.dot(this.responseData, formatObj);
            this.menu.edit.fields.forEach(element => {
              if (formatObj[element.name]) {
                element.value = formatObj[element.name];
              }
            });
            this.toastService.clearLoading();
        });
    }

    uploadImage(event, item) {
      this.toastService.showLoading();
      const formData: any = new FormData();
      formData.append('file', event.target.files[0], event.target.files[0].name);
        const queryParam: QueryParam = {
          class: 'UserAvatar'
        };
      this.crudService.postFile('/attachments', formData, queryParam)
      .subscribe((response) => {
        if (response.error && response.error.code === AppConst.SERVICE_STATUS.SUCCESS) {
            item.file = response.attachment;
        } else {
            this.toastService.error(response.error.message);
        }
          this.toastService.clearLoading();
      });
    }

    submit() {
      const inValid = [];
      const formData = {};
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      this.menu.edit.fields.forEach((element, index) => {
        if (element.name !== 'username') {
          if (element.is_required && element.value.trim() === '') {
            inValid.push(element.label);
          } else if (element.name === 'email' && reg.test(element.value) === false) {
            inValid.push('Enter the valid email');
          }
        }
      });
      if (inValid.length === 0) {
        this.toastService.showLoading();
        const endPoint = this.menu.api + '/' + this.activatedRoute.snapshot.paramMap.get('id');
        this.crudService.put(endPoint, dot.object(formData), null)
        .subscribe((response) => {
          if (response.error && response.error.code === AppConst.SERVICE_STATUS.SUCCESS) {
              this.toastService.success(response.error.message);
              this._location.back();
              // this.router.navigate([this.menu.route]);
          } else {
              this.toastService.error(response.error.message);
          }
            this.toastService.clearLoading();
        });
      } else {
        this.toastService.error(inValid.toString() + ' is required');
      }
    }

  redirect(url: string): void {
      this.router.navigate([ '/admin/actions/' + this.apiEndPoint + '/' + url]);
  }

}
