import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Container } from "@mui/material";
import {
  CommonExpenses,
  TcommonExpensesByYear,
} from "@/utils/constants/querys/CommonExpenses";
import CommonExpensesGrid from "@/components/income/commonExpenses/CommonExpensesGrid";
import { prisma } from "@/lib/prisma";

export const revalidate: number = 0;

export default async function CommonExpensesYearlyPage({
  params,
}: {
  params: { year: number };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  } else {
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

    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CommonExpensesGrid
          year={params.year}
          commonExpensesByYear={withTotals}
        />
      </Container>
    );
  }
}
