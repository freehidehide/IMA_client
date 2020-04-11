
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable()
export class ToastService {
    public isLoading = false;
    // https://sweetalert2.github.io/
    success(message) {
        Swal.fire({
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 2000
          });
    }

    error(message) {
        Swal.fire({
            icon: 'error',
            title: message,
            showConfirmButton: false,
            timer: 2000
          });
    }

    warning(message) {
        Swal.fire({
            icon: 'warning',
            title: message,
            showConfirmButton: false,
            timer: 2000
          });
    }

    info(message) {
        Swal.fire({
            icon: 'info',
            title: message,
            showConfirmButton: false,
            timer: 2000
          });
    }

    showLoading() {
        this.isLoading = true;
    }

    clearLoading() {
        this.isLoading = false;
    }
}
