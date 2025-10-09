import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { actionsColumn, TitleAndSubtitle, dateColumn, price } from 'src/components/table/Columns'
import * as yup from 'yup';
import CustomChip from 'src/@core/components/mui/chip';

type ProductStatusConfig = {
  value: string;
  color: 'success' | 'warning' | 'info' | 'secondary' | 'primary' | 'error' | 'default';
  label: string;
};

export const PRODUCT_STATUSES: ProductStatusConfig[] = [
  { value: 'publish', color: 'success', label: 'Publicado' },
  { value: 'draft', color: 'warning', label: 'Borrador' },
  { value: 'pending', color: 'info', label: 'Pendiente de revisión' },
  { value: 'private', color: 'secondary', label: 'Privado' },
  { value: 'future', color: 'primary', label: 'Programado' },
  { value: 'trash', color: 'error', label: 'En papelera' },
  { value: 'disabled', color: 'error', label: 'Deshabilitado' },
];

export type ProductStatus = typeof PRODUCT_STATUSES[number]['value'];

export const ProductStatusColor = PRODUCT_STATUSES.reduce((acc, s) => {
  acc[s.value as ProductStatus] = s.color;

  return acc;
}, {} as Record<ProductStatus, ProductStatusConfig['color']>);

export const ProductStatusLabel = PRODUCT_STATUSES.reduce((acc, s) => {
  acc[s.value as ProductStatus] = s.label;

  return acc;
}, {} as Record<ProductStatus, string>);

export const columns = (actions: any): GridColDef[] => {

  return [
    {
      flex: 0.3,
      minWidth: 370,
      field: 'name',
      headerName: 'Producto',
      renderCell: (params: GridRenderCellParams) => TitleAndSubtitle(
        params.row.name,
        `Categorías: ${Array.isArray(params.row.categories) ? params.row.categories.join(', ') : ''}`,
        null,
        `${params.row.imageUrl}`
      )
    },
    {
      flex: 0.3,
      minWidth: 80,
      field: 'stock',
      headerName: 'Stock',
      align: 'center',
      headerAlign: 'center',
    },
    {
      flex: 0.3,
      minWidth: 80,
      field: 'price',
      headerName: 'Precio de costo',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => price(Number(params.row.price)),
    },
    {
      flex: 0.3,
      minWidth: 80,
      field: 'priceFinal',
      headerName: 'Precio de venta',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => price(Number(params.row.priceFinal)),
    },
    {
      flex: 0.3,
      minWidth: 80,
      field: 'status',
      headerName: 'Estado',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => {
        const status = params.row.status as ProductStatus;

        return (
          <CustomChip
            skin="light"
            color={ProductStatusColor[status] || 'default'}
            label={ProductStatusLabel[status] || status}
            sx={{mr: 2, mt: 1}}
          />
        );
      },
    },
    dateColumn('createdAt'),
    actionsColumn(actions)
  ]
}


export const productSchema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  sku: yup.string().required('El sku es requerido'),
  categories: yup.array().required('Debe seleccionar al menos una categoría'),
  description: yup.string().nullable(),
  aditionalDescription: yup.string().nullable(),
  status: yup.string().required('El estatus es requerido'),
  price: yup.number().required('El precio minorista es requerido'),
  priceSmall: yup.number().nullable(),
  priceBig: yup.number().nullable(),
  stock: yup.number().required('El stock es requerido'),
  summary: yup.string().nullable(),
})

export const defaultValues = {
  name: null,
  sku: null,
  description: null,
  aditionalDescription: null,
  barcode: null,
  status: 'publish',
  categories: [],
  summary: null,
  price: 0,
  priceSmall: 0,
  priceBig: 0,
  stock: 0,
}
