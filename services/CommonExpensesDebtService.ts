import { Client } from "@/utils/Client";
import { ICommonExpenseDebt } from "@/interfaces/model/SaveCommonExpensesDebt";

const Save = (data: ICommonExpenseDebt, isNew: boolean) =>
  Client("/api/common-expense-debt", {
    method: isNew ? "POST" : "PUT",
    body: data,
    headers: {},
  });

export const CommonExpensesDebtService = {
  Save,
};
