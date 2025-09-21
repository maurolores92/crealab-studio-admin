import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { actionsColumn, dateColumn } from 'src/components/table/Columns'
import { formatPrice } from 'src/configs/constants';
import * as yup from 'yup';

export const ProductStatusColor = {
  draft: 'warning',
  published: 'success',
  disabled: 'error',
}

export const columns = (actions: any): GridColDef[] => {

  return [

    {
      flex: 0.25,
      minWidth: 180,
      field: 'description',
      headerName: 'Descripción',
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'amountTotal',
      headerName: 'Monto total',
      align: 'right',
      headerAlign: 'right',
      valueFormatter: (params) => `$${formatPrice(params.value)}`,
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'itemsCount',
      headerName: 'Productos',
      valueGetter: (params) => params.row.items?.length || 0,
      align: 'center',
      headerAlign: 'center',
    },
    {
      flex: 0.15,
      minWidth: 140,
      field: 'performedBy',
      headerName: 'Quien gasto',
      valueGetter: (params) => `${params.row.performedBy?.name || ''} ${params.row.performedBy?.lastName || ''}`,
    },
    {
      flex: 0.15,
      minWidth: 140,
      field: 'user',
      headerName: 'Usuario',
      valueGetter: (params) => `${params.row.user?.name || ''} ${params.row.user?.lastName || ''}`,
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'date',
      headerName: 'Fecha',
      renderCell: (params: GridRenderCellParams) => dateColumn('date').renderCell!(params),
    },
    actionsColumn(actions)
  ]
}

export const schema = yup.object().shape({
  date: yup.date().required('La fecha es requerida'),
  description: yup.string().nullable(),

})

export const defaultValues = {
  date: null,
  description: null
}
