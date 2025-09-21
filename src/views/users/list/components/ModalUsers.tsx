import { Grid, Box, Typography, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import FormDialog from "src/components/dialogs/FormDialog";
import CustomTextField from 'src/@core/components/mui/text-field'
import errorMessage from "src/components/forms/ErrorMessage";
import apiConnector from "src/services/api.service";
import { defaultValues, schema } from "./DataConfig";

const ModalUsers = ({ open, onClose, refresh, user, setSelected, roles }: any) => {

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors,  },
  } = useForm({
  defaultValues: user || defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });


  const onSubmit = async(data: any) => {
    try {
      let result;
      if(user) {
        result =  await apiConnector.put(`/user/${user.id}`, data);
      } else {
        result = await apiConnector.post('/auth/register-user', data);
      }
      refresh(result.data);
      onClose();
      reset();
      setSelected(null);
    } catch (error) {
      console.log(error);
      toast.error('Ups, ocurrió un error');
    }
  }

  return (
    <FormDialog
      title={`${user ? 'Editar' : 'Crear'} usuario`}
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
        <Grid item lg={6} xs={12}>
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
            label={'Apellido'}
            fullWidth
            {...register('lastName')}
            error={Boolean(errors.lastName)}
            {...(errors.lastName && errorMessage(errors?.lastName.message))}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <CustomTextField
            label={'Usuario'}
            fullWidth
            {...register('username')}
            error={Boolean(errors.username)}
            {...(errors.username && errorMessage(errors?.username.message))}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <CustomTextField
            label={'Email'}
            fullWidth
            {...register('email')}
            error={Boolean(errors.email)}
            {...(errors.email && errorMessage(errors?.email.message))}
          />
        </Grid>
        {!user && (
          <>
            <Grid item lg={6} xs={12}>
              <CustomTextField
                label={'Contraseña'}
                type='password'
                fullWidth
                {...register('password')}
                error={Boolean(errors.password)}
                {...(errors.password && errorMessage(errors?.password.message))}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <CustomTextField
                label={'Repetir contraseña'}
                type='password'
                fullWidth
                {...register('repeatPassword')}
                error={Boolean(errors.repeatPassword)}
                {...(errors.repeatPassword && errorMessage(errors?.repeatPassword.message))}
              />
            </Grid>
          </>
        )}

        <Grid item lg={6} xs={12}>
          <CustomTextField
            label={'Teléfono'}
            fullWidth
            {...register('phone')}
            error={Boolean(errors.phone)}
            {...(errors.phone && errorMessage(errors?.phone.message))}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <CustomTextField
            label={'Rol'}
            select
            fullWidth
            defaultValue={user?.roleId ?? ''}
            {...register('roleId')}
            error={Boolean(errors.roleId)}
            {...errorMessage(errors?.roleId?.message)}
          >
            {roles?.map((role: any) => (
              <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
            ))}
          </CustomTextField>
        </Grid>
      </Grid>
    </FormDialog>
  );
}

export default ModalUsers;
