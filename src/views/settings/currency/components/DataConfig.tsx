import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { actionsColumn, TitleAndSubtitle, dateColumn, labelColumn } from 'src/components/table/Columns'
import * as yup from 'yup';

export const columns = (actions: any): GridColDef[] => {
  return [
    {
      flex: 0.3,
      minWidth: 300,
      field: 'name',
      headerName: 'Moneda',
      renderCell: (params: GridRenderCellParams) => TitleAndSubtitle(
        params.row.name,
        params.row.description
      )
    },
    {
      flex: 0.3,
      minWidth: 100,
      field: 'code',
      headerName: 'Código',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => labelColumn(params.row.code)
    },
    {
      flex: 0.3,
      minWidth: 100,
      field: 'symbol',
      headerName: 'Simbolo',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => labelColumn(params.row.symbol)
    },
    dateColumn('createdAt'),
    actionsColumn(actions)
  ];
};

export const schema = yup.object().shape({
  name: yup.string().required('El nombre es requerido').min(5),
  code: yup.string().required('El codigo es requerido'),
  symbol: yup.string().required('El simbolo es requerido'),
});

export const defaultValues = {
  id: 0,
  name: '',
  code: '',
  symbol: '',
};

// Data de ejemplo
export const dataInvoice = [
  {
    id: 1,
    name: 'Nombre de la moneda',
    code: 'slug-currency',
    symbol: 'symbol-currency',
  }
];
