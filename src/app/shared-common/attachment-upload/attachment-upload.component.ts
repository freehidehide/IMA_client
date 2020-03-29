import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-attachment-upload',
  templateUrl: './attachment-upload.component.html',
  styleUrls: ['./attachment-upload.component.css']
})
export class AttachmentUploadComponent {

@Input() class: string;
@Input() multiple: string;

  constructor() { }

  fileUpload(event) {
    const formData = new FormData();
      console.log('event', event);
  }

}
