"use client";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { MONTHS } from "@/utils/constants/general/months";
import { TcommonExpensesByYear } from "@/utils/constants/querys/CommonExpenses";
import Link from "next/link";
import Button from "@mui/material/Button";
import AddCardIcon from "@mui/icons-material/AddCard";
import { TSimpleKeyValueNumber } from "@/interfaces/TSimpleKeyValue";

const CommonExpensesGrid = ({
  commonExpensesByYear,
  year,
}: {
  commonExpensesByYear: TcommonExpensesByYear[];
  year: number;
}) => {
  const rows: GridRowsProp = commonExpensesByYear;

  const columns: GridColDef[] = [
    {
      field: "number",
      headerName: "Departamento",
      width: 150,
      renderCell: ({ row }: { row: TSimpleKeyValueNumber }) => (
        <Link href={`/gastos-comunes/${year}/${row.number}`} passHref>
          <Button variant="contained" color="secondary">
            {row.number}
          </Button>
        </Link>
      ),
    },
    ...MONTHS.map((month) => ({
      field: month.toLowerCase(),
      headerName: month,
      renderCell: ({ row }: { row: TSimpleKeyValueNumber }) => (
        <>
          {row[month.toLowerCase()] ? (
            `$ ${row[month.toLowerCase()].toLocaleString("de-DE")}`
          ) : (
            <Link
              href={`/gastos-comunes/${year}/${row.number}/${month}`}
              passHref
            >
              <Button variant="contained" color="primary">
                <AddCardIcon />
              </Button>
            </Link>
          )}
        </>
      ),
    })),
    {
      field: "totalPay",
      headerName: "Abonado",
      renderCell: ({ row }: { row: TSimpleKeyValueNumber }) =>
        `$ ${row.totalPay.toLocaleString("de-DE")}`,
    },
    {
      field: "totalDebt",
      headerName: "Deuda Anual",
      renderCell: ({ row }: { row: TSimpleKeyValueNumber }) =>
        `$ ${row.totalDebt.toLocaleString("de-DE")}`,
    },
    {
      field: "toPay",
      headerName: "Saldo Pendiente",
      renderCell: ({ row }: { row: TSimpleKeyValueNumber }) =>
        `$ ${(Number(row.totalDebt) - Number(row.totalPay)).toLocaleString(
          "de-DE",
        )}`,
    },
  ];

  return (
    <DataGrid
      autoHeight={true}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10, 25, 50, 100]}
      getRowId={(row) => row.number}
      rows={rows}
      columns={columns}
    />
  );
};
export default CommonExpensesGrid;
