/** @format */

import {Injectable} from '@angular/core';

@Injectable()
export class ToastService {
	public showMessage: boolean = false;
	public isLoading: boolean = false;
	public message: string = '';
	public messageClass: string = 'alert-success';

	success(message) {
		this.showMessage = true;
		this.message = message;
		this.messageClass = 'alert-success';
		this.showMessagePopup();
	}

	error(message) {
		this.showMessage = true;
		this.message = message;
		this.messageClass = 'alert-warning';
		this.showMessagePopup();
	}

	warning(message) {
		this.showMessage = true;
		this.message = message;
		this.messageClass = 'alert-warning';
		this.showMessagePopup();
	}

	info(message) {
		this.showMessage = true;
		this.message = message;
		this.messageClass = 'alert-info';
		this.showMessagePopup();
	}

	removeToast() {
		this.showMessage = false;
	}

	showMessagePopup() {
		setTimeout(() => {
			this.showMessage = false;
		}, 10000);
	}

	showLoading() {
		this.isLoading = true;
	}

	clearLoading() {
		this.isLoading = false;
	}
}
