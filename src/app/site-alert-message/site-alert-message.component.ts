/** @format */

import {Component} from '@angular/core'
import {ToastService} from '../api/services/toast-service'

@Component({
	selector: 'app-site-alert-message',
	templateUrl: './site-alert-message.component.html',
	styleUrls: ['./site-alert-message.component.scss']
})
export class SiteAlertMessageComponent {
	constructor(public toastService: ToastService) {}
}
