/*jshint esversion: 6 */

import { Component, Input } from '@angular/core';

@Component({
	selector: 'card',
  	templateUrl: "app/components/card/card.component.html"
})
export class CardComponent {
	@Input('data') card;
}