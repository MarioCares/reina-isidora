import { prisma } from "@/lib/prisma";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import CommonExpensesDebtStart from "@/components/commonExpensesDebt/CommonExpensesDebtStart";

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
    const debt = await prisma.commonExpensesDebt.findFirst({
      where: {
        year: Number(params.year),
        apartmentId: apartment ? apartment.id : 0,
      },
    });

    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {debt ? (
          <h1>Iniciamos año</h1>
        ) : (
          <CommonExpensesDebtStart
            year={params.year}
            number={params.apartment}
          />
        )}
      </Container>
    );
  }
}
