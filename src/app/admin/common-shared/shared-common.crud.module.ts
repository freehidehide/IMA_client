
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from '../crud/components/list/list.component';
import { AddComponent } from '../crud/components/add/add.component';
import { EditComponent } from '../crud/components/edit/edit.component';
import { CrudService } from '../../api/services/crud.service';
import { TargetEntityToNamePipe } from './target-entity-to-name.pipe';
import { NgxTextEditorModule } from 'ngx-text-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [
        ListComponent,
        AddComponent,
        EditComponent,
        TargetEntityToNamePipe
    ],
    imports: [
        CommonModule,
        NgbDropdownModule,
        NgxTextEditorModule,
        NgbModule
    ],
    exports: [
        ListComponent,
        AddComponent,
        EditComponent,
        TargetEntityToNamePipe,
        NgxTextEditorModule,
        NgbModule
    ],
    providers: [
        CrudService
    ]
})
export class SharedCommonCrudModule {}
