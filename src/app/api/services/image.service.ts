/** @format */

import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {FormGroup} from '@angular/forms';
import {AppConst} from '../../utils/app-const';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {QueryParam} from '../models/query-param';

@Injectable({
	providedIn: 'root'
})
export class ImageService {
	constructor(private apiService: ApiService) {}

	updateUserAvatar(imageData, queryParam: QueryParam): Observable<User> {
		const imageUrl: string = AppConst.NON_AUTH_SERVER_URL.ATTACHMENTS;
		return this.apiService.httpPost(imageUrl, imageData, queryParam);
	}
}
