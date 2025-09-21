import { Grid, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormDialog from "src/components/dialogs/FormDialog";
import CustomTextField from 'src/@core/components/mui/text-field'
import errorMessage from "src/components/forms/ErrorMessage";
import apiConnector from "src/services/api.service";

export const defaultValues = {
  id: 0,
  name: '',
  cuit: '',
  pointOfSale: '',
  phone: '',
  address: '',
  email: '',
  initDate: '',
};

const ModalCompanies = ({ open, onClose, refresh, companies, setSelected }: any) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: companies || defaultValues,
    mode: 'onBlur',
  });

  const onSubmit = async (data: any) => {
    try {
      if (companies) {
        await apiConnector.put(`/company/${companies.id}`, data);
      } else {
        await apiConnector.post('/company', data);
      }
      await refresh();
      onClose();
      reset();
      setSelected(null);
      toast.success('Datos actualizados con éxito');
    } catch (error) {
      toast.error('Ups, ocurrió un error');
    }
  };

  return (
    <FormDialog
      title={`${companies ? 'Editar' : 'Crear'} empresa`}
      onSubmit={handleSubmit(onSubmit)}
      open={open}
      onClose={() => {
        onClose();
        setSelected(null);
      }}
    >
      <Box sx={{ textAlign: 'right', mb: 3 }}>
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
            label={'Cuit'}
            fullWidth
            {...register('cuit')}
            error={Boolean(errors.cuit)}
            {...(errors.cuit && errorMessage(errors?.cuit.message))}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <CustomTextField
            label={'Teléfono de la empresa'}
            fullWidth
            {...register('phone')}
            error={Boolean(errors.phone)}
            {...(errors.phone && errorMessage(errors?.phone.message))}
          />
        </Grid>
        <Grid item lg={12} xs={12}>
          <CustomTextField
            label={'Dirección'}
            fullWidth
            {...register('address')}
            error={Boolean(errors.address)}
            {...(errors.address && errorMessage(errors?.address.message))}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <CustomTextField
            label={'Correo electrónico'}
            fullWidth
            {...register('email')}
            error={Boolean(errors.email)}
            {...(errors.email && errorMessage(errors?.email.message))}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <CustomTextField
            label={'Punto de Venta'}
            fullWidth
            {...register('pointOfSale')}
            error={Boolean(errors.pointOfSale)}
            {...(errors.pointOfSale && errorMessage(errors?.pointOfSale.message))}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <CustomTextField
            label={'Fecha de inicio de actividades'}
            fullWidth
            {...register('initDate')}
            error={Boolean(errors.initDate)}
            {...(errors.initDate && errorMessage(errors?.initDate.message))}
          />
        </Grid>
      </Grid>
    </FormDialog>
  );
};

export default ModalCompanies;
