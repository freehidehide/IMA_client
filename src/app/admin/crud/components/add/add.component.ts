import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../../../api/services/crud.service';
import { ToastService } from '../../../../api/services/toast-service';
import { SessionService } from '../../../../api/services/session-service';
import { StartupService } from '../../../../api/services/startup.service';
import { AppConst } from '../../../../utils/app-const';
import { QueryParam } from '../../../../api/models/query-param';
import * as dot from 'dot-object';
import {Location} from '@angular/common';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public apiEndPoint: string;
  public menu: any;
  public responseData: any;
  public settings: any;

  constructor(private crudService: CrudService,
    private toastService: ToastService,
    private sessionService: SessionService,
    public startupService: StartupService,
    private _location: Location,
    public router: Router) { }

  @Input('menu_detail')
  set meunuItem(value: string) {
      this.menu = value;
  }

  @Input('reload')
  set reloadPage(value: string) {
  }

  ngOnInit(): void {
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
    this.menu.add.fields.forEach((element, index) => {
      if (element.is_required && element.value.trim() === '') {
        inValid.push(element.label);
      } else if (element.name === 'email' && reg.test(element.value) === false) {
        inValid.push('Enter the valid email');
      } else {
        formData[element.name] = (element.type === 'file') ? element. file : element.value;
      }
    });
    if (inValid.length === 0) {
      this.toastService.showLoading();
      this.crudService.post(this.menu.add.url, dot.object(formData), null)
      .subscribe((response) => {
        if (response.error && response.error.code === AppConst.SERVICE_STATUS.SUCCESS) {
            this.toastService.success(response.error.message);
            // this.router.navigate([this.menu.route]);
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

}
