import { Icon } from '@iconify/react';
import { Box, IconButton, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { DateTime } from 'luxon';
import { labelColumn, price } from 'src/components/table/Columns'

import * as yup from 'yup';

export const columnsItems = (changeQuantity: any) => [
  {
    flex: 0.3,
    minWidth: 260,
    field: 'product',
    headerName: 'Producto',
    align: 'left',
    headerAlign: 'left',
    renderCell: (params: GridRenderCellParams) => labelColumn(params.row.product?.name)
  },
  {
    flex: 0.3,
    minWidth: 90,
    field: 'price',
    headerName: 'Precio',
    align: 'left',
    headerAlign: 'left',
    renderCell: (params: GridRenderCellParams) => price(params.row.product?.price)
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
    minWidth: 110,
    field: 'total',
    headerName: 'Total',
    align: 'left',
    headerAlign: 'left',
    renderCell: (params: GridRenderCellParams) => price(params.row.total)
  },
];

export const columnsOrders = (): GridColDef[] => {
  return [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'orderNumber',
      headerName: '#Orden',
    },
    {
      flex: 0.3,
      minWidth: 80,
      field: 'date',
      headerName: 'Fecha',
      align: 'left',
      headerAlign: 'left',
      valueGetter: (params: any) => params.row.orderDate,
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
      valueGetter: (params: any) => params.row.paymentMethod?.name || '-',
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
      field: 'totalAmount',
      headerName: 'Total',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => price(params.row.totalAmount || 0)
    },
    {
      flex: 0.3,
      minWidth: 110,
      field: 'status',
      headerName: 'Estatus',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => labelColumn(params.row.status.name, params.row.status.color)
    },
  ]
}

export const schema = yup.object().shape({
  clientId: yup.number().required('El cliente es requerido'),
  orderDate: yup.string().required('La fecha es requerida'),
})

export const defaultValues = {
  clientId: null,
  status: 'draft',
  orderDate: DateTime.now().toFormat('yyyy-MM-dd')
}


