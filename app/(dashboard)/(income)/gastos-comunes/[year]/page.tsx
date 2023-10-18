import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Container } from "@mui/material";
import {
  CommonExpenses,
  TcommonExpensesByYear,
} from "@/utils/constants/querys/CommonExpenses";
import CommonExpensesGrid from "@/components/income/commonExpenses/CommonExpensesGrid";

export const revalidate: number = 10;

export default async function CommonExpensesYearlyPage({
  params,
}: {
  params: { year: number };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  } else {
    const apartments: TcommonExpensesByYear[] =
      await CommonExpenses.getCommonExpensesByYear(params.year);
    console.log("apartments", apartments);

    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CommonExpensesGrid />
      </Container>
    );
  }
}
