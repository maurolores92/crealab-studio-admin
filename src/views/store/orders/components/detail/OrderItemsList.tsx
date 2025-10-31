import FullTable from "src/components/table/FullTable";
import { columnsItems } from "../list/DataConfig";
import { useState } from "react";
import { defaultDataList } from "src/types/apps/listTypes";
import { Button, Card, CardContent, CardHeader, useTheme, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import apiConnector from "src/services/api.service";
import toast from "react-hot-toast";
import CustomTextField from "src/@core/components/mui/text-field";
import { useRouter } from "next/router";
import ConfirmDeleteDialog from "src/components/dialogs/ConfirmDeleteDialog";
import { Icon } from "@iconify/react";
import SelectProduct from "../SelectProduct";

export const schema = yup.object().shape({
  productId: yup.number().required('El producto es requerido'),
  quantity: yup.number().required('La cantidad es requerida'),
})

const OrderItemsList = ({items, refresh}: any) => {
  const router = useRouter();
  const theme = useTheme();
  const {id} = router.query;
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit = async(data: any) => {
    try {
      if (!selectedProduct) {
        toast.error('Selecciona un producto válido.');

        return;
      }
      const payload = {
        orderId: id,
        productId: selectedProduct.id,
        sku: selectedProduct.sku,
        description: selectedProduct.name,
        finalPrice: Number(selectedProduct.priceFinal),
        quantity: Number(data.quantity),
        total: Number(selectedProduct.priceFinal) * Number(data.quantity)
      };
      const result = await apiConnector.post('/orders/items', payload);
      refresh(result.data);
      reset();
      setSelectedProduct(null);
      toast.success('Se agregó el producto con éxito.')
    } catch (error) {
      console.log('Error en submit:', error);
      toast.error('Ups, ocurrió un error');
    }
  }
  const onDelete = async() => {
    try {
      await apiConnector.remove(`/orders/items/${selected.id}`);
      setOpenDelete(false);
      toast.success('Se eliminó el producto con éxito.')
      refresh();
    } catch (error) {
      toast.error('Ups! Ocurrió un error.')
    }
  }

  const onSave = async(product: any) => {
    try {
      await apiConnector.put(`/orders/items/${product.id}`, product);
      refresh();
    } catch (error) {
      console.log(error);
    }
  }

  const cols = columnsItems((row: any) => <>

    {
      row.changed && <Tooltip title='Guardar' arrow placeholder="top">
        <IconButton onClick={() => onSave(row)}>
        <Icon icon='tabler:check' color={theme.palette.success.main}/>
      </IconButton>
    </Tooltip>
    }

     <Tooltip title='Quitar' arrow placeholder="top">
      <IconButton onClick={() => {
        setSelected(row);
        setOpenDelete(true);
      }}>
        <Icon icon='tabler:trash' color={theme.palette.error.main}/>
      </IconButton>
    </Tooltip>
  </>)

  return <>
  <Card sx={{mb: 2}}>
    <CardHeader title='Productos' />
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item lg={6} xs={12}>
            <SelectProduct errors={errors} setValue={setValue} onProductSelect={setSelectedProduct} />
          </Grid>
          <Grid item lg={3} xs={6}>
            <CustomTextField {...register('quantity')} type="number" label='Cantidad' />
          </Grid>
          <Grid item lg={3} xs={6}>
            <Button variant="contained" sx={{mt: 5}} type='submit'>Agregar</Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
    <FullTable
      data={{...defaultDataList, data: items}}
      columns={cols}
      paginationModel={paginationModel}
      setPaginationModel={setPaginationModel}
    />
  </Card>
  {
      openDelete && <ConfirmDeleteDialog
      open={openDelete}
      onClose={() => setOpenDelete(false)}
      title={`Eliminar la orden de venta ${selected.orderNumber}`}
      titleAction="Eliminar orden de venta"
      action={onDelete}
      >
        <Typography fontSize={14}>¿Está seguro que desea eliminar el producto?</Typography>
      </ConfirmDeleteDialog>
    }
  </>;
}

export default OrderItemsList
