import { Grid, Box, Typography, MenuItem } from "@mui/material";
import { defaultValues, schema } from "./DataConfig";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import FormDialog from "src/components/dialogs/FormDialog";
import CustomTextField from 'src/@core/components/mui/text-field'
import errorMessage from "src/components/forms/ErrorMessage";
import apiConnector from "src/services/api.service";

const ModalPaymentMethod = ({open, onClose, refresh, paymentMethod, setSelected}: any) => {

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: paymentMethod || defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit = async(data: any) => {
    try {
      let result;
      if(paymentMethod) {
        result =  await apiConnector.put(`/paymentMethod/${paymentMethod.id}`, data);
      } else {
        result = await apiConnector.post('/paymentMethod', data);
      }
      refresh(result.data);
      onClose();
      reset();
      setSelected(null);
    } catch (error) {
      toast.error('Ups, ocurrió un error');
    }
  }
  
  return (
    <FormDialog
      title={`${paymentMethod ? 'Crear' : 'Editar'} catergoría`}
      onSubmit={handleSubmit(onSubmit)}
      open={open}
      onClose={() => {
        onClose();
        setSelected(null); }}

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
        <Grid item lg={12} xs={12}>
          <CustomTextField
            label={'Slug'}
            fullWidth
            {...register('slug')}
            error={Boolean(errors.slug)}
            {...(errors.slug && errorMessage(errors?.slug.message))}
          />
        </Grid>
        <Grid item lg={12} xs={12}>
          <CustomTextField
            select
            label={'Estatus'}
            fullWidth
            defaultValue={paymentMethod ? paymentMethod.status : 'draft'}
            {...register('status')}
            error={Boolean(errors.status)}
            {...(errors.status && errorMessage(errors?.status.message))}
          >
            <MenuItem value='draft'>Pendiente</MenuItem>
            <MenuItem value='published'>Publicado</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </FormDialog>
  );
}

export default ModalPaymentMethod;
