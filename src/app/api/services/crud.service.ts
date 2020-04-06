
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
@Injectable()
export class CrudService {
    constructor(private apiService: ApiService) {}

    get(url, request: any): Observable<any> {
        return this.apiService.httpGet(url, request);
    }

    post(url, request: any): Observable<any> {
        return this.apiService.httpPost(url, request);
    }

    put(url, request: any): Observable<any> {
        return this.apiService.httpPut(url, request);
    }

    delete(url, request: any): Observable<any> {
        return this.apiService.httpDelete(url, request);
    }
}
