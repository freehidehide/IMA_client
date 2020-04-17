import { element } from 'protractor';
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
    if (!menus[1].isFormat) {
        menus.forEach(formatMenu => {
          if (formatMenu.title === 'Companies' || formatMenu.title === 'Contestant') {
              formatMenu.api = menus[1].api;
              if (formatMenu.title === 'Contestant') {
                const menusList = [...formatMenu.listview.fields, ...menus[1].add.fields];
                formatMenu.listview = menusList;
              } else {
                formatMenu.listview = menus[1].listview;
              }
            formatMenu.add = menus[1].add.fields;
            formatMenu.edit = menus[1].edit.fields;
            formatMenu.view = menus[1].view.fields;
          } else if (formatMenu.title === 'Users') {
            formatMenu.listview.fields = [...formatMenu.listview.fields, ...menus[1].add.fields];
            formatMenu.listview.fields = formatMenu.listview.fields.filter((x) => (x.list === true));
            formatMenu.edit = menus[1].add.fields.filter((x) => (x.edit === true));
            formatMenu.view = menus[1].add.fields.filter((x) => (x.view === true));
          } else if (formatMenu.child_sub_menu) {
              formatMenu.child_sub_menu.forEach(childMenu => {
                if (childMenu.listview) {
                  childMenu.listview.fields = [...formatMenu.listview.fields, ...childMenu.listview.fields];
                  childMenu.add = {
                    fields: childMenu.listview.fields
                  };
                  childMenu.edit = {
                    fields: childMenu.listview.fields
                  };
                  childMenu.view = {
                    fields: childMenu.listview.fields
                  };
                } else if (formatMenu.listview) {
                  childMenu.listview = {
                    fields: formatMenu.listview.fields
                  };
                  childMenu.add = {
                    fields: childMenu.listview.fields
                  };
                  childMenu.edit = {
                    fields: childMenu.listview.fields
                  };
                  childMenu.view = {
                    fields: childMenu.listview.fields
                  };
                }
              });
          }
      });
      menus[1].isFormat = true;
      this.settings.MENU = menus;
      this.startupService.setStartupData(this.settings);
    }
    const apiService = '/admin/actions' + this.apiEndPoint;
    menus.forEach(menuItem => {
      if (menuItem.route === apiService) {
        this.menu = menuItem;
      }
      if (menuItem.child_sub_menu) {
        menuItem.child_sub_menu.forEach(childMenuItem => {
          if (childMenuItem.route === apiService) {
            this.menu = childMenuItem;
          }
        });
      }
    });
    this.reload = !this.reload;
  }
}
