import { NextResponse } from "next/server";
import { getErrorMessage } from "@/utils/Errors";
import {
  ICommonExpenseDebt,
  ICommonExpenseDebtDetail,
} from "@/interfaces/SaveCommonExpensesDebt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { number, year, detail } = (await req.json()) as ICommonExpenseDebt;
    const apartment = await prisma.apartment.findFirst({
      where: {
        number: Number(number),
      },
    });

    const data = detail.map((internalDetail: ICommonExpenseDebtDetail) => ({
      apartmentId: apartment ? apartment.id : 0,
      year: Number(year),
      month: internalDetail.month,
      debtAmount: internalDetail.debtAmount,
    }));

    const commonExpensesDebt = await prisma.commonExpensesDebt.createMany({
      data,
    });

    return NextResponse.json(commonExpensesDebt);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: getErrorMessage(error),
      }),
      { status: 500 },
    );
  }
}
