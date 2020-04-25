import { Component, OnInit } from '@angular/core';
import { Product } from '../api/models/product';
import { Size } from '../api/models/size';
import { SizeList } from '../api/models/size-list';
import { CategoryService } from '../api/services/category.service';
import { ToastService } from '../api/services/toast-service';
import { UserService } from '../api/services/user.service';
import { QueryParam } from '../api/models/query-param';
import { AppConst } from '../utils/app-const';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  public product: any = {
    name: '',
    quantity: '',
    price: '',
    description: '',
    coupon_code: '',
    discount: '',
    details: [],
  };
  public sizeList: SizeList;
  public selectedColorIndex = 0;
  public sizes: Size[] = [];
  public productDetail: Product;
  public imageList: any = [];
  public images_details: any = [];
  constructor(private categoryService: CategoryService,
    protected userService: UserService,
    protected toastService: ToastService) { }

  ngOnInit(): void {
    this.getSizes();
  }

  choosedColor(value: string) {
    if (this.product.details.length > 0) {
      this.product.details.forEach(color => {
        color.is_active = false;
      });
    }
    const detail = {
      color: value,
      is_active: true,
      images: [],
      images_details: []
    };
    this.product.details.push(detail);
  }

  uploadImage(event) {
      const formData: any = new FormData();
      if (event.target.files.length > 0) {
          if (!this.product.details[this.selectedColorIndex] || !this.product.details[this.selectedColorIndex].images_details) {
            this.product.details[this.selectedColorIndex] = {
              images_details: [],
              images: []
            };
          }
          Array.from(event.target.files).forEach((element: any) => {
              formData.append('file[]', element, element.name);
              const reader = new FileReader();
              reader.readAsDataURL(element);
              reader.onload = (imageEvent) => {
                this.product.details[this.selectedColorIndex].images_details.unshift(reader.result);
              };
          });
          this.images_details = this.product.details[this.selectedColorIndex].images_details;
          this.imageList = formData;
          this.profileUpload();
      } else {
          this.imageList = '';
      }
  }

  profileUpload() {
      this.toastService.showLoading();
      const queryParam: QueryParam = {
          class: 'Product'
      };
      this.userService.postFile(this.imageList, queryParam)
      .subscribe((response) => {
          if (response.error && response.error.code === AppConst.SERVICE_STATUS.SUCCESS) {
            this.imageList = [];
            this.product.details[this.selectedColorIndex].images.push(response.attachments);
          } else {
              this.toastService.error(response.error.message);
          }
          this.toastService.clearLoading();
      });
  }

  getSizes() {
    this.categoryService
        .sizes()
        .subscribe((response) => {
            this.sizeList = response;
            this.sizes = this.sizeList.data;
        });
  }

}
