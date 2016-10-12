/* jshint ignore:start */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class CardService {

	constructor(http: Http) { 
  		this.baseUrl = "/api/card";
  		this.http = http;
	}

	createCard(newCardObj) {
		let bodyString = JSON.stringify(newCardObj);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers }); // Create a request option

		return this.http.post(this.baseUrl, bodyString, options)
         .map((res:Response) => res.json())
         .catch((error:any) => Observable.throw(error || 'Server error'));	
	}

  transferCard(cardId, fromLane, toLane) {
    let bodyString = JSON.stringify({
      card: cardId,
      fromLane: fromLane,
      toLane: toLane 
    });

    console.log(bodyString); 
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.baseUrl + "/transfer-card", bodyString, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error || 'Server error'));  
  }
}
