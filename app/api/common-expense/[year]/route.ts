import { NextRequest, NextResponse } from "next/server";
import {
  CommonExpenses,
  TcommonExpensesByYear,
} from "@/utils/constants/querys/CommonExpenses";

export async function GET(
  request: NextRequest,
  { params }: { params: { year: number } },
) {
  const commonExpensesByYear: TcommonExpensesByYear[] =
    await CommonExpenses.getCommonExpensesByYear(params.year);
  const commonExpensesDebtByYear =
    await CommonExpenses.getCommonExpensesDebtByYear(Number(params.year));

  const withTotals = commonExpensesByYear.map(
    (apartment: TcommonExpensesByYear) => {
      return {
        ...apartment,
        totalPay: Object.keys(apartment).reduce((suma, key) => {
          if (key !== "number") {
            suma += Number(apartment[key]) ?? 0;
          }
          return suma;
        }, 0),
        totalDebt: commonExpensesDebtByYear.find(
          (tmp: { [key: string]: number }) => tmp.number === apartment.number,
        )!["total"],
      };
    },
  );

  return NextResponse.json(withTotals);
}
