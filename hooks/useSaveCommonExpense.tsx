import { ISaveCommonExpenses } from "@/interfaces/model/SaveCommonExpenses";
import { useState } from "react";
import { CommonExpensesService } from "@/services/CommonExpensesService";
import { getErrorMessage } from "@/utils/Errors";
import { IUseSaveCommonExpense } from "@/interfaces/props/IUseSaveCommonExpense";

const useSaveCommonExpense = (): IUseSaveCommonExpense => {
  const [isLoadingSaveCommonExpense, setIsLoadingSaveCommonExpense] =
    useState<boolean>(false);
  const [statusSaveCommonExpense, setStatusSaveCommonExpense] = useState<
    string | null
  >(null);

  const handleSaveCommonExpense = (
    commonExpenses: ISaveCommonExpenses,
    isNew: boolean,
  ) => {
    setIsLoadingSaveCommonExpense(true);
    CommonExpensesService.Save(commonExpenses, isNew)
      .then(() => setStatusSaveCommonExpense("ok"))
      .catch((error) => {
        console.log("Error en CommonExpenseSave", error);
        setStatusSaveCommonExpense(getErrorMessage(error));
      })
      .finally(() => setIsLoadingSaveCommonExpense(false));
  };

  return {
    handleSaveCommonExpense,
    isLoadingSaveCommonExpense,
    statusSaveCommonExpense,
  };
};

export default useSaveCommonExpense;
