import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { actionsColumn, dateColumn, EmailAndPhoneColumn, TitleColumn } from 'src/components/table/Columns';
import * as yup from 'yup';

export const columns = (actions: any,): GridColDef[] => {
  return [
    {
      flex: 0.1,
      minWidth: 70,
      field: 'id',
      headerName: 'ID',
    },
    {
      flex: 0.3,
      minWidth: 300,
      field: 'name',
      headerName: 'Nombre',
      renderCell: (params: GridRenderCellParams) => TitleColumn(`${params.row.name} ${params.row.lastName}`,)
    },
    {
      flex: 0.3,
      minWidth: 200,
      field: 'document',
      headerName: 'Documento',
      renderCell: (params: GridRenderCellParams) => {
        const document = params.row.document;
        if (!document || document.trim() === '') {
          return TitleColumn('-');
        }

        return TitleColumn(`${params.row.documentType}: ${document}`);
      }
    },
    {
      flex: 0.3,
      minWidth: 100,
      field: 'phone',
      headerName: 'Email/Teléfono',
      align: 'left',
      headerAlign: 'left',
      renderCell: (params: GridRenderCellParams) => EmailAndPhoneColumn(params)
    },
    {
      flex: 0.25,
      minWidth: 250,
      field: 'notes',
      headerName: 'Notas',
    },

    dateColumn('createdAt'),
    actionsColumn(actions)
  ];
};

export const schema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  lastName: yup.string().nullable(),
  document: yup.string().nullable(),
  email: yup.string().nullable().email('Debe ser un email'),
  phone: yup.string().nullable(),
  address: yup.object().shape({
    provinceId: yup.number().nullable(),
    city: yup.string().nullable(),
    address: yup.string().nullable(),
    postalCode: yup.string().nullable(),
  })
});

export const defaultValues = {
  id: 0,
  name: '',
  lastName:'',
  documentType: 'DNI',
  document:'',
  email:'',
  phone:'',
  address: {
    provinceId: null,
    city: '',
    address: '',
    postalCode: '',
  }
};

