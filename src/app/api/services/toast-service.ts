import { Injectable } from '@angular/core';

@Injectable()
export class ToastService {

    private _showPopUp: boolean = false;
    // @Input
    constructor() { }

    success(message) {
     //   this.toastRef = this.toastr.success(message, this.toastConfig);
    }

    error(message)  {
       // this.toastRef = this.toastr.error(message, this.toastConfig);
    }

    warning(message)  {
        // this.toastRef = this.toastr.warning(message, this.toastConfig);
    }

    info(message)  {
        // this.toastRef = this.toastr.info(message, this.toastConfig);
    }

    show(message)  {
        // this.toastRef = this.toastr.show(message, this.toastConfig);
    }

    removeToast(message)  {
       // this.toastr.clear(this.toastRef.ToastId);
    }
}
