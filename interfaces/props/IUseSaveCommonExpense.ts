import { ISaveCommonExpenses } from "@/interfaces/model/SaveCommonExpenses";

export interface IUseSaveCommonExpense {
  handleSaveCommonExpense: (
    commonExpenses: ISaveCommonExpenses,
    isNew: boolean,
  ) => void;
  isLoadingSaveCommonExpense: boolean;
  statusSaveCommonExpense: string | null;
}
