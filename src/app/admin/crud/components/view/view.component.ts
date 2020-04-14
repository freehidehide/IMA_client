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
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

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

    back() {
      this._location.back();
    }

}
