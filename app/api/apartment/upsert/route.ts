import { NextResponse } from "next/server";
import { getErrorMessage } from "@/utils/Errors";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { id, number, prorating } = (await req.json()) as {
      id: number;
      number: number;
      prorating: number;
    };
    const data = { number, prorating };

    const apartment =
      id === 0
        ? await prisma.apartment.create({
            data,
          })
        : await prisma.apartment.update({
            where: {
              id,
            },
            data,
          });

    return NextResponse.json(apartment);
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
