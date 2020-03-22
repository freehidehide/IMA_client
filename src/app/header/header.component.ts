import { Component } from "@angular/core";
import { RouterModule, Router, NavigationEnd } from "@angular/router";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
    public hideHeader: boolean = false;
    public showStaticHeader: boolean = false;
    public headerRemove: string[] = [
        "/login",
        "/signup",
        "/forgot-password",
        "/resend-link",
        "/reset-password",
        "/password-changed"
    ];
    public staticheader: string[] = [
        "/profile",
        "/view-profile",
        "/cart",
        "/checkout"
    ];
    constructor(private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.hideHeader = !(this.headerRemove.indexOf(event.url) > -1);
                this.showStaticHeader =
                    this.staticheader.indexOf(event.url) > -1;
            }
        });
    }

    public toggleSidebar(): void {}
}
