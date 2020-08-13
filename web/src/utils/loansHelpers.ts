import { LoanType } from './interface'
import { interestRates, productTypeParseName } from './constants';

export function monthlyAmortizationCalculator(loanAmount: number, interestRate: number, terms: number) {
  if (!loanAmount || !interestRate || !terms) {
    return 0
  }
  const num = ((loanAmount *  interestRate / 100) * terms + loanAmount) / terms
  return Math.round(num * 100) / 100
}

function formatDateSumittedDate(time: string) {
  const date = new Date(time);
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

function numberWithCommas(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function processLoans(list: Array<LoanType>) {
  if (list && list.length) {
    return list.map(({ productType, loanAmount, terms, _id, createdAt }) => ({
      productType: productType ? productTypeParseName[productType] : '',
      loanAmount: numberWithCommas(loanAmount),
      terms: `${terms} months`,
      _id,
      submittedDate: createdAt ? formatDateSumittedDate(createdAt) : '',
      interestRate: productType ? `${interestRates[productType]}%` : '',
      monthlyAmortization: numberWithCommas(
        monthlyAmortizationCalculator(
          loanAmount,
          productType ? interestRates[productType] : 0,
          terms || 0
        )
      ),
      principalApproved: 'N/A'
    }));
     
  }
  return []
}