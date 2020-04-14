import { Component } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { StartupService } from '../../api/services/startup.service';
import { SessionService } from '../../api/services/session-service';
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent {
  public apiEndPoint: string;
  public settings: any;
  public menu: string;
  public id: number;
  public list: boolean;
  public add: boolean;
  public edit: boolean;
  public view: boolean;
  public reload = false;
  constructor(private activatedRoute: ActivatedRoute,
    public startupService: StartupService,
    private sessionService: SessionService,
    protected router: Router) {
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.setPage();
        }
    });
  }

  setPage() {
    this.apiEndPoint = '/' + this.activatedRoute.snapshot.paramMap.get('api');
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.list = (!(window.location.href.indexOf('/add') > -1) && !(window.location.href.indexOf('/edit') > -1)
    && !(window.location.href.indexOf('/view') > -1));
    this.setMenu();
    this.reload = !this.reload;
    this.add = (window.location.href.indexOf('/add') > -1);
    this.edit = (window.location.href.indexOf('/edit') > -1);
    this.view = (window.location.href.indexOf('/view') > -1);
  }

  setMenu() {
    this.settings = this.startupService.startupData();
    const menus = this.settings.MENU;
    menus.forEach(element => {
      if (element.title === 'Companies' || element.title === 'Contestant') {
        element.api = menus[1].api;
        element.listview = {
          fields: menus[1].listview.fields
        };
        element.add = {
          fields: menus[1].add.fields
        };
        element.edit = {
          fields: menus[1].edit.fields
        };
        element.view = {
          fields: menus[1].view.fields
        };
      } else if (element.title === 'Users') {
        element.listview.fields = [...element.listview.fields, ...menus[1].add.fields];
        element.edit = {
          fields: menus[1].add.fields
        };
        element.view = {
          fields: menus[1].add.fields
        };
      }
    });
    const apiService = '/admin/actions' + this.apiEndPoint;
    const menuItem = menus.find(x => x.route === apiService);
    this.menu = menuItem;
    this.reload = !this.reload;
  }
}
