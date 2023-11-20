export interface ICommonExpenseDebtDetail {
  month: number;
  debtAmount: number;
}

export interface ICommonExpenseDebt {
  number: number;
  year: number;
  detail: ICommonExpenseDebtDetail[];
}
