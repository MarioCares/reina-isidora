import {
  ICommonExpenseDebt,
  IUseSaveCommonExpenseDebtStart,
} from "@/interfaces/SaveCommonExpensesDebt";
import { useState } from "react";
import { CommonExpensesDebtService } from "@/services/CommonExpensesDebtService";
import { getErrorMessage } from "@/utils/Errors";

const useSaveCommonExpenseDebtStart = (): IUseSaveCommonExpenseDebtStart => {
  const [
    isLoadingSaveCommonExpenseDebtStart,
    setIsLoadingSaveCommonExpenseDebtStart,
  ] = useState<boolean>(false);
  const [
    statusSaveCommonExpenseDebtStart,
    setStatusSaveCommonExpenseDebtStart,
  ] = useState<string | null>(null);

  const handleSaveCommonExpenseDebtStart = async (data: ICommonExpenseDebt) => {
    setIsLoadingSaveCommonExpenseDebtStart(true);
    CommonExpensesDebtService.Save(data)
      .then(() => setStatusSaveCommonExpenseDebtStart("ok"))
      .catch((error) => {
        console.log("Error en CommonExpensesDebtSave", error);
        setStatusSaveCommonExpenseDebtStart(getErrorMessage(error));
      })
      .finally(() => setIsLoadingSaveCommonExpenseDebtStart(false));
  };

  return {
    handleSaveCommonExpenseDebtStart,
    isLoadingSaveCommonExpenseDebtStart,
    statusSaveCommonExpenseDebtStart,
  };
};

export default useSaveCommonExpenseDebtStart;
