/*jshint esversion: 6 */

import { Component, ViewContainerRef } from '@angular/core';

@Component({
	selector: 'my-app',
  	templateUrl: "app/components/app/app.component.html"
})
export class AppComponent {
	constructor(viewContainerRef: ViewContainerRef) {
		this.viewContainerRef = viewContainerRef;
		this.appTitle = "Demo - App";
	}
}