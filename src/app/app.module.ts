import { RoundTheNumber } from './shared/round.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DispalyAmortizationComponent } from './dispaly-amortization/dispaly-amortization.component';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AppComponent, DispalyAmortizationComponent, RoundTheNumber, ChartComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, ChartsModule],
  providers: [],
  exports: [RoundTheNumber],
  bootstrap: [AppComponent],
})
export class AppModule { }
