import { useState } from 'react';
import FullTable from 'src/components/table/FullTable';
import { columns } from './DataConfig';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardHeader, CardContent, Box, Typography, Grid, Button, IconButton, Tooltip, useTheme } from '@mui/material';
import ModalInventory from 'src/views/store/inventory/list/components/ModalInventory';
import { useRouter } from 'next/router';
import apiConnector from 'src/services/api.service';
import toast from 'react-hot-toast';
import { Icon } from '@iconify/react';
import SelectInventory from './SelectInventory';
import CustomTextField from 'src/@core/components/mui/text-field';
import ConfirmDeleteDialog from 'src/components/dialogs/ConfirmDeleteDialog';
import { defaultDataList } from 'src/types/apps/listTypes';

  const schema = yup.object().shape({
    quantity: yup.number().required('La cantidad es requerida').min(1),
    unitPrice: yup.number().required('El precio es requerido').min(0.01),
  });

const ExpenseCard = ({ refresh, items }: any) => {
  const router = useRouter();
  const { id } = router.query;
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });
  const [selectedExpense, setSelectedExpense] = useState<any | null>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>();
  const theme = useTheme();
  const [openInventory, setOpenInventory] = useState(false);
  const [refreshKey, setRefreshKey] = useState(Date.now());

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

  const onSubmit = async (data: any) => {
    if (!selectedExpense || !id) {
      toast.error('Selecciona un producto válido.');

      return;
    }
    const payload = {
      expenseId: Number(id),
      inventoryId: selectedExpense.value,
      quantity: Number(data.quantity),
      unitPrice: Number(data.unitPrice)
    };
    try {
      await apiConnector.post(`/expenses/items`, payload);
      toast.success('Producto agregado a la expensa.');
      setSelectedExpense(null);
      reset();
      if (typeof refresh === 'function') refresh();
    } catch (error) {
      toast.error('Error al agregar el producto.');
    }
  };

    const onDelete = async() => {
    try {
      await apiConnector.remove(`/expenses/items/${selected.id}`);
      setOpenDelete(false);
      toast.success('Se eliminó el producto con éxito.')
      refresh();
    } catch (error) {
      toast.error('Ups! Ocurrió un error.')
    }
  }

  const onSave = async(product: any) => {
    try {
      await apiConnector.put(`/order/items/${product.id}`, product);
      refresh();
    } catch (error) {
      console.log(error);
    }
  }

  const cols = columns((row: any) => <>

      {
        row.changed && <Tooltip title='Guardar' arrow placeholder="top">
          <IconButton onClick={() => onSave(row)}>
          <Icon icon='tabler:check' color={theme.palette.success.main}/>
        </IconButton>
      </Tooltip>
      }

      <Tooltip title='Quitar' arrow placeholder="top">
        <IconButton onClick={() => { setSelected(row); setOpenDelete(true); }}>
        <Icon icon='tabler:trash' color={theme.palette.error.main}/>
      </IconButton>
      </Tooltip>
    </>)

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        title="Información de pago"
        action={
          <Button
            variant="contained"
            startIcon={<Icon icon={'tabler:plus'} />}
            onClick={() => setOpenInventory(true)}
          >
            Nuevo producto
          </Button>
        }
      />
  <CardContent>
        <Box sx={{ mb: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={6}>
                <SelectInventory
                  errors={errors}
                  setValue={setValue}
                  onProductSelect={setSelectedExpense}
                  sx={{ mb: 0 }}
                  refreshKey={refreshKey}
                />
              </Grid>
              <Grid item xs={1}>
                <CustomTextField
                  {...register('quantity')}
                  label="Cantidad"
                  type="number"
                  fullWidth
                  inputProps={{ min: 1 }}
                  error={Boolean(errors.quantity)}
                />
              </Grid>
              <Grid item xs={2}>
                <CustomTextField
                  {...register('unitPrice')}
                  label="Precio unitario"
                  type="number"
                  fullWidth
                  inputProps={{ min: 0 }}
                  error={Boolean(errors.unitPrice)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" sx={{mt: 5}} type='submit'>Agregar</Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Productos del gasto
          </Typography>
          <FullTable
            data={{...defaultDataList, data: items}}
            columns={cols}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
          />
        </Box>
      </CardContent>
      {
        openDelete && <ConfirmDeleteDialog
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          title={`Eliminar el producto de inventario ${selectedExpense?.key}`}
          titleAction="Eliminar orden de venta"
          action={onDelete}
        >
          <Typography fontSize={14}>¿Está seguro que desea eliminar el producto?</Typography>
        </ConfirmDeleteDialog>
      }
      {
        openInventory && <ModalInventory
          open={openInventory}
          onClose={() => {
            setOpenInventory(false);
            setRefreshKey(Date.now());
          }}
          refresh={refresh}
          inventory={null}
        />
      }
    </Card>

  );
};

export default ExpenseCard;
