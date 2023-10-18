"use client";

import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

type TCommonExpensesDebtProps = {
  rows: GridRowsProp;
  columns: GridColDef[];
};
const CommonExpensesDebt = ({ rows, columns }: TCommonExpensesDebtProps) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  );
};

export default CommonExpensesDebt;
