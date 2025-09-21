import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { actionsColumn, TitleAndSubtitle, dateColumn, EmailAndPhoneColumn } from 'src/components/table/Columns';
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
      renderCell: (params: GridRenderCellParams) => TitleAndSubtitle(
        `${params.row.name} ${params.row.lastName}`,
         `${params.row.documentType}: ${params.row.document}`
      )
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

    dateColumn('createdAt'),
    actionsColumn(actions)
  ];
};

export const schema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  lastName: yup.string().required('El apellido es requerido'),
  document: yup.string().nullable().matches(/[0-9]/, 'Debe ser sólo números'),
  email: yup.string().nullable().email('Debe ser un email'),
  phone: yup.string().nullable().matches(/[0-9]/, 'Debe ser sólo números'),
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

