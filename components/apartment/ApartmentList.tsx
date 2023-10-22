"use client";

import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

type TApartmentListProps = {
  rows: GridRowsProp;
  columns: GridColDef[];
};

const ApartmentList = ({ rows, columns }: TApartmentListProps) => {
  return (
    <DataGrid
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
      checkboxSelection
      disableRowSelectionOnClick
    />
  );
};

export default ApartmentList;
