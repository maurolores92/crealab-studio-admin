import { GridColDef } from '@mui/x-data-grid'
import { actionsColumn } from 'src/components/table/Columns'
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
      field: 'inventory',
      headerName: 'Producto',
      valueGetter: (params) => params.row.inventory?.name || '-',
    },
    {
      flex: 0.15,
      minWidth: 100,
      field: 'quantity',
      headerName: 'Cantidad',
      align: 'right',
      headerAlign: 'right',
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'unitPrice',
      headerName: 'Precio unitario',
      align: 'right',
      headerAlign: 'right',
      valueFormatter: (params) => `$${formatPrice(params.value)}`,
    },
    actionsColumn(actions)
  ]
}

export const schema = yup.object().shape({
  date: yup.date().required('La fecha es requerida'),
  description: yup.string().required('La descripción es requerida'),

})

export const defaultValues = {
  date: null,
  description: null
}
