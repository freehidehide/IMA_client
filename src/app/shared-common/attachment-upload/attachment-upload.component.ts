import { Component, Input } from '@angular/core';
import { ImageService } from 'src/app/api/services/image.service';
import { QueryParam } from 'src/app/api/models/query-param';

@Component({
  selector: 'app-attachment-upload',
  templateUrl: './attachment-upload.component.html',
  styleUrls: ['./attachment-upload.component.css']
})
export class AttachmentUploadComponent {

@Input() class: string;
@Input() multiple: string;

  constructor(public imageService: ImageService) { }

  fileUpload(event) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      const queryParam: QueryParam = {
          class: this.class
      };
      const fileData = {
          file: event.target.files[0].name
      };

      this.imageService.updateUserAvatar(fileData, queryParam).subscribe((data) => {
            console.log('data', data);
      });
  }

}
