import { RoundTheNumber } from './shared/round.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DispalyAmortizationComponent } from './dispaly-amortization/dispaly-amortization.component';

@NgModule({
  declarations: [AppComponent, DispalyAmortizationComponent, RoundTheNumber],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  exports: [RoundTheNumber],
  bootstrap: [AppComponent],
})
export class AppModule { }
