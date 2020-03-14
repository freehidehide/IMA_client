import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class ToastMessage {

    public toastConfig: Object = {
        timeOut: 3000,
        autoDismiss: true,
        positionClass: 'toast-top-center'
    };
    toastRef: any;

    constructor(private toastr: ToastrService) { }

    success(message, title) {
        this.toastRef = this.toastr.success(message, title, this.toastConfig);
    }

    error(message, title)  {
        this.toastRef = this.toastr.error(message, title, this.toastConfig);
    }

    warning(message, title)  {
        this.toastRef = this.toastr.warning(message, title, this.toastConfig);
    }

    info(message, title)  {
        this.toastRef = this.toastr.info(message, title, this.toastConfig);
    }

    show(message, title)  {
        this.toastRef = this.toastr.show(message, title, this.toastConfig);
    }

    removeToast(message, title)  {
        this.toastr.clear(this.toastRef.ToastId);
    }
}
