import { ICommonExpenseDebt } from "@/interfaces/model/SaveCommonExpensesDebt";

export interface IUseSaveCommonExpenseDebtStart {
  handleSaveCommonExpenseDebtStart: (
    data: ICommonExpenseDebt,
    isNew: boolean,
  ) => void;
  isLoadingSaveCommonExpenseDebtStart: boolean;
  statusSaveCommonExpenseDebtStart: string | null;
}
