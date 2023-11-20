import { CommonExpenses, PaymentType } from "@prisma/client";

export interface ICommonExpensesFormik {
  paymentAt: string;
  apartment: number;
  payBy: string;
  referenceMonth: string;
  paymentAmount: number;
  paymentType: PaymentType;
  registerBy: string;
  bank: string;
  checkNumber: string;
  receipt: number;
  observation: string;
}

export const getInitialValues = (
  commonExpenses?: CommonExpenses,
  apartment?: number,
  referenceMonth?: Date,
): ICommonExpensesFormik => {
  const defaultValues: ICommonExpensesFormik = {
    paymentAt: new Date().toJSON().slice(0, 10),
    apartment: apartment ?? 11,
    payBy: "",
    referenceMonth: referenceMonth
      ? referenceMonth.toJSON().slice(0, 7)
      : new Date().toJSON().slice(0, 7),
    paymentAmount: 0,
    paymentType: "TRANSFERENCIA",
    registerBy: "",
    bank: "",
    checkNumber: "",
    receipt: 0,
    observation: "",
  };
  if (commonExpenses) {
    return {
      paymentAt: commonExpenses.paymentAt.toJSON().slice(0, 10),
      apartment: commonExpenses.apartmentId,
      payBy: commonExpenses.payBy,
      referenceMonth: commonExpenses.referenceMonth.toJSON().slice(0, 7),
      paymentAmount: commonExpenses.paymentAmount,
      paymentType: commonExpenses.paymentType,
      registerBy: commonExpenses.registerById,
      bank: commonExpenses.bank,
      checkNumber: commonExpenses.checkNumber,
      receipt: commonExpenses.receipt,
      observation: commonExpenses.observation,
    } as ICommonExpensesFormik;
  } else {
    return defaultValues;
  }
};

interface ICommonExpensesFormikError {
  [value: string]: string;
}

export const validate = (values: ICommonExpensesFormik) => {
  const errors: Partial<ICommonExpensesFormikError> = {};

  if (!values.paymentAt) {
    errors.paymentAt = "Requerido";
  }

  if (!values.apartment) {
    errors.apartment = "Requerido";
  } else if (values.apartment < 11 || values.apartment > 220) {
    errors.apartment = "El nº ingresado está fuera de rango";
  }

  if (!values.referenceMonth) {
    errors.referenceMonth = "Requerido";
  }

  if (!values.paymentAmount) {
    errors.paymentAmount = "Requerido";
  } else if (values.paymentAmount < 10000) {
    errors.paymentAmount = "Monto fuera de rango";
  }

  if (!values.registerBy) {
    errors.registerBy = "Requerido";
  }

  if (!values.receipt) {
    errors.receipt = "Requerido";
  } else if (values.receipt < 50000) {
    errors.receipt = "Valor fuera de rango";
  }

  return errors;
};
