
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from '../crud/components/list/list.component';
import { AddComponent } from '../crud/components/add/add.component';
import { EditComponent } from '../crud/components/edit/edit.component';
import { ViewComponent } from '../crud/components/view/view.component';
import { CrudService } from '../../api/services/crud.service';
import { TargetEntityToNamePipe } from './target-entity-to-name.pipe';
import { NgxTextEditorModule } from 'ngx-text-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedCommonModule } from '../../shared-common/shared-common.module';

@NgModule({
    declarations: [
        ListComponent,
        AddComponent,
        EditComponent,
        ViewComponent,
        TargetEntityToNamePipe
    ],
    imports: [
        CommonModule,
        NgbDropdownModule,
        NgxTextEditorModule,
        NgbModule,
        FormsModule,
        SharedCommonModule
    ],
    exports: [
        ListComponent,
        AddComponent,
        EditComponent,
        ViewComponent,
        TargetEntityToNamePipe,
        NgxTextEditorModule,
        NgbModule
    ],
    providers: [
        CrudService
    ]
})
export class SharedCommonCrudModule {}
