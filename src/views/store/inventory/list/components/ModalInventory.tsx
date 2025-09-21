import { Grid, Box, Typography } from "@mui/material";
import { SketchPicker } from 'react-color';
import { defaultValues, schema } from "./DataConfig";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import FormDialog from "src/components/dialogs/FormDialog";
import CustomTextField from 'src/@core/components/mui/text-field'
import errorMessage from "src/components/forms/ErrorMessage";
import apiConnector from "src/services/api.service";

const ModalInventory = ({ open, onClose, refresh, inventory, setSelected }: any) => {

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors,  },
  } = useForm({
    defaultValues: inventory || defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });


  const onSubmit = async(data: any) => {
    try {
      let result;
      if(inventory) {
        result =  await apiConnector.put(`/inventory/${inventory.id}`, data);
      } else {
        result = await apiConnector.post('/inventory', data);
      }
      refresh(result.data);
      onClose()
      reset();
      setSelected(null)
    } catch (error) {
      console.log(error);
      toast.error('Ups, ocurrió un error');
    }
  }

  return (
    <FormDialog
      title={`${inventory ? 'Editar' : 'Crear'} inventario`}
      onSubmit={handleSubmit(onSubmit)}
      open={open}
      onClose={() => {
        onClose();
        setSelected(null);
      }}
    >
      <Box sx={{textAlign: 'right', mb: 3}}>
        <Typography color="grey"></Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12}>
          <CustomTextField
            label={'Nombre'}
            fullWidth
            {...register('name')}
            error={Boolean(errors.name)}
            {...(errors.name && errorMessage(errors?.name.message))}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <CustomTextField
            label={'Tipo de material'}
            fullWidth
            {...register('type')}
            error={Boolean(errors.type)}
            {...(errors.type && errorMessage(errors?.type.message))}
          />
        </Grid>

        <Grid item lg={3} xs={12}>
          <CustomTextField
            label={'Unidad de medida'}
            fullWidth
            {...register('unit')}
            error={Boolean(errors.unit)}
            {...(errors.unit && errorMessage(errors?.unit.message))}
          />
        </Grid>
        <Grid item lg={8} xs={12}>
          <CustomTextField
            label={'Proveedor'}
            fullWidth
            {...register('supplier')}
            error={Boolean(errors.supplier)}
            {...(errors.supplier && errorMessage(errors?.supplier.message))}
          />
        </Grid>
        <Grid item lg={4} xs={12}>
          <CustomTextField
            label={'Fecha de la ultima compra'}
            type='date'
            fullWidth
            {...register('dateLastPurchase', { required: true })}
            error={Boolean(errors.dateLastPurchase)}
            {...errorMessage(errors?.dateLastPurchase?.message)}
          />
        </Grid>
        <Grid item lg={3} xs={12}>
            <Typography sx={{mb: 1}}>Color</Typography>
            <Controller
              name="color"
              control={control}
              render={({ field }: any) => (
                <SketchPicker
                  color={field.value || '#000000'}
                  onChange={(color: any) => field.onChange(color.hex)}
                />
              )}
            />
          </Grid>
      </Grid>
    </FormDialog>
  );
}

export default ModalInventory;
