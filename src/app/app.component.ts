import { NegativeCheckingValidator } from './shared/negativevalue.validator';
import { IAmortization } from './IAmortization';
import { ILoanCalculatorField } from './ILoanCalculatorField';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  emiValue = 0;
  totalIntrest = 0;
  totalAmount = 0;
  LoanCalValue: ILoanCalculatorField;
  amortization: IAmortization = {
    installment: null,
    principal: null,
    interest: null,
    balance: null,
    totalPayment: null,
  };

  amortizationValues: IAmortization[] = [];
  loanTypeValue = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Auto' },
    { id: 3, name: 'Student' },
    { id: 4, name: 'Personal' },
    { id: 5, name: 'Credit Card' },
    { id: 6, name: 'Other' },
  ];

  constructor(private fb: FormBuilder) {}

  get loanAmount() {
    return this.myForm.get('loanAmount');
  }
  get loanTerm() {
    return this.myForm.get('loanTerm');
  }
  get interestRate() {
    return this.myForm.get('interestRate');
  }
  get loanType() {
    return this.myForm.get('loanType');
  }
  get termType() {
    return this.myForm.get('termType');
  }
  ngOnInit() {
    this.myForm = this.fb.group({
      loanAmount: [
        '5000',
        [Validators.required, NegativeCheckingValidator.isNegative],
      ],
      loanTerm: ['1', [Validators.required]],
      interestRate: ['10', [Validators.required]],
      loanType: ['', [Validators.required]],
      termType: ['1', [Validators.required]],
    });
  }

  onSubmit(form: FormGroup) {
    this.LoanCalValue = form.value;
    this.totalIntrest = 0;
    this.calculateAmortization();
    console.log(this.amortizationValues);

    this.totalAmount = +this.LoanCalValue.loanAmount + this.totalIntrest;
    this.emiValue = Math.round(this.calculateEmi());
    console.log(this.amortizationValues);
  }

  calculateRateOfInterestMonthly(): number {
    return this.LoanCalValue.interestRate / 12 / 100;
  }

  convertYearIntoMonth(): number {
    if (this.LoanCalValue.termType === 1)
      return this.LoanCalValue.loanTerm * 12;
    else return this.LoanCalValue.loanTerm;
  }

  calculateAmortization() {
    // console.log(this.amortization);
    this.amortizationValues = [];
    let emi = this.calculateEmi();
    let loanAmount = this.LoanCalValue.loanAmount;
    // console.log(this.convertYearIntoMonth());

    for (let i = 0; i < this.convertYearIntoMonth(); i++) {
      let interest = loanAmount * this.calculateRateOfInterestMonthly();
      let principal = emi - interest;
      // console.log(this.amortizationValues[i].installment);
      this.amortization.installment = 1 + i;
      this.amortization.principal = Math.round(principal);
      this.amortization.interest = Math.round(interest);
      this.totalIntrest += Math.round(interest);
      loanAmount = Math.round(loanAmount - principal);
      this.amortization.balance = Math.round(loanAmount);
      this.amortization.totalPayment = Math.round(emi);
      // console.log(this.amortization);
      this.amortizationValues.push(this.amortization);
      this.amortization = {
        installment: null,
        principal: null,
        interest: null,
        balance: null,
        totalPayment: null,
      };
      interest = 0;
      principal = 0;
    }
  }

  calculateEmi() {
    let rateOfIntrest = this.calculateRateOfInterestMonthly() + 1;
    return (
      (this.LoanCalValue.loanAmount *
        this.calculateRateOfInterestMonthly() *
        Math.pow(rateOfIntrest, +this.convertYearIntoMonth())) /
      (Math.pow(rateOfIntrest, +this.convertYearIntoMonth()) - 1)
    );
  }
  onChangeValue() {
    let loanTermValue = this.myForm.get('loanTerm').value;
    if (loanTermValue) {
      if (this.myForm.get('termType').value == 1) {
        this.myForm.patchValue({
          loanTerm: loanTermValue / 12,
        });
      }
      if (this.myForm.get('termType').value == 2) {
        this.myForm.patchValue({
          loanTerm: loanTermValue * 12,
        });
      }
    }
  }
}
