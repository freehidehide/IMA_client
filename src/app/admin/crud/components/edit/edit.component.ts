import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../../api/services/crud.service';
import { ToastService } from '../../../../api/services/toast-service';
import { SessionService } from '../../../../api/services/session-service';
import { QueryParam } from '../../../../api/models/query-param';
import { AppConst } from '../../../../utils/app-const';
import * as dot from 'dot-object';
import {Location} from '@angular/common';
import { TagsChangedEvent } from 'ngx-tags-input/public-api';
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
      if (value) {
        this.menu = value;
        this.menu.edit.fields.forEach((element, index) => {
          if (element.type === 'tags') {
            this.crudService.get(element.reference, null)
            .subscribe((response) => {
              element.options = response.data;
              this.setTags(element);
            });
            element.value = [];
          } else {
            element.value = '';
          }
        });
        this.getRecords();
      }
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
              } else if (element.type === 'tags') {
                  element.value = this.responseData[element.name];
                  this.setTags(element);
              } else if (element.type === 'file') {
                element.value = (this.responseData['attachment'] && this.responseData['attachment']['filename'])
                ? this.responseData['attachment']['filename'] : '';
              }
            });
            this.toastService.clearLoading();
        });
    }

    onTagsChangedEventHandler(event: TagsChangedEvent, item): void {
      if (event.change === 'add') {
        const index = item.options.findIndex(x => (x.id === event.tag.id));
        item.options.splice(index, 1);
      } else {
        const index = item.value.findIndex(x => (x.id === event.tag.id));
        item.options.push(event.tag);
      }
      item.options.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }

    setTags(item): void {
      item.value.forEach(element => {
        const index = item.options.findIndex(x => (x.id === element.id));
        item.options.splice(index, 1);
      });
      item.options = item.options.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
      item.options.sort((a, b) => (a.name > b.name) ? 1 : -1);
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
            item.isUploaded = true;
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
          if (element.is_required && (Array.isArray(element.value)
          && element.value.length === 0) || (!element.isNotEdit &&
          !Array.isArray(element.value) && element.value.trim() === '')) {
            inValid.push(element.label);
          } else if (element.name === 'email' && reg.test(element.value) === false) {
            inValid.push('Enter the valid email');
          } else {
            if (element.type === 'file') {
              formData[element.name] = (element.file !== '') ? element.file : '';
            } else {
              formData[element.name] = element.value;
            }
          }
        }
      });
      if (inValid.length === 0) {
        this.toastService.showLoading();
        const endPoint = this.menu.api + '/' + this.activatedRoute.snapshot.paramMap.get('id');
        const queryParam: QueryParam = {};
        if (this.menu && this.menu.query) {
          queryParam.class = this.menu.query;
        }
        this.crudService.put(endPoint, dot.object(formData), queryParam)
        .subscribe((response) => {
          if (response.error && response.error.code === AppConst.SERVICE_STATUS.SUCCESS) {
              this.toastService.success(response.error.message);
              this._location.back();
          } else {
              this.toastService.error(response.error.message);
          }
            this.toastService.clearLoading();
        });
      } else {
        this.toastService.error(inValid.toString() + ' is required');
      }
    }

    cancel() {
      this._location.back();
    }

    redirect(url: string): void {
        this.router.navigate([ '/admin/actions/' + this.apiEndPoint + '/' + url]);
    }

}
