import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { actionsColumn, TitleAndSubtitle, dateColumn, labelColumn } from 'src/components/table/Columns'
import * as yup from 'yup';

export const columns = (actions: any): GridColDef[] => {
  return [
    {
      flex: 0.3,
      minWidth: 300,
      field: 'name',
      headerName: 'Marca',
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
      minWidth: 100,
      field: 'companyId',
      headerName: 'Compañia',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => labelColumn(params.row.company.name)
    },
    dateColumn('createdAt'),
    actionsColumn(actions)
  ];
};

export const schema = yup.object().shape({
  name: yup.string().required('El nombre es requerido').min(5),
  slug: yup.string().required('El slug es requerido'),
  description: yup.string().nullable(),
});

export const defaultValues = {
  id: 0,
  name: '',
  slug: '',
  description: '',
};

// Data de ejemplo
export const dataInvoice = [
  {
    id: 1,
    name: 'Nombre de la Marca',
    slug: 'slug-marca',
    description: 'Descripción de la Marca',
  }
];
