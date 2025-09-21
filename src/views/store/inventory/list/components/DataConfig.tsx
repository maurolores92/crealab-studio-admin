import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { actionsColumn, dateColumn, colorCircleColumn } from 'src/components/table/Columns'
import * as yup from 'yup';

export const ProductStatusColor = {
  draft: 'warning',
  published: 'success',
  disabled: 'error',
}

export const columns = (actions: any): GridColDef[] => {

  return [
    {
      flex: 0.2,
      minWidth: 150,
      field: 'name',
      headerName: 'Nombre',
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'type',
      headerName: 'Tipo',
    },
    {
      flex: 0.12,
      minWidth: 100,
      field: 'color',
      headerName: 'Color',
      renderCell: colorCircleColumn,
    },
    {
      flex: 0.12,
      minWidth: 100,
      field: 'stock',
      headerName: 'Stock',
      align: 'center',
      headerAlign: 'center',
    },
    {
      flex: 0.18,
      minWidth: 140,
      field: 'supplier',
      headerName: 'Proveedor',
    },
    {
      flex: 0.18,
      minWidth: 140,
      field: 'dateLastPurchase',
      headerName: 'Última compra',
      renderCell: (params: GridRenderCellParams) => dateColumn('dateLastPurchase').renderCell!(params),
    },
    actionsColumn(actions)
  ]
}

export const schema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  type: yup.string().required('El tipo es requerido'),
  color: yup.string().nullable(),
  unit: yup.string().nullable(),
  supplier: yup.string().nullable(),
  dateLastPurchase: yup.date().nullable(),

})

export const defaultValues = {
  name: null,
  type: null,
  color: null,
  unit: null,
  stock: null,
  supplier: null,
  dateLastPurchase: null,
}
