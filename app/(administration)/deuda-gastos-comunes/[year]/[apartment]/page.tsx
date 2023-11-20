import { prisma } from "@/lib/prisma";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import CommonExpensesDebtStart from "@/components/commonExpensesDebt/CommonExpensesDebtStart";
import { IDebt } from "@/interfaces/model/IDebt";

export const revalidate: number = 10;

export default async function CommonExpensesDebtYearApartmentPage({
  params,
}: {
  params: { year: number; apartment: number };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  } else {
    const apartment = await prisma.apartment.findFirst({
      where: {
        number: Number(params.apartment),
      },
    });
    const debt: IDebt[] | null = await prisma.commonExpensesDebt.findMany({
      where: {
        year: Number(params.year),
        apartmentId: apartment ? apartment.id : 0,
      },
    });

    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CommonExpensesDebtStart
          year={params.year}
          number={params.apartment}
          debt={debt}
        />
      </Container>
    );
  }
}
