import {
  Transaction,
  TransactionRequest,
  Budget,
  BudgetRequest,
  Investment,
  InvestmentRequest,
  MonthlyHistory,
} from "@/types/api";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP error! status: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

// Transactions
export const transactionsApi = {
  getAll: (): Promise<Transaction[]> =>
    fetch(`${API_BASE_URL}/transactions`).then(handleResponse<Transaction[]>),

  create: (data: TransactionRequest): Promise<Transaction> =>
    fetch(`${API_BASE_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse<Transaction>),

  update: (id: number, data: TransactionRequest): Promise<Transaction> =>
    fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse<Transaction>),

  delete: (id: number): Promise<string> =>
    fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: "DELETE",
    }).then(handleResponse<string>),
};

// Budgets
export const budgetsApi = {
  getAll: (): Promise<Budget[]> =>
    fetch(`${API_BASE_URL}/budgets`).then(handleResponse<Budget[]>),

  getById: (id: number): Promise<Budget> =>
    fetch(`${API_BASE_URL}/budgets/${id}`).then(handleResponse<Budget>),

  create: (data: BudgetRequest): Promise<Budget> =>
    fetch(`${API_BASE_URL}/budgets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse<Budget>),

  update: (id: number, data: BudgetRequest): Promise<Budget> =>
    fetch(`${API_BASE_URL}/budgets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse<Budget>),

  delete: (id: number): Promise<string> =>
    fetch(`${API_BASE_URL}/budgets/${id}`, {
      method: "DELETE",
    }).then(handleResponse<string>),

  getProgress: (id: number): Promise<number> =>
    fetch(`${API_BASE_URL}/budgets/${id}/progress`).then(handleResponse<number>),

  getOverLimit: (): Promise<Budget[]> =>
    fetch(`${API_BASE_URL}/budgets/over-limit`).then(handleResponse<Budget[]>),
};

// Investments
export const investmentsApi = {
  getAll: (): Promise<Investment[]> =>
    fetch(`${API_BASE_URL}/investments`).then(handleResponse<Investment[]>),

  getById: (id: number): Promise<Investment> =>
    fetch(`${API_BASE_URL}/investments/${id}`).then(handleResponse<Investment>),

  create: (data: InvestmentRequest): Promise<Investment> =>
    fetch(`${API_BASE_URL}/investments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse<Investment>),

  update: (id: number, data: InvestmentRequest): Promise<Investment> =>
    fetch(`${API_BASE_URL}/investments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse<Investment>),

  delete: (id: number): Promise<string> =>
    fetch(`${API_BASE_URL}/investments/${id}`, {
      method: "DELETE",
    }).then(handleResponse<string>),

  getTotalInvested: (): Promise<number> =>
    fetch(`${API_BASE_URL}/investments/total-invested`).then(handleResponse<number>),

  getTotalCurrent: (): Promise<number> =>
    fetch(`${API_BASE_URL}/investments/total-current`).then(handleResponse<number>),

  getTotalRoi: (): Promise<number> =>
    fetch(`${API_BASE_URL}/investments/total-roi`).then(handleResponse<number>),
};

// Monthly History
export const historyApi = {
  getAll: (): Promise<MonthlyHistory[]> =>
    fetch(`${API_BASE_URL}/history`).then(handleResponse<MonthlyHistory[]>),

  generate: (): Promise<void> =>
    fetch(`${API_BASE_URL}/history/generate`, {
      method: "POST",
    }).then(() => undefined),
};
