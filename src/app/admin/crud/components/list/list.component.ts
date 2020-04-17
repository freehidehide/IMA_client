import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../../../api/services/crud.service';
import { ToastService } from '../../../../api/services/toast-service';
import { SessionService } from '../../../../api/services/session-service';
import { QueryParam } from '../../../../api/models/query-param';
import * as dot from 'dot-object';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public menu: any;
  public responseData: any;
  public settings: any;

  constructor(private crudService: CrudService,
    private toastService: ToastService,
    public sessionService: SessionService,
    public router: Router) { }

  @Input('menu_detail')
  set meunuItem(value: any) {
    if (value) {
      this.menu = value.listview.fields.filter((x) => (x.list === true));
      if (this.menu && this.menu.api) {
        this.getRecords();
      }
    }
  }

  @Input('reload')
  set reloadPage(value: string) {
    if (this.menu && this.menu.api) {
      this.getRecords();
    }
  }

  ngOnInit(): void {

  }

  getRecords() {
    this.toastService.showLoading();
      const queryParam: QueryParam = {};
      if (this.menu && this.menu.query) {
        queryParam.class = this.menu.query;
      }
      this.crudService.get(this.menu.api, queryParam)
      .subscribe((responseApi) => {
          this.responseData = responseApi.data;
          this.toastService.clearLoading();
      });
  }

  getValue(name: any, obj: any) {
    return (name && name !== 'actions') ? dot.pick(name, obj) : '';
  }

  redirect(url: string): void {
    this.router.navigate([ this.menu.route + '/' + url ]);
  }

  approve(url: string): void {
    this.router.navigate([ this.menu.route + '/' + url ]);
  }

  disapprove(url: string): void {
    this.router.navigate([ this.menu.route + '/' + url ]);
  }

  action(url: string, element: any): void {
    this.router.navigate([ '/admin/actions' + url + '/' + element['id']]);
  }

  alertWarning() {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        }
      });
}

}
