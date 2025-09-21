
import { Grid, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import FormDialog from "src/components/dialogs/FormDialog";
import CustomTextField from 'src/@core/components/mui/text-field';
import errorMessage from "src/components/forms/ErrorMessage";
import apiConnector from "src/services/api.service";
import { useAuth } from "src/hooks/useAuth";
import { useState } from "react";

const schema = yup.object().shape({
  password: yup.string().required('La contraseña es obligatoria').min(6, 'Mínimo 6 caracteres'),
  repeatPassword: yup.string()
    .oneOf([yup.ref('password'), undefined], 'Las contraseñas no coinciden')
    .required('Repite la contraseña'),
});

const ModalChangePassword = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { password: '', repeatPassword: '' },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data: any) => {
    try {
      await apiConnector.post('/auth/change-password', {
        userId: user?.id,
        newPassword: data.password
      });
      toast.success('Contraseña cambiada correctamente');
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error('Ups, ocurrió un error');
    }
  };

  return (
    <>
      <Button variant='contained' color='primary' onClick={handleOpen}>
        Cambiar contraseña
      </Button>
      <FormDialog
        title={'Cambiar contraseña'}
        onSubmit={handleSubmit(onSubmit)}
        open={open}
        onClose={handleClose}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextField
              label={'Nueva contraseña'}
              type='password'
              fullWidth
              {...register('password')}
              error={Boolean(errors.password)}
              {...(errors.password && errorMessage(errors?.password.message))}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label={'Repetir contraseña'}
              type='password'
              fullWidth
              {...register('repeatPassword')}
              error={Boolean(errors.repeatPassword)}
              {...(errors.repeatPassword && errorMessage(errors?.repeatPassword.message))}
            />
          </Grid>
        </Grid>
      </FormDialog>
    </>
  );
};

export default ModalChangePassword;
