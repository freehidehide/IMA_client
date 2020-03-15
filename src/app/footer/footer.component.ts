import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public hideFooter: boolean = false;
  public footerRemove: string[] = ['/login', '/signup','/forgot-password'];
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideFooter = !(this.footerRemove.indexOf(event.url) > -1);
      }
    });
  }

  
}
