import { Grid } from "@mui/material"
import FormDialog from "src/components/dialogs/FormDialog";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import CustomTextField from "src/@core/components/mui/text-field";
import errorMessage from "src/components/forms/ErrorMessage";
import apiConnector from "src/services/api.service";
import toast from "react-hot-toast";


export const stockSchema = yup.object().shape({
  stock: yup.number().required('El stock es requerido'),
})

export const defaultValues = {
  stock: 0,
}

const AddStockModal = ({productId, open, onClose, refresh}: any) => {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(stockSchema)
  });
  const onSubmit = async(data: any) => {
    try {
      data.productId = productId;
      await apiConnector.post('/products/stock', data);
      refresh();
      reset();
      onClose();
      toast.success('Se ha cargado el stock correctamente')
    } catch (error) {
      toast.error('Error al cargar el stock.')
    }
  }

  return <>
  <FormDialog 
    {...{open, onClose}} 
    title="Agregar stock" 
    onSubmit={handleSubmit(onSubmit)}
    size='xs'
  >
    <Grid container spacing={2}>
      <Grid item lg={12} xs={12}>
        <CustomTextField
          label={'Stock'}
          fullWidth
          type="number"
          {...register('stock')}
          error={Boolean(errors.stock)}
          {...errorMessage(errors?.stock?.message)}
        />
      </Grid>
    </Grid>
  </FormDialog>
  </>
}

export default AddStockModal;
