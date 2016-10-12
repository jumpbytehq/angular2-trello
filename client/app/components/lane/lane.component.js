/*jshint esversion: 6 */

import { Component, Input } from '@angular/core';
import {LaneService} from '../../services/lane.service.js';
import {CardService} from '../../services/card.service.js';


@Component({
	selector: 'lane',
  	templateUrl: "app/components/lane/lane.component.html"
})
export class LaneComponent {

	@Input('data') lane; 

  	constructor(laneService: LaneService, cardService: CardService) { 
  		this.newCardTitle = '';
		this.laneService = laneService;
		this.cardService = cardService;
		this.isFormVisible = false;
	}

	addCard() {
		var self = this;
		if(self.newCardTitle) {
			
			var newCardObj = {
				title: self.newCardTitle,
				lane: self.lane._id
			};

			self.cardService.createCard(newCardObj).subscribe(card => {
				self.lane.cards.push(card);
				this.setFormVisibility(false);
				this.newCardTitle = '';
			});
		}
	}

	setFormVisibility(status) {
		this.isFormVisible = status;
	}
}