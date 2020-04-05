
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AppConst } from '../../utils/app-const';
import { QueryParam } from '../models/query-param';

@Injectable()
export class ApiService {
    private baseUrl: string = environment.apiEndPoint;
    private token: string;
    private httpOptions: any;
    public windowTop: any = window.top;

    constructor(private http: HttpClient) {}

    getHeaders() {
        let addHeaders: HttpHeaders = new HttpHeaders();
        addHeaders = addHeaders.append('Accept', 'application/json');
        addHeaders = addHeaders.append('Content-Type', 'application/json');
        if (sessionStorage.getItem('user_context') !== undefined) {
            const sessionStr = JSON.parse(
                sessionStorage.getItem('user_context')
            );
            if (sessionStr && sessionStr.access_token !== null) {
                /*addHeaders = addHeaders.append(
					'Authorization',
					'Bearer ' + sessionStr.access_token
				);*/
                this.token = sessionStr.access_token;
            }
        }
        this.httpOptions = {
            headers: addHeaders
        };
    }

    httpGet<T>(url: string, params: QueryParam): Observable<T> {
        this.getHeaders();
        return this.http
            .get<T>(
                this.getFormattedQueryParam(url, params, 'GET'),
                this.httpOptions
            )
            .pipe(catchError(this.handleNetworkErrors));
    }

    /**
     * Performs a request with `post` http method.
     */
    httpPost(url: string, body: any, params?: QueryParam): Observable<any> {
        this.getHeaders();
        return this.http
            .post(
                this.getFormattedQueryParam(url, params, 'POST'),
                body,
                this.httpOptions
            )
            .pipe(catchError(this.handleNetworkErrors));
    }

    /**
     * Performs a request with `put` http method.
     */
    httpPut(url: string, body: any, params?: QueryParam): Observable<any> {
        this.getHeaders();
        return this.http
            .put(
                this.getFormattedQueryParam(url, params, 'PUT'),
                body,
                this.httpOptions
            )
            .pipe(catchError(this.handleNetworkErrors));
    }

    /**
     * Performs a request with `delete` http method.
     */
    httpDelete(
        url: string,
        options?: any,
        params?: QueryParam
    ): Observable<any> {
        this.getHeaders();
        return this.http
            .delete(this.getFormattedQueryParam(url, params, 'DELETE'), options)
            .pipe(catchError(this.handleNetworkErrors));
    }

    /**
     * Handles all the network errors from the Http methods
     */
    handleNetworkErrors(errObject: HttpErrorResponse): Observable<any> {
        if (errObject.status === 0) {
            sessionStorage.removeItem('user_context');
            sessionStorage.setItem('backend_failure', 'true');
            window.location.href = '/login';
        } else if (errObject.status === 401) {
            sessionStorage.removeItem('user_context');
            sessionStorage.setItem('session_expired', 'true');
            window.location.href = '/login';
        } else if (errObject.status === 500) {
            alert(errObject.error.statusMessage);
        }
        return of(true);
    }

    /**
     * Formats the key value pair to query pair
     */
    getFormattedQueryParam(url: string, params: any, method: string): string {
        let formattedUrl: string;
        const appendToken: string = !(AppConst.NON_AUTH_SERVER_URL_LIST.indexOf(url) > -1)
                ? '?token=' + this.token
                : '?';
        if (params) {
            const queryString = Object.keys(params)
                .map(function(key) {
                    return key + '=' + params[key];
                })
                .join('&');
            formattedUrl = this.baseUrl + url + appendToken + '&' + queryString;
        } else {
            formattedUrl =
                appendToken !== '?'
                    ? this.baseUrl + url + appendToken
                    : this.baseUrl + url;
        }
        return formattedUrl;
    }
}
