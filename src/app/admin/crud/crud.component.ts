import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent {
  public api: string;
  public id: number;
  public list: boolean;
  public add: boolean;
  public edit: boolean;
  constructor(private activatedRoute: ActivatedRoute,
    protected router: Router) {
      this.setPage();
  }

  setPage() {
    this.api = '/' + this.activatedRoute.snapshot.paramMap.get('api');
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.list = false;
    this.add = false;
    this.edit = false;
    if (!(window.location.href.indexOf('/add') > -1) || !(window.location.href.indexOf('/edit') > -1)) {
      this.list = true;
    }
    if (window.location.href.indexOf('/add') > -1) {
      this.list = false;
      this.edit = false;
      this.add = true;
    }
    if (window.location.href.indexOf('/edit') > -1) {
      this.edit = true;
      this.list = false;
      this.add = false;
    }
  }
}
