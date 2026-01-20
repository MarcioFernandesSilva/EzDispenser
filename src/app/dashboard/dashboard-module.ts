import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { DashboardComponent } from './dashboard/dashboard';
import { RevenueChart } from './components/revenue-chart/revenue-chart';


@NgModule({
  declarations: [
    DashboardComponent,
    RevenueChart
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {}