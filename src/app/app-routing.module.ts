import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule)
    },
    {
        path: 'admin',
        loadChildren: () =>
            import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AuthGuard]
    },
    /*{
        path: 'admin/:table',
        loadChildren: () =>
            import('./admin/crud/crud.module').then((m) => m.CrudModule)
    },
    {
        path: 'admin/:table/add',
        loadChildren: () =>
            import('./admin/crud/crud.module').then((m) => m.CrudModule)
    },
    {
        path: 'admin/:table/edit/:id',
        loadChildren: () =>
            import('./admin/crud/crud.module').then((m) => m.CrudModule)
    },
    {
        path: 'admin/:table/delete/:id',
        loadChildren: () =>
            import('./admin/crud/crud.module').then((m) => m.CrudModule)
    },*/
    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule)
    },
    {
        path: 'login',
        loadChildren: () =>
            import('./login/login.module').then((m) => m.LoginModule)
    },
    {
        path: 'signup',
        loadChildren: () =>
            import('./signup/signup.module').then((m) => m.SignupModule)
    },
    {
        path: 'contestants/:id/:name',
        loadChildren: () =>
            import('./contestants/contestants.module').then(
                (m) => m.ContestantsModule
            )
    },
    {
        path: 'shop',
        loadChildren: () =>
            import('./shop/shop.module').then((m) => m.ShopModule)
    },
    {
        path: 'advertisers',
        loadChildren: () =>
            import('./advertisers/advertisers.module').then(
                (m) => m.AdvertisersModule
            )
    },
    {
        path: 'profile/:id/:categoryId',
        loadChildren: () =>
            import('./contestantprofile/contestantprofile.module').then(
                (m) => m.ContestantprofileModule
            )
    },
    {
        path: 'profile/:id',
        loadChildren: () =>
            import('./contestantprofile/contestantprofile.module').then(
                (m) => m.ContestantprofileModule
            )
    },
    {
        path: 'purchase/:id/:categoryId',
        loadChildren: () =>
            import('./purchasevote/purchasevote.module').then(
                (m) => m.PurchasevoteModule
            )
    },
    {
        path: 'imalisting',
        loadChildren: () =>
            import('./imalisting/imalisting.module').then(
                (m) => m.ImalistingModule
            )
    },
    {
        path: 'categories',
        loadChildren: () =>
            import('./categories/categories.module').then(
                (m) => m.CategoriesModule
            )
    },
    {
        path: 'forgot-password',
        loadChildren: () =>
            import('./forgotpassword/forgotpassword.module').then(
                (m) => m.ForgotpasswordModule
            )
    },
    {
        path: 'transaction',
        loadChildren: () =>
            import('./transaction/transaction.module').then(
                (m) => m.TransactionModule
            )
    },
    {
        path: 'resend-link',
        loadChildren: () =>
            import('./resendlink/resendlink.module').then(
                (m) => m.ResendlinkModule
            )
    },
    {
        path: 'reset-password',
        loadChildren: () =>
            import('./resetpassword/resetpassword.module').then(
                (m) => m.ResetpasswordModule
            )
    },
    {
        path: 'change-password',
        loadChildren: () =>
            import('./passwordchanged/passwordchanged.module').then(
                (m) => m.PasswordchangedModule
            )
    },
    {
        path: 'view-profile',
        loadChildren: () =>
            import('./viewprofile/viewprofile.module').then(
                (m) => m.ViewprofileModule
            )
    },
    {
        path: 'donate',
        loadChildren: () =>
            import('./donate/donate.module').then((m) => m.DonateModule)
    },
    {
        path: 'edit',
        loadChildren: () =>
            import('./editprofile/editprofile.module').then(
                (m) => m.EditprofileModule
            )
    },
    {
        path: 'cart',
        loadChildren: () =>
            import('./cart/cart.module').then((m) => m.CartModule)
    },
    {
        path: 'checkout/:type',
        loadChildren: () =>
            import('./checkout/checkout.module').then((m) => m.CheckoutModule)
    },
    {
        path: 'instant-vote',
        loadChildren: () =>
            import('./instantvote/instantvote.module').then(
                (m) => m.InstantvoteModule
            )
    },
    {
        path: 'winner',
        loadChildren: () =>
            import('./winner/winner.module').then(
                (m) => m.WinnerModule
            )
    },
    {
        path: 'recent_winner',
        loadChildren: () =>
            import('./recent-winner/recent-winner.module').then(
                (m) => m.RecentWinnerModule
            )
    },
    {
        path: 'error',
        loadChildren: () =>
            import('./server-error/server-error.module').then(
                (m) => m.ServerErrorModule
            )
    },
    {
        path: 'access-denied',
        loadChildren: () =>
            import('./access-denied/access-denied.module').then(
                (m) => m.AccessDeniedModule
            )
    },
    {
        path: 'not-found',
        loadChildren: () =>
            import('./not-found/not-found.module').then((m) => m.NotFoundModule)
    },
    {path: '**', redirectTo: 'not-found'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
