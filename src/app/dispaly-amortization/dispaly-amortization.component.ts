import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dispaly-amortization',
  templateUrl: './dispaly-amortization.component.html',
  styleUrls: ['./dispaly-amortization.component.css'],
})
export class DispalyAmortizationComponent implements OnInit {
  @Input() amortizationValues;
  constructor() {}

  ngOnInit(): void {}
}
