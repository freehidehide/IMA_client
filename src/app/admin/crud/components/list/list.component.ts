import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../../../api/services/crud.service';
import { ToastService } from '../../../../api/services/toast-service';
import { SessionService } from '../../../../api/services/session-service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public tableName: string;
  public apiEndPoint: string;
  public menus: any;
  public menu: any;
  public responseData: any;

  constructor(private crudService: CrudService,
    private toastService: ToastService,
    private sessionService: SessionService,
    public router: Router) { }

  @Input('api')
  set class(value: string) {
      this.apiEndPoint = value;
      this.getRecords();
  }

  ngOnInit(): void {
  }

  getRecords() {
    // this.menus = this.sessionService.getAdminSettingList();
    // if (!this.menus) {
      this.sessionService.getAdminSettingsHandler()
            .subscribe((response) => {
                this.menus = response.menus;
                this.menu = this.menus.find(x => x.api === this.apiEndPoint);
                this.sessionService.setAdminSettingList(this.menus);
            });
  // }
   this.toastService.showLoading();
    this.crudService.get(this.apiEndPoint, null)
    .subscribe((response) => {
        this.responseData = response.data;
        this.toastService.clearLoading();
    });
  }

  redirect(url: string): void {
      this.router.navigate([ '/admin/actions/' + this.apiEndPoint + '/' + url]);
  }

}
