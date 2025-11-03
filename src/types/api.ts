export type TransactionType = "INCOME" | "EXPENSE" | "INVESTMENT";

export interface Transaction {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: TransactionType;
}

export interface TransactionRequest {
  amount: number;
  category: string;
  description: string;
  date: string;
  type: TransactionType;
}

export interface Budget {
  id: number;
  category: string;
  limitAmount: number;
  spentAmount: number;
  startDate: string;
  endDate: string;
}

export interface BudgetRequest {
  category: string;
  limitAmount: number;
  startDate: string;
  endDate: string;
}

export interface Investment {
  id: number;
  ticker: string;
  amountInvested: number;
  currentValue: number;
  roi: number;
  category: string;
  platform: string;
  investmentDate: string;
}

export interface InvestmentRequest {
  ticker: string;
  amountInvested: number;
  currentValue: number;
  investmentDate: string;
  category: string;
  platform: string;
  startDate: string;
  endDate: string;
}

export interface MonthlyHistory {
  id: number;
  month: string;
  totalIncome: number;
  totalExpenses: number;
  totalInvestments: number;
  balance: number;
}
