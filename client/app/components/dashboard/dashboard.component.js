/*jshint esversion: 6 */

import { Component, ViewChild } from '@angular/core';
import { LaneService } from '../../services/lane.service';
import { CardService } from '../../services/card.service';
import {DragulaService} from 'ng2-dragula';


@Component({
	selector: 'dashboard',
  	templateUrl: "app/components/dashboard/dashboard.component.html"
})
export class DashboardComponent {

	fetchLanes() {
		if(!this.lanes) {
			this.lanes = [];
		}

		this.laneService.getLanes().subscribe(data => {
			if(data && data.lanes.length) {
				this.lanes = data.lanes;
			}
		});
	}

  	@ViewChild('addLaneModal') addLaneModal;

	constructor(laneService: LaneService, dragulaService: DragulaService, cardService: CardService) {		

		this.newLaneModel = {};

		this.laneService = laneService;
		this.cardService = cardService;
		
		this.fetchLanes();

		this.dragulaService = dragulaService;

	    this.dragulaService.dropModel.subscribe((value) => {
	      this.onDropModel(value.slice(1));
	    });
	}

	onDropModel(args) {
		console.log(args);
		var cardId = args[0].firstElementChild.id;
		var toLane = args[1].id;
		var fromLane = args[2].id;

		if(toLane !== fromLane) {
			this.cardService.transferCard(cardId, fromLane, toLane).subscribe(data => {
	    		console.log(data);
	    	});
		}
  	}

  	createLane() {
  		var clone = JSON.parse(JSON.stringify(this.newLaneModel));
  		this.laneService.createLane(clone).subscribe((laneObj) => {
  			if(laneObj) {
  				this.newLaneModel = {};
  				this.lanes.push(laneObj);
  				this.addLaneModal.hide();
  			}
  		})
  	}
}