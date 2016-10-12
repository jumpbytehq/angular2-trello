/*jshint esversion: 6*/
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
// import {DndModule, DND_PROVIDERS, DND_DIRECTIVES} from 'ng2-dnd';
import { DragulaModule } from 'ng2-dragula';

import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';


import {AppComponent} from './components/app/app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LaneComponent} from './components/lane/lane.component';
import {CardComponent} from './components/card/card.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';

import { LaneService } from './services/lane.service';
import { CardService } from './services/card.service';

import {AppRoutingModule} from './app.routes';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    DashboardComponent,
    ToolbarComponent,
    LaneComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DragulaModule,
    ModalModule
  ],
  providers: [
    LaneService,
    CardService
  ]
})
export class MainModule {}