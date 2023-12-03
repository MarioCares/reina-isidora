import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Container } from "@mui/material";
import CommonExpensesGrid from "@/components/income/commonExpenses/CommonExpensesGrid";
import { TcommonExpensesByYear } from "@/utils/constants/querys/CommonExpenses";

export const revalidate: number = 0;

const getWithTotals = async (
  year: number,
): Promise<TcommonExpensesByYear[]> => {
  const data = await fetch(`http://localhost:3000/api/common-expense/${year}`, {
    next: {
      revalidate: 0,
    },
  });
  return await data.json();
};

export default async function CommonExpensesYearlyPage({
  params,
}: {
  params: { year: number };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  } else {
    const withTotals = await getWithTotals(Number(params.year));
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <CommonExpensesGrid
          year={params.year}
          commonExpensesByYear={withTotals}
        />
      </Container>
    );
  }
}
