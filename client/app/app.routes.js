/*jshint esversion: 6*/

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
  		{ path: '', component: DashboardComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}