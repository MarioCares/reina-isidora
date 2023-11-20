import { Client } from "@/utils/Client";
import { ISaveCommonExpenses } from "@/interfaces/model/SaveCommonExpenses";

const Save = (data: ISaveCommonExpenses, isNew: boolean) =>
  Client("/api/common-expense", {
    method: isNew ? "POST" : "PUT",
    body: data,
    headers: {},
  });

export const CommonExpensesService = {
  Save,
};
