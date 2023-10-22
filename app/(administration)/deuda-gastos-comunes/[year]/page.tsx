import { prisma } from "@/lib/prisma";
import { Container } from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import ApartmentCommonExpensesDebtList from "@/components/apartment/ApartmentCommonExpensesDebtList";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const revalidate: number = 10;

export default async function CommonExpensesDebtYearPage({
  params,
}: {
  params: { year: number };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  } else {
    const apartments = await prisma.apartment.findMany({
      include: {
        commonExpensesDebt: {
          where: {
            year: Number(params.year),
          },
        },
      },
    });

    const totalDebt = apartments.reduce(
      (amount, apartment) =>
        amount +
        apartment.commonExpensesDebt.reduce(
          (innerAmount, item) => innerAmount + (item.debtAmount ?? 0),
          0,
        ),
      0,
    );
    const totalQuota = apartments.reduce(
      (amount, apartment) =>
        amount +
        (apartment.commonExpensesDebt.length > 0
          ? apartment.commonExpensesDebt[0].debtAmount ?? 0
          : 0),
      0,
    );

    const columns: GridColDef[] = [
      {
        field: "number",
        headerName: "Número",
      },
      {
        field: "commonExpensesDebtYear",
        headerName: "Deuda Anual",
        width: 150,
        type: "number",
      },
      {
        field: "commonExpensesDebt",
        headerName: "Cuota Mensual",
        width: 150,
        type: "number",
      },
      {
        field: "payment",
        headerName: "Abonado",
        width: 150,
        type: "number",
      },
    ];

    const rows: GridRowsProp = apartments.map((apartment) => {
      const debt: number = apartment.commonExpensesDebt.reduce(
        (amount, item) => amount + (item.debtAmount ?? 0),
        0,
      );

      const quota =
        apartment.commonExpensesDebt.length > 0
          ? apartment.commonExpensesDebt[0].debtAmount ?? 0
          : 0;
      return {
        number: apartment.number,
        commonExpensesDebtYear:
          debt > 0 ? debt.toLocaleString("de-DE") : "SIN INICIAR",
        commonExpensesDebt:
          quota === 0 ? "SIN INICIAR" : quota.toLocaleString("de-DE"),
        payment: 0,
        actions: `${params.year}/${apartment.number}`,
      };
    });

    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <ApartmentCommonExpensesDebtList
          rows={rows}
          columnsData={columns}
          totalDebt={totalDebt}
          totalQuota={totalQuota}
        />
      </Container>
    );
  }
}
