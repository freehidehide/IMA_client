import { Size } from './../api/models/size';
import { Component, OnInit } from '@angular/core';
import { Product } from '../api/models/product';
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
  public mainImage: any;
  constructor(private categoryService: CategoryService,
    protected userService: UserService,
    protected toastService: ToastService) { }

  ngOnInit(): void {
    this.getSizes();
  }

  addColor(value: string) {
    if (this.product.details.length > 0) {
      this.product.details.forEach(color => {
        color.is_active = false;
      });
    }
    if (!this.product.details[this.selectedColorIndex] || !this.product.details[this.selectedColorIndex].images_details) {
      const detail = {
        color: value,
        is_active: true,
        images: [],
        images_details: []
      };
      this.product.details.push(detail);
    } else {
      this.product.details[this.selectedColorIndex].color = value;
      this.product.details[this.selectedColorIndex].is_active = true;
    }
  }

  choosedColorIndex(value: string) {
  }

  addproduct() {
    if (this.product.name.trim() === '') {

    } else if (this.product.name.trim() === '') {
    } else if (this.product.name.trim() === '') {
    } else if (this.product.name.trim() === '') {
    }
    console.log('this.product.---------', this.product);
    const details = [];
    const sizeSelected = this.sizes.filter(element => {
      return (element.isActive);
    });
    this.product.details.forEach(element => {
      details.push({
        color: element.color,
        quantity: this.product.quantity,
        price: this.product.price,
        discount_percentage: this.product.discount,
        coupon_code: this.product.coupon_code,
        sizes: (sizeSelected.length > 0) ? sizeSelected : [0],
        images: element.images[0]
      });
    });
    const requestParams = {
      name: this.product.name,
      description: this.product.description,
      product_details: details
    };
    console.log('this.requestParams.---------', requestParams);
  }

  changeImage(value: any) {
    this.mainImage = value;
  }

  chooseSize(size: Size) {
    size.isActive = !size.isActive;
  }

  uploadImage(event) {
      const formData: any = new FormData();
      if (event.target.files.length > 0) {
          if (!this.product.details[this.selectedColorIndex] || !this.product.details[this.selectedColorIndex].images_details) {
            this.product.details[this.selectedColorIndex] = {
              images_details: [],
              images: [],
              color: '',
              is_active: true,
            };
          }
          Array.from(event.target.files).forEach((element: any, index: number) => {
              formData.append('file[]', element, element.name);
              const reader = new FileReader();
              reader.readAsDataURL(element);
              reader.onload = (imageEvent) => {
                if (index === 0) {
                  this.mainImage = reader.result;
                }
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
