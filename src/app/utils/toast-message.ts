import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class ToastMessage {

    public toastConfig: Object = {
        timeOut: 3000,
        autoDismiss: true,
        positionClass: 'toast-top-center'
    };

    constructor(private toastr: ToastrService) { }

    success(message, title) {
        this.toastr.success(message, title, this.toastConfig);
    }

    error(message, title)  {
        this.toastr.error(message, title, this.toastConfig);
    }

    warning(message, title)  {
        this.toastr.warning(message, title, this.toastConfig);
    }

    info(message, title)  {
        this.toastr.info(message, title, this.toastConfig);
    }

    show(message, title)  {
        this.toastr.show(message, title, this.toastConfig);
    }
}
