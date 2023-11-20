import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Container from "@mui/material/Container";
import { prisma } from "@/lib/prisma";
import { MONTHS2NUMBER } from "@/utils/constants/general/months";
import CommonExpenses from "@/components/commonExpenses/CommonExpenses";

export const revalidate: number = 10;

export default async function CommonExpensesYearByApartment({
  params,
}: {
  params: { year: number; apartment: number; month: string };
}) {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  } else {
    const number = Number(params.apartment);
    const referenceMonth = new Date(
      `${params.year}-${MONTHS2NUMBER[params.month.toLowerCase()]}-01`,
    );
    const commonExpenses = await prisma.commonExpenses.findFirst({
      where: {
        referenceMonth,
        apartment: {
          number,
        },
      },
      include: {
        apartment: true,
      },
    });

    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CommonExpenses
          commonExpenses={commonExpenses ?? undefined}
          apartment={number}
          referenceMonth={referenceMonth}
        />
      </Container>
    );
  }
}
