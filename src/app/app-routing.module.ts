import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./shared";

const routes: Routes = [
    {
        path: "",
        loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
    },
    {
        path: "admin",
        loadChildren: () =>
            import("./layout/layout.module").then(m => m.LayoutModule),
        canActivate: [AuthGuard]
    },
    {
        path: "home",
        loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
    },
    {
        path: "login",
        loadChildren: () =>
            import("./login/login.module").then(m => m.LoginModule)
    },
    {
        path: "signup",
        loadChildren: () =>
            import("./signup/signup.module").then(m => m.SignupModule)
    },
    {
        path: "contestants",
        loadChildren: () =>
            import("./contestants/contestants.module").then(
                m => m.ContestantsModule
            )
    },
    {
        path: "shop",
        loadChildren: () => import("./shop/shop.module").then(m => m.ShopModule)
    },
    {
        path: "advertisers",
        loadChildren: () =>
            import("./advertisers/advertisers.module").then(
                m => m.AdvertisersModule
            )
    },
    {
        path: "profile",
        loadChildren: () =>
            import("./contestantprofile/contestantprofile.module").then(
                m => m.ContestantprofileModule
            )
    },
    {
        path: "purchase",
        loadChildren: () =>
            import("./purchasevote/purchasevote.module").then(
                m => m.PurchasevoteModule
            )
    },
    {
        path: "imalisting",
        loadChildren: () =>
            import("./imalisting/imalisting.module").then(
                m => m.ImalistingModule
            )
    },
    {
        path: "categories",
        loadChildren: () =>
            import("./categories/categories.module").then(
                m => m.CategoriesModule
            )
    },
    {
        path: "forgot-password",
        loadChildren: () =>
            import("./forgotpassword/forgotpassword.module").then(
                m => m.ForgotpasswordModule
            )
    },
    {
        path: "resend-link",
        loadChildren: () =>
            import("./resendlink/resendlink.module").then(
                m => m.ResendlinkModule
            )
    },
    {
        path: "reset-password",
        loadChildren: () =>
            import("./resetpassword/resetpassword.module").then(
                m => m.ResetpasswordModule
            )
    },
    {
        path: "password-changed",
        loadChildren: () =>
            import("./passwordchanged/passwordchanged.module").then(
                m => m.PasswordchangedModule
            )
    },
    {
        path: "view-profile",
        loadChildren: () =>
            import("./viewprofile/viewprofile.module").then(
                m => m.ViewprofileModule
            )
    },
    {
        path: "donate",
        loadChildren: () =>
            import("./donate/donate.module").then(m => m.DonateModule)
    },
    {
        path: "edit",
        loadChildren: () =>
            import("./editprofile/editprofile.module").then(
                m => m.EditprofileModule
            )
    },
    {
        path: "cart",
        loadChildren: () => import("./cart/cart.module").then(m => m.CartModule)
    },
    {
        path: "checkout",
        loadChildren: () =>
            import("./checkout/checkout.module").then(m => m.CheckoutModule)
    },
    {
        path: "instant-vote",
        loadChildren: () =>
            import("./instantvote/instantvote.module").then(
                m => m.InstantvoteModule
            )
    },
    {
        path: "error",
        loadChildren: () =>
            import("./server-error/server-error.module").then(
                m => m.ServerErrorModule
            )
    },
    {
        path: "access-denied",
        loadChildren: () =>
            import("./access-denied/access-denied.module").then(
                m => m.AccessDeniedModule
            )
    },
    {
        path: "not-found",
        loadChildren: () =>
            import("./not-found/not-found.module").then(m => m.NotFoundModule)
    },
    { path: "**", redirectTo: "not-found" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
