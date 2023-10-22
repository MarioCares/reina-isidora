export interface ICommonExpenseDebtDetail {
  month: number;
  debtAmount: number;
}

export interface ICommonExpenseDebt {
  number: number;
  year: number;
  detail: ICommonExpenseDebtDetail[];
}

export interface IUseSaveCommonExpenseDebtStart {
  handleSaveCommonExpenseDebtStart: (data: ICommonExpenseDebt) => void;
  isLoadingSaveCommonExpenseDebtStart: boolean;
  statusSaveCommonExpenseDebtStart: string | null;
}
