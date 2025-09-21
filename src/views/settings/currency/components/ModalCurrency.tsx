import { Grid, Box, Typography, MenuItem } from "@mui/material";
import { defaultValues, schema } from "./DataConfig";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import FormDialog from "src/components/dialogs/FormDialog";
import CustomTextField from 'src/@core/components/mui/text-field'
import errorMessage from "src/components/forms/ErrorMessage";
import apiConnector from "src/services/api.service";

const ModalCurrency = ({open, onClose, refresh, currency, setSelected}: any) => {

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: currency || defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit = async(data: any) => {
    try {
      let result;
      if(currency) {
        result =  await apiConnector.put(`/currency/${currency.id}`, data);
      } else {
        result = await apiConnector.post('/currency', data);
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
      title={`${currency ? 'Crear' : 'Editar'} catergoría`}
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
        <Grid item lg={6} xs={12}>
          <CustomTextField
            label={'Codigo'}
            fullWidth
            {...register('code')}
            error={Boolean(errors.code)}
            {...(errors.code && errorMessage(errors?.code.message))}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <CustomTextField
            label={'Simbolo'}
            fullWidth
            {...register('symbol')}
            error={Boolean(errors.symbol)}
            {...(errors.symbol && errorMessage(errors?.symbol.message))}
          />
        </Grid>
        <Grid item lg={12} xs={12}>
          <CustomTextField
            select
            label={'Estatus'}
            fullWidth
            defaultValue={currency ? currency.status : 'draft'}
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

export default ModalCurrency;
