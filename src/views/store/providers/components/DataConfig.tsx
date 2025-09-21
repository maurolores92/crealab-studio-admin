import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { actionsColumn, TitleAndSubtitle, dateColumn, labelColumn } from 'src/components/table/Columns'
import * as yup from 'yup';


export const columns = (actions: any): GridColDef[] => {
  return [
    {
      flex: 0.3,
      minWidth: 300,
      field: 'name',
      headerName: 'Proveedor',
      renderCell: (params: GridRenderCellParams) => TitleAndSubtitle(
        params.row.name,
        params.row.email,
        params.row.phone
      )
    },
    {
      flex: 0.3,
      minWidth: 100,
      field: 'slug',
      headerName: 'Código',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => labelColumn(params.row.slug)
    },
    {
      flex: 0.3,
      minWidth: 80,
      field: 'status',
      headerName: 'Estatus',
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params: any) => params.row.status,
    },
    dateColumn('createdAt'),
    actionsColumn(actions)
  ]
}

export const schema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  email: yup.string().required('El email es requerido').email('El email no es válido'),
  phone: yup.string().required('El teléfono es requerido'),
  slug: yup.string().required('El slug es requerido'),
  note: yup.string().nullable(),
})

export const defaultValues = {
  name: null,
  slug: null,
  email: null,
  phone: null,
  note: null,
  status: 'draft',
}

