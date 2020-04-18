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
         if (formatMenu.title === 'Users') {
            formatMenu.listview.fields = [...formatMenu.listview.fields, ...menus[1].add.fields];
            formatMenu.listview.fields = formatMenu.listview.fields.filter((x) => (x.list === true));
            const addFields = menus[1].add.fields.filter((x) => (x.add === true));
            formatMenu.add.fields = menus[1].add.fields.filter((x) => (x.add === true));
            formatMenu.edit = {
              fields: menus[1].add.fields.filter((x) => (x.edit === true))
            };
            formatMenu.view = {
              fields: menus[1].add.fields.filter((x) => (x.view === true))
            };
          } else if (formatMenu.child_sub_menu) {
              formatMenu.child_sub_menu.forEach(childMenu => {
                this.addChildMenus(formatMenu, childMenu);
              });
          } else {
            this.addParentMenus(formatMenu, menus);
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

  addChildMenus(formatMenu: any, elementData: any) {
    if (elementData.listview) {
      elementData.listview.fields = [...formatMenu.listview.fields, ...elementData.listview.fields];
      elementData.add = {
        fields: elementData.listview.fields
      };
      elementData.edit = {
        fields: elementData.listview.fields
      };
      elementData.view = {
        fields: elementData.listview.fields
      };
    } else if (formatMenu.listview) {
      elementData.listview = {
        fields: formatMenu.listview.fields
      };
      elementData.add = {
        fields: elementData.listview.fields
      };
      elementData.edit = {
        fields: elementData.listview.fields
      };
      elementData.view = {
        fields: elementData.listview.fields
      };
    }
  }

  addParentMenus(formatMenu: any, menus: any) {
    if (formatMenu.title === 'Companies' || formatMenu.title === 'Contestants') {
      formatMenu.api = menus[1].api;
      const listFields = (formatMenu.listview && formatMenu.listview.fields && formatMenu.listview.fields.length > 0 ) ?
      [...formatMenu.listview.fields, ...menus[1].listview.fields] : menus[1].listview.fields;
      formatMenu.listview = {
        fields: listFields
      };
      const addFields = (formatMenu.add && formatMenu.add.fields && formatMenu.add.fields.length > 0 ) ?
      [...formatMenu.add.fields, ...menus[1].add.fields] :
      ((menus[1].add && menus[1].add.fields && menus[1].add.fields.length > 0) ? menus[1].add.fields : []);
      formatMenu.add = {
        fields: addFields,
        url: menus[1].add.url
      };
      const editFields = (formatMenu.edit && formatMenu.edit.fields && formatMenu.edit.fields.length > 0 ) ?
      [...formatMenu.edit.fields, ...menus[1].edit.fields] :
      ((menus[1].edit && menus[1].edit.fields && menus[1].edit.fields.length > 0) ? menus[1].edit.fields : []);
      formatMenu.edit = {
        fields: editFields
      };
      const viewFields = (formatMenu.view && formatMenu.view.fields && formatMenu.view.fields.length > 0 ) ?
      [...formatMenu.view.fields, ...menus[1].view.fields] :
      ((menus[1].view && menus[1].view.fields && menus[1].view.fields.length > 0) ? menus[1].view.fields : []);
      formatMenu.view = {
        fields: viewFields
      };
    } else if (formatMenu.listview && formatMenu.listview.fields && formatMenu.listview.fields.length > 0) {
      const listviewFields = formatMenu.listview.fields;
      if (listviewFields.length > 0) {
        formatMenu.listview.fields = listviewFields.filter((x) => (x.list === true));
        const addField = listviewFields.filter((x) => (x.add === true));
        if (addField.length > 0) {
          formatMenu.add = {
            fields: addField
          };
        }
        const editField = listviewFields.filter((x) => (x.edit === true));
        if (editField.length > 0) {
          formatMenu.edit = {
            fields: editField
          };
        }
        const viewField = listviewFields.filter((x) => (x.view === true));
        if (viewField.length > 0) {
          formatMenu.view = {
            fields: viewField
          };
        }
      }
    }
  }
}
