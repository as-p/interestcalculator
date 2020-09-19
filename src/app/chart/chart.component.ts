import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { Label } from 'ng2-charts';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() set barTotalPayment(info) {
    this.barChartData[0].data = info;

  };
  @Input() set barIntrestTotalPayment(info) {
    this.barChartData[1].data = info;
  };
  @Input() set barYear(info) {
    this.barChartLabels = info;
  };

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: this.barTotalPayment, label: 'Total Payment' },
    { data: this.barIntrestTotalPayment, label: 'Total Intrest' }
  ];


  constructor() {
  }

  ngOnInit(): void {
  }

}
