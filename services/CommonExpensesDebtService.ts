import { Client } from "@/utils/Client";
import { ICommonExpenseDebt } from "@/interfaces/SaveCommonExpensesDebt";

const Save = (data: ICommonExpenseDebt) =>
  Client("/api/common-expense-debt", {
    method: "POST",
    body: data,
    headers: {},
  });

export const CommonExpensesDebtService = {
  Save,
};
