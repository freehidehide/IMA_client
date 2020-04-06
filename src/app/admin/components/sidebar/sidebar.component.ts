
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionService } from '../../../api/services/session-service';
import { ToastService } from '../../../api/services/toast-service';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    menus: any;
    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(private translate: TranslateService,
        public router: Router,
        private sessionService: SessionService,
        private toastService: ToastService) {
        this.router.events.subscribe((val) => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
        this.getAdminSettings();
    }

    getAdminSettings() {
        this.sessionService.getAdminSettingsHandler()
            .subscribe((response) => {
                this.menus = response.menus;
                this.toastService.clearLoading();
                this.sessionService.setAdminSettingList(this.menus);
            });
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    redirect(url: string): void {
        if (url === '/logout') {
            this.sessionService.logout();
            this.router.navigate([ '/' ]);
        } else {
            url = (url === '/dashboard') ? url : ('/admin/actions' + url);
            this.router.navigate([ url ]);
        }
    }
}
