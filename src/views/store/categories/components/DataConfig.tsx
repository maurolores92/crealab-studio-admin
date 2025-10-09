import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { actionsColumn, labelColumn } from 'src/components/table/Columns'
import * as yup from 'yup';


export const columns = (actions: any): GridColDef[] => {
  return [
    {
      flex: 0.4,
      minWidth: 220,
      field: 'name',
      headerName: 'Nombre',
      renderCell: (params: GridRenderCellParams) => params.row.name
    },
    {
      flex: 0.4,
      minWidth: 220,
      field: 'description',
      headerName: 'Descripción',
      renderCell: (params: GridRenderCellParams) => params.row.description
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'slug',
      headerName: 'Slug',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => labelColumn(params.row.slug)
    },
    actionsColumn(actions)
  ];
}

export const schema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
})

export const defaultValues = {
  name: null,
}
