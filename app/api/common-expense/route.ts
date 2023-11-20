import { NextResponse } from "next/server";
import { getErrorMessage } from "@/utils/Errors";
import { prisma } from "@/lib/prisma";
import { common } from "@mui/material/colors";

export async function POST(req: Request) {
  try {
    const commonExpense = await req.json();

    const apartment = await prisma.apartment.findFirst({
      where: {
        number: Number(commonExpense.apartment),
      },
    });
    const data = {
      ...commonExpense,
      apartment: {
        connect: {
          id: apartment ? apartment.id : 0,
        },
      },
      registerBy: {
        connect: {
          id: commonExpense.registerBy,
        },
      },
    };
    const newCommonExpense = await prisma.commonExpenses.create({
      data,
    });
    return new NextResponse(JSON.stringify(newCommonExpense), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
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
