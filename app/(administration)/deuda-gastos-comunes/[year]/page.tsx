import CommonExpensesDebt from "@/components/commonExpensesDebt/CommonExpensesDebt";
import { prisma } from "@/lib/prisma";
import { Container } from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";

export const revalidate: number = 10;

export default async function CommonExpensesDebtYearPage({
  params,
}: {
  params: { year: number };
}) {
  console.log("params", params);
  const apartments = await prisma.apartment.findMany({
    include: {
      commonExpensesDebt: true,
    },
  });

  const totalDebt = apartments.reduce(
    (amount, apartment) =>
      amount +
      apartment.commonExpensesDebt.reduce(
        (innerAmount, item) => innerAmount + item.debtAmount!,
        0,
      ),
    0,
  );
  console.log("totalDebt", totalDebt);

  const totalQuota = apartments.reduce(
    (amount, apartment) => amount + apartment.commonExpensesDebt[0].debtAmount!,
    0,
  );
  console.log("totalQuota", totalQuota);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Departamento",
      type: "number",
    },
    {
      field: "debt",
      headerName: "Deuda",
    },
    {
      field: "payment",
      headerName: "Abono",
    },
    {
      field: "actions",
      headerName: "-",
    },
  ];

  const rows: GridRowsProp = [
    { id: 41, debt: 1000, payment: 35, actions: "" },
    { id: 108, debt: 2000, payment: 45, actions: "" },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <CommonExpensesDebt rows={rows} columns={columns} />
    </Container>
  );
}
