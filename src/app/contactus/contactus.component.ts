import { Component, OnInit } from '@angular/core';
import { ToastService } from '../api/services/toast-service';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  contact: any;
  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.contact = {
      name: '',
      subject: '',
      phone: '',
      email: '',
      msg: ''
    }
  }
  onSubmit() {
    if (this.contact.name.trim() === '') {
      this.toastService.error('Name is required');
      return;
    } else if (this.contact.subject.trim() === '') {
      this.toastService.error('Subject is required');
      return;
    } else if (this.contact.phone.trim() === '') {
      this.toastService.error('Phone is required');
      return;
    } else if (this.contact.email.trim() === '') {
      this.toastService.error('Email is required');
      return;
    } else if (this.contact.msg.trim() === '') {
      this.toastService.error('Message is required');
      return;
    } else {
      this.toastService.success('We should be in touch within the next 24 hrs');
      this.ngOnInit();
      return;
    }
  }

}
