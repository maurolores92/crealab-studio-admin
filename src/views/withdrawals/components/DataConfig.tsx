import { formatPrice } from 'src/configs/constants';
import * as yup from 'yup';

export const columns = (actions: any) => [
  {
    field: 'user',
    headerName: 'Usuario',
    flex: 1,
    valueGetter: (params: any) => {
      const user = params.row.user;

      return user ? `${user.name} ${user.lastName}` : '';
    }
  },
  {
    field: 'amount',
    headerName: 'Monto',
    flex: 1,
    type: 'number',
    valueFormatter: (params: any) => `$${formatPrice(params.value)}`
  },
  {
    field: 'date',
    headerName: 'Fecha',
    flex: 1,
    valueFormatter: (params: any) => new Date(params.value).toLocaleDateString()
  },
  {
    field: 'description',
    headerName: 'Descripción',
    flex: 2
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    flex: 1,
    renderCell: (params: any) => actions(params.row)
  }
];
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
  photo: yup.string(),
  roleId: yup.string().required('Rol requerido'),
});
