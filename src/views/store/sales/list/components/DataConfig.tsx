import { DateTime } from 'luxon';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { actionsColumn, dateColumn, labelColumn, price, TitleAndSubtitle, TitleColumn } from 'src/components/table/Columns'

import * as yup from 'yup';

export const columnsItems = (actions: any) => [
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
  },

  actionsColumn(actions, 90),
];

export const columns = (actions: any): GridColDef[] => {
  return [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'id',
      headerName: '#Orden',
    },
    {
      flex: 0.3,
      minWidth: 260,
      field: 'client',
      headerName: 'Cliente',
      align: 'left',
      headerAlign: 'left',
      renderCell: (params: GridRenderCellParams) => TitleColumn(`${params.row.client.name} ${params.row.client.lastName}`)
    },
    {
      flex: 0.3,
      minWidth: 80,
      field: 'date',
      headerName: 'Fecha',
      align: 'left',
      headerAlign: 'left',
      valueGetter: (params: any) => params.row.orderDate,
    },
    {
      flex: 0.3,
      minWidth: 80,
      field: 'products',
      headerName: 'Productos',
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params: any) => params.row.items?.length,
    },
    {
      flex: 0.3,
      minWidth: 90,
      field: 'total',
      headerName: 'Total',
      align: 'left',
      headerAlign: 'left',
      renderCell: (params: GridRenderCellParams) => price(params.row.totalAmount)
    },

    {
      flex: 0.3,
      minWidth: 110,
      field: 'status',
      headerName: 'Estatus',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => labelColumn(params.row.status.name, params.row.status.color)
    },
    dateColumn('createdAt', 140),
    actionsColumn(actions)
  ]
}

export const schema = yup.object().shape({
  clientId: yup.number().required('El cliente es requerido'),
  orderDate: yup.string().required('La fecha es requerida'),
})

export const defaultValues = {
  clientId: null,
  status: 'draft',
  orderDate: DateTime.now().toFormat('yyyy-MM-dd')
}


