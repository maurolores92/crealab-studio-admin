import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { actionsColumn, TitleAndSubtitle, dateColumn, labelColumn } from 'src/components/table/Columns'
import * as yup from 'yup';


export const columns = (actions: any): GridColDef[] => {

  return [
    {
      flex: 0.3,
      minWidth: 300,
      field: 'name',
      headerName: 'Categoría',
      renderCell: (params: GridRenderCellParams) => TitleAndSubtitle(
        params.row.name,
        params.row.description
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
      field: 'quantityProducts',
      headerName: 'Productos',
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params: any) => params.row.products?.length,
    },
   
    dateColumn('createdAt'),
    actionsColumn(actions)
  ]
}

export const schema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
})

export const defaultValues = {
  name: null,
}
