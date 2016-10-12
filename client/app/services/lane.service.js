/* jshint ignore:start */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class LaneService {

	constructor(http: Http) { 
  		this.baseUrl = "/api";
  		this.http = http;
	}

	getLanes() {
		return this.http.get(this.baseUrl + "/lane")
         .map((res:Response) => {
            let lanes = res.json();
            return lanes;
          })
         .catch((error:any) => Observable.throw(error || 'Server error'));
	}
	
	createLane(lane) {
	  let bodyString = JSON.stringify(lane);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.baseUrl + "/lane", bodyString, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error || 'Server error'));
	}
}
