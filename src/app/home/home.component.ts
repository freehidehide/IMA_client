
import {Component, OnInit} from '@angular/core';
import {SessionService} from '../api/services/session-service';
import {StartupService} from '../api/services/startup.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public settings: any;
    constructor(public sessionService: SessionService,
        public startupService: StartupService) {}

    ngOnInit() {
        this.settings = this.startupService.startupData();
    }
}
