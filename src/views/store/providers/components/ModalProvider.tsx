import { Grid, Box, Typography } from "@mui/material";
import { defaultValues, schema } from "./DataConfig";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import FormDialog from "src/components/dialogs/FormDialog";
import CustomTextField from 'src/@core/components/mui/text-field'
import errorMessage from "src/components/forms/ErrorMessage";
import apiConnector from "src/services/api.service";

const ModalProvider = ({open, onClose, refresh, provider}: any) => {

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: provider || defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit = async(data: any) => {
    try {
      let result;
      if(provider) {
        result =  await apiConnector.put(`/provider/${provider.id}`, data);
      } else {
        result = await apiConnector.post('/provider', data);
      }
      refresh(result.data);
      onClose()
      reset();
    } catch (error) {
      console.log(error);
      toast.error('Ups, ocurrió un error');
    }
  }

  return (
    <FormDialog 
      title={`${provider ? 'Crear' : 'Editar'} proveedor`}
      onSubmit={handleSubmit(onSubmit)} 
      open={open} 
      onClose={onClose} 
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
            label={'Email'}
            fullWidth
            type="email"
            {...register('email')}
            error={Boolean(errors.email)}
            {...(errors.email && errorMessage(errors?.email.message))}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <CustomTextField
            label={'Teléfono'}
            fullWidth
            {...register('phone')}
            error={Boolean(errors.phone)}
            {...(errors.phone && errorMessage(errors?.phone.message))}
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
            label={'Nota'}
            rows={4}
            multiline
            fullWidth
            error={Boolean(errors.description)}
            {...(errors.description && errorMessage(errors?.description.message))}
            {...register('note')}
          />
        </Grid>
      </Grid>
    </FormDialog>
  );
}

export default ModalProvider;
