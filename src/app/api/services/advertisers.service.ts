/** @format */

import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {AppConst} from '../../utils/app-const';
import {Observable} from 'rxjs';

import {AdvertisementList} from '../models/advertisement-list';

@Injectable()
export class AdvertiserService {
	constructor(private apiService: ApiService) {}

	getAll(): Observable<AdvertisementList> {
		const advertisementList: string = AppConst.SERVER_URL.ADVERTISEMENTS;
		return this.apiService.httpGet(advertisementList);
	}
}
