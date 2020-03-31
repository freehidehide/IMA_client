/** @format */

import {Component, HostListener, Inject} from '@angular/core';
import {RouterModule, Router, NavigationEnd} from '@angular/router';
import {SessionService} from '../api/services/session-service';
import {DOCUMENT} from '@angular/common';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    public hideHeader: boolean = false;
    public showStaticHeader: boolean = false;
    public isShow: boolean = false;
    public isScrollheader: boolean = false;
    public headerRemove: string[] = [
        '/login',
        '/signup',
        '/forgot-password',
        '/resend-link',
        '/reset-password',
        '/password-changed'
    ];
    public staticheader: string[] = [
        '/profile',
        '/view-profile',
        '/cart',
        '/checkout',
        '/edit'
    ];
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private router: Router,
        public sessionService: SessionService
    ) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.hideHeader = !(this.headerRemove.indexOf(event.url) > -1);
                this.showStaticHeader =
                    this.staticheader.indexOf(event.url) > -1;
            }
        });
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.isScrollheader =
            document.body.scrollTop > 367 ||
            document.documentElement.scrollTop > 367;
    }

    toggleSidebar(): void {
        this.isShow = !this.isShow;
    }

    redirect(url: string): void {
        this.router.navigate([url]);
    }
}
