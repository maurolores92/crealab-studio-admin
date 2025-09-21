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
      renderCell: (params: GridRenderCellParams) => TitleColumn(`${params.row.name} ${params.row.lastName}`)
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

export const defaultValues = {
  name: '',
  lastName: '',
  username: '',
  password: '',
  repeatPassword: '',
  email: '',
  phone: '',
  photo: '',
  roleId: '',
};

export const schema = yup.object().shape({
  name: yup.string().required('Nombre requerido'),
  lastName: yup.string().required('Apellido requerido'),
  username: yup.string().required('Usuario requerido'),
  password: yup.string().when('$isEdit', (isEdit, schema) =>
    isEdit ? schema : schema.required('Contraseña requerida')
  ),
  repeatPassword: yup.string().when('$isEdit', (isEdit, schema) =>
    isEdit
      ? schema
      : schema.oneOf([yup.ref('password'), ''], 'Las contraseñas deben coincidir').required('Repetir contraseña es obligatorio')
  ),
  email: yup.string().email('Email inválido').required('Email requerido'),
  phone: yup.string(),
  roleId: yup.string().required('Rol requerido'),
});
