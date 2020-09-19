import { NegativeCheckingValidator } from './shared/negativevalue.validator';
import { IAmortization } from './IAmortization';
import { ILoanCalculatorField } from './ILoanCalculatorField';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
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
  barTotalPayment = [];
  barIntrestTotalPayment = [];
  barYear = [];
  change = 1;
  emiValue = 0;
  totalIntrest = 0;
  totalAmountPaid = 0;
  LoanCalValue: ILoanCalculatorField;
  amortization: IAmortization = {
    // barTotalPayment: null,
    // barIntrestTotalPayment: null,
    // barPrincipalPayment: null,
    installment: null,
    principal: null,
    interest: null,
    balance: null,
    totalPayment: null,
    startingLoanBalance: null,
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

  constructor(private fb: FormBuilder) { }

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
    this.totalAmountPaid = 0;
    this.totalIntrest = 0;
    this.calculateAmortization();
    // console.log(this.amortizationValues);

    this.emiValue = this.calculateEmi();
    // console.log(this.amortizationValues);
  }

  calculateRateOfInterestMonthly(): number {
    return this.LoanCalValue.interestRate / 12 / 100;
  }

  convertYearIntoMonth(): number {
    if (this.LoanCalValue.termType == 1)
      return this.LoanCalValue.loanTerm * 12;
    else return this.LoanCalValue.loanTerm;
  }

  calculateAmortization() {
    this.barYear = [];
    this.barIntrestTotalPayment = [];
    this.barTotalPayment = []
    let barYear = (new Date()).getFullYear();
    let barTotalPayment = 0;
    let barIntrestTotalPayment = 0;
    // let barPrincipalPayment = 0;
    let installmentCount1 = 0;
    let installmentCount = (new Date()).getFullYear();
    // console.log(this.amortization);
    this.amortizationValues = [];
    let emi = this.calculateEmi();
    // console.log(emi);
    let loanAmount = this.LoanCalValue.loanAmount;
    let startingLoanBalance = loanAmount;
    // console.log(this.convertYearIntoMonth());
    for (let i = 0; i < this.convertYearIntoMonth(); i++) {
      let interest = loanAmount * this.calculateRateOfInterestMonthly();
      // if (installmentCount1 < 12) {
      //   installmentCount1++;
      // } else {
      //   installmentCount1 = 1;
      //   this.amortization.installment = installmentCount;
      //   installmentCount++;
      // }
      let principal = emi - interest;
      // console.log(this.amortizationValues[i].installment);
      this.amortization.principal = principal;
      this.amortization.interest = interest;
      this.totalIntrest += interest;
      this.amortization.startingLoanBalance = startingLoanBalance;
      loanAmount = loanAmount - principal;
      startingLoanBalance = loanAmount;
      this.amortization.balance = loanAmount;
      this.amortization.totalPayment = emi;
      this.totalAmountPaid += emi;
      if (installmentCount1 < 12) {

        barTotalPayment += this.amortization.totalPayment;
        barIntrestTotalPayment += this.amortization.interest;
        // barPrincipalPayment += this.amortization.principal;    
        installmentCount1++;
      } if (installmentCount1 == 12 || i == this.convertYearIntoMonth() - 1) {
        this.barYear.push(barYear);
        ++barYear;
        this.barTotalPayment.push(Math.round(barTotalPayment));
        this.barIntrestTotalPayment.push(Math.round(barIntrestTotalPayment));
        if (installmentCount1 == 12 || !(i == this.convertYearIntoMonth() - 1)) {
          installmentCount1 = 0;
          this.amortization.installment = installmentCount;
          installmentCount++;
        }

      }
      // console.log(this.amortization);
      this.amortizationValues.push(this.amortization);
      this.amortization = {
        // barTotalPayment: null,
        // barIntrestTotalPayment: null,
        // barPrincipalPayment: null,
        installment: null,
        principal: null,
        interest: null,
        balance: null,
        totalPayment: null,
        startingLoanBalance: null,
      };
      interest = 0;
      principal = 0;
    }
    // console.log(this.barIntrestTotalPayment);
    // console.log(this.barTotalPayment);
    // console.log(this.barYear);
  }

  calculateEmi() {
    let rateOfIntrest = this.calculateRateOfInterestMonthly() + 1;
    // console.log(+this.convertYearIntoMonth());

    return (
      (this.LoanCalValue.loanAmount *
        this.calculateRateOfInterestMonthly() *
        Math.pow(rateOfIntrest, +this.convertYearIntoMonth())) /
      (Math.pow(rateOfIntrest, +this.convertYearIntoMonth()) - 1)
    );
  }
  onChangeValue() {
    // this.change = !this.change;
    let loanTermValue = this.myForm.get('loanTerm').value;
    if (loanTermValue) {
      if (this.myForm.get('termType').value == 1) {
        this.change = 1;
        this.myForm.patchValue({
          loanTerm: loanTermValue / 12,
        });
      }
      if (this.myForm.get('termType').value == 2) {
        this.change = 2;
        this.myForm.patchValue({
          loanTerm: loanTermValue * 12,
        });
      }
    }
  }
}
