import { Icon } from '@iconify/react';
import { Box, IconButton, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { DateTime } from 'luxon';
import { labelColumn, price } from 'src/components/table/Columns'

import * as yup from 'yup';



export const columnsItems = (actions: any, changeQuantity: any) => [
  {
    flex: 0.3,
    minWidth: 250,
    field: 'productName',
    headerName: 'Producto',
    align: 'left',
    headerAlign: 'left',
    renderCell: (params: GridRenderCellParams) => labelColumn(params.row.productName)
  },
  {
    flex: 0.2,
    minWidth: 120,
    field: 'price',
    headerName: 'Precio',
    align: 'left',
    headerAlign: 'left',
    renderCell: (params: GridRenderCellParams) => price(params.row.finalPrice)
  },
  {
    flex: 0.3,
    minWidth: 90,
    field: 'quantity',
    headerName: 'Cantidad',
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: GridRenderCellParams) => {
      return <>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <IconButton sx={{p: 1}} onClick={() => changeQuantity(params.row, 'minus')}><Icon icon='ei:minus' /></IconButton>
          <Typography sx={{mx: 1}}>{params.row.quantity}</Typography>
          <IconButton sx={{p: 1}} onClick={() => changeQuantity(params.row, 'plus')}><Icon icon='ei:plus' /></IconButton>
        </Box>
      </>
    }
  },
  {
    flex: 0.1,
  minWidth: 100,
  field: 'discount',
  headerName: 'Descuento',
  align: 'center',
  headerAlign: 'center',
  renderCell: (params: GridRenderCellParams) => (<Typography color="primary.main" variant="body1">{params.row.discount}%</Typography>)
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'total',
    headerName: 'Total',
    align: 'left',
    headerAlign: 'left',
    renderCell: (params: GridRenderCellParams) => price(params.row.total)
  },
];

export const columns = (): GridColDef[] => {
  return [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'id',
      headerName: '#Factura',
      align: 'center',
      headerAlign: 'left',
    },
    {
      flex: 0.3,
      minWidth: 80,
      field: 'date',
      headerName: 'Fecha',
      align: 'left',
      headerAlign: 'left',
      valueGetter: (params: any) => params.row.invoiceDate,
    },
    {
      flex: 0.3,
      minWidth: 80,
      field: 'products',
      headerName: 'Productos',
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params: any) => params.row.items?.length,
    },
    {
      flex: 0.3,
      minWidth: 110,
      field: 'payment',
      headerName: 'Pago',
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params: any) => params.row.paymentMethod.name,
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'discount',
      headerName: 'Descuento',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => price(params.row.discount || 0)
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'totalInvoice',
      headerName: 'Total',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => price(params.row.totalInvoice || 0)
    },
    {
      flex: 0.3,
      minWidth: 110,
      field: 'status',
      headerName: 'Estatus',
      align: 'left',
      headerAlign: 'left',
      renderCell: (params: GridRenderCellParams) => labelColumn(params.row.status.name)
    },
  ]
}

export const schema = yup.object().shape({
  clientId: yup.number().required('El cliente es requerido'),
  paymentMethodId: yup.number().required('El método de pago es requerido'),
  invoiceDate: yup.string().required('La fecha es requerida'),
})

export const defaultValues = {
  clientId: null,
  paymentMethodId: null,
  status: 'draft',
  invoiceDate: DateTime.now().toFormat('yyyy-MM-dd')
}


