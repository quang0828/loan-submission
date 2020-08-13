export interface LoginType {
  email: string,
  password: string,
}

export interface LoanType {
  productType?: 'PurchaseOrder' | 'InvoiceFinancing',
  loanAmount: number,
  terms?: 3 | 6 | 12 | 24,
  documents: string,
  _id?: string
  createdAt?: string;
}

export interface interestRateType {
  InvoiceFinancing: number;
  PurchaseOrder: number;
}
