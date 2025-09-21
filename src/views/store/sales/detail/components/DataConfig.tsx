import { GridRenderCellParams } from '@mui/x-data-grid'
import { labelColumn, price, TitleAndSubtitle } from 'src/components/table/Columns'


export const columnsItems = () => [
  {
    flex: 0.1,
    minWidth: 60,
    field: 'id',
    headerName: 'ID',
    align: 'left',
    headerAlign: 'left',
  },
  {
    flex: 0.3,
    minWidth: 200,
    field: 'sku',
    headerName: 'Producto',
    align: 'left',
    headerAlign: 'left',
    renderCell: (params: GridRenderCellParams) => TitleAndSubtitle(
      `${params.row.description} `,
      params.row.sku
    )
  },
  {
    flex: 0.3,
    minWidth: 90,
    field: 'finalPrice',
    headerName: 'Precio',
    align: 'left',
    headerAlign: 'left',
    renderCell: (params: GridRenderCellParams) => price(params.row.finalPrice)
  },
  {
    flex: 0.3,
    minWidth: 90,
    field: 'quantity',
    headerName: 'Cantidad',
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: GridRenderCellParams) => labelColumn(params.row.quantity)
  },
  {
    flex: 0.3,
    minWidth: 90,
    field: 'total',
    headerName: 'Total',
    align: 'left',
    headerAlign: 'left',
    renderCell: (params: GridRenderCellParams) => price(params.row.total)
  }
];


