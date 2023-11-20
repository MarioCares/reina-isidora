import { PaymentType } from "@prisma/client";

export interface ISaveCommonExpenses {
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
