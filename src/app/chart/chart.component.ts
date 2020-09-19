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
  @Input() set barTotalPayment(data) {
    this.barChartData[0].data = data;

  };
  @Input() set barIntrestTotalPayment(data) {
    this.barChartData[1].data = data;
  };
  @Input() set barYear(data) {
    this.barChartLabels = data;
  };

  @Input() set pieChart(data) {
    this.pieChartData = data;
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: this.barTotalPayment, label: 'Total Payment' },
    { data: this.barIntrestTotalPayment, label: 'Total Interest' }
  ];
  //Pie Chart
  public pieChartLabels: string[] = ['Total Amount Paid', 'Total Intrest Paid'];
  public pieChartData: number[];
  public pieChartType: string;

  constructor() {
  }

  ngOnInit(): void {
    this.pieChartType = 'pie';

  }

}
