"use client";

import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Link from "next/link";
import Item from "@/components/ui/Item";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

type TApartmentCommonExpensesDebtListProps = {
  rows: GridRowsProp;
  columnsData: GridColDef[];
  totalDebt: number;
  totalQuota: number;
};

const ApartmentCommonExpensesDebtList = ({
  rows,
  columnsData,
  totalDebt,
  totalQuota,
}: TApartmentCommonExpensesDebtListProps) => {
  const columns = [...columnsData];

  columns.push({
    field: "actions",
    headerName: "Acciones",
    width: 200,
    renderCell: ({ row }) => (
      <Link href={`/deuda-gastos-comunes/${row.actions}`} passHref>
        <Button variant="contained" color="primary">
          {row.commonExpensesDebt === "SIN INICIAR"
            ? "Iniciar Deuda año"
            : "POR REVISAR"}
        </Button>
      </Link>
    ),
  });

  return (
    <>
      <DataGrid
        getRowId={(row) => row.number}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20]}
        disableRowSelectionOnClick
        showCellVerticalBorder
        showColumnVerticalBorder
      />
      <br />
      <Stack direction="row" spacing={2}>
        <Item>
          <Typography variant="h3">
            Total Deuda Anual: {totalDebt.toLocaleString("de-DE")}
          </Typography>
        </Item>
        <Item>
          <Typography variant="h3">
            Total Deuda Mes: {totalQuota.toLocaleString("de-DE")}
          </Typography>
        </Item>
      </Stack>
    </>
  );
};

export default ApartmentCommonExpensesDebtList;
