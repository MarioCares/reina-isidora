import {
  IMonthsObject,
  IMonthsObjectDetail,
  MONTHS,
  MONTHS2NUMBER,
} from "@/utils/constants/general/months";
import { ICommonExpenseDebtDetail } from "@/interfaces/SaveCommonExpensesDebt";

export const validate = (values: IMonthsObject) => {
  const errors: Partial<IMonthsObjectDetail> = {};

  const validateMonth = (month: string, value: number) => {
    if (!value) {
      errors[month] = "Requerido";
    } else if (value <= 10000) {
      errors[month] = "El monto debe ser mayor a 10.000";
    }
  };

  MONTHS.map((month) =>
    validateMonth(month.toLowerCase(), values[month.toLowerCase()]),
  );

  return errors;
};

export const convertToICommonExpenseDebtDetail = (
  values: IMonthsObject,
): ICommonExpenseDebtDetail[] =>
  Object.keys(values).map((key) => ({
    month: MONTHS2NUMBER[key],
    debtAmount: values[key],
  }));
