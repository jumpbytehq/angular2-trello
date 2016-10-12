/*jshint esversion: 6 */

import { Component, Input } from '@angular/core';

@Component({
	selector: 'toolbar',
  	templateUrl: "app/components/toolbar/toolbar.component.html"
})
export class ToolbarComponent {

	@Input() appTitle;
}