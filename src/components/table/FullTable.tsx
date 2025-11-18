import { DataGrid, esES } from "@mui/x-data-grid";

const FullTable = ({
  data,
  columns,
  paginationModel,
  rowSelected,
  setRowSelected,
  setPagination,
  checkboxSelection = true,
  py = 0.5,
}: any) => {

  return  <DataGrid
  autoHeight
  localeText={esES.components.MuiDataGrid.defaultProps.localeText}
  rows={paginationModel ? data.data: data}
  getRowHeight={() => 'auto'}
  rowCount={paginationModel ? data.totalRecords: undefined}
  columns={columns}
  checkboxSelection = {checkboxSelection}
  disableRowSelectionOnClick
  paginationMode='server'
  paginationModel={paginationModel}
  pageSizeOptions={[7, 10, 25, 50, 100]}
  onPaginationModelChange={setPagination}
  rowSelectionModel={rowSelected}
  onRowSelectionModelChange={(newRowSelectionModel) => {
    setRowSelected(newRowSelectionModel);
  }}
  sx={{
    [`& .MuiDataGrid-cell`]: {
      py,
      lineHeight: 'unset !important',
      maxHeight: 'none !important',
      whiteSpace: 'normal',
    },
  }}
  />
};

export default FullTable;
