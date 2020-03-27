/** @format */

import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {AppConst} from '../../utils/app-const';
import {Observable} from 'rxjs';

import {CategoriesList} from '../models/categories-list';

@Injectable()
export class CategoryService {
	constructor(private apiService: ApiService) {}

	getAll(): Observable<CategoriesList> {
		const categoriesList: string = AppConst.SERVER_URL.ALLCATEGORY;
		return this.apiService.httpGet(categoriesList);
	}
}
