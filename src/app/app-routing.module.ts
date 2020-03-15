import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

// { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard] },
const routes: Routes = [
    { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
    { path: 'contestants', loadChildren: () => import('./contestants/contestants.module').then(m => m.ContestantsModule) },
    { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
    { path: 'advertisers', loadChildren: () => import('./advertisers/advertisers.module').then(m => m.AdvertisersModule) },
    { path: 'profile', loadChildren: () => import('./contestantprofile/contestantprofile.module').then(m => m.ContestantprofileModule) },
    { path: 'purchase', loadChildren: () => import('./purchasevote/purchasevote.module').then(m => m.PurchasevoteModule) },
    { path: 'imalisting', loadChildren: () => import('./imalisting/imalisting.module').then(m => m.ImalistingModule) },
    { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
    { path: 'edit', loadChildren: () => import('./editprofile/editprofile.module').then(m => m.EditprofileModule) },
    { path: 'error', loadChildren: () => import('./server-error/server-error.module').then(m => m.ServerErrorModule) },
    { path: 'access-denied', loadChildren: () => import('./access-denied/access-denied.module').then(m => m.AccessDeniedModule) },
    { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
