
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'prefix'},
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    )
            },
            {
                path: 'charts',
                loadChildren: () =>
                    import('./charts/charts.module').then((m) => m.ChartsModule)
            },
            {
                path: 'actions/:table',
                loadChildren: () =>
                    import('./crud/crud.module').then((m) => m.CrudModule)
            },
            {
                path: 'actions/:table/add',
                loadChildren: () =>
                    import('./crud/crud.module').then((m) => m.CrudModule)
            },
            {
                path: 'actions/:table/edit/:id',
                loadChildren: () =>
                    import('./crud/crud.module').then((m) => m.CrudModule)
            },
            {
                path: 'actions/:table/delete/:id',
                loadChildren: () =>
                    import('./crud/crud.module').then((m) => m.CrudModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
