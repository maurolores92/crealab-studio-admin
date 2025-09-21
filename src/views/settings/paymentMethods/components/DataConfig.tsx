import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { actionsColumn, TitleAndSubtitle, dateColumn, labelColumn } from 'src/components/table/Columns'
import * as yup from 'yup';

export const columns = (actions: any): GridColDef[] => {
  return [
    {
      flex: 0.3,
      minWidth: 300,
      field: 'name',
      headerName: 'Metodo de pago',
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
    dateColumn('createdAt'),
    actionsColumn(actions)
  ];
};

export const schema = yup.object().shape({
  name: yup.string().required('El nombre es requerido').min(5),
  slug: yup.string().required('El slug es requerido'),
});

export const defaultValues = {
  id: 0,
  name: '',
  slug: '',
};

// Data de ejemplo
export const dataInvoice = [
  {
    id: 1,
    name: 'Nombre del metodo de pago',
    slug: 'slug-paymentMethod',
  }
];
