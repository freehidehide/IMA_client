
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from '../crud/components/list/list.component';
import { AddComponent } from '../crud/components/add/add.component';
import { EditComponent } from '../crud/components/edit/edit.component';
import { CrudService } from '../../api/services/crud.service';
@NgModule({
    declarations: [
        ListComponent,
        AddComponent,
        EditComponent
    ],
    imports: [
        CommonModule,
        NgbDropdownModule
    ],
    exports: [
        ListComponent,
        AddComponent,
        EditComponent
    ],
    providers: [
        CrudService
    ]
})
export class SharedCommonCrudModule {}
