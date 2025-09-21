import Link from 'next/link'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import { Button, Checkbox, Grid, IconButton, InputAdornment, Typography, styled, useTheme } from '@mui/material';
import { useState } from 'react';
import CustomTextField from 'src/@core/components/mui/text-field';
import Icon from 'src/@core/components/icon';
import { Box } from '@mui/system';

import apiConnector from 'src/services/api.service';


// ** Third Party Imports
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast';


const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.75),
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))


const schema = yup.object().shape({
  name: yup.string().required('El nombre es requerido.'),
  lastName: yup.string().required('El apellido es requerido.'),
  cuit: yup.string().required('El CUIT/CUIL es requerido.').matches(/^[0-9]/, 'Debe contener solo números').max(12, 'Máximo 12 caracteres'),
  alias: yup.string(),
  email: yup.string().email().required('El correo es requerido.'),
  password: yup.string().required('La contraseña es requerida.').min(5, 'Debe poseer por lo menos 5 caracteres.'),
  acceptConditions: yup.boolean().required('Acepte los términos y condiciones'),
})

const defaultValues = {
  password: '',
  email: '',
  name: '',
  lastName: '',
  cuit: '',
  alias: '',
  acceptConditions: false,
}

const RegisterForm = ({onCreate}: any) => {
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const acceptConditions = watch('acceptConditions');

  const onSubmit = async (data: any) => {
    try {
      const result = await apiConnector.post('/auth/register', data);
      onCreate(result);
    } catch (error) {
      toast.error('Ups, ocurrió un error');
    }
  }

  return <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={2}>
      <Grid item lg={6} xs={12}>
        <CustomTextField
          fullWidth
          label='Nombre' placeholder='Carlos'
          error={Boolean(errors.name)}
          {...(errors.name && { helperText: errors.name.message })}
          {...register('name')}
        />
      </Grid>
      <Grid item lg={6} xs={12}>
        <CustomTextField
          fullWidth
          label='Apellido' placeholder='Test'
          error={Boolean(errors.lastName)}
          {...(errors.lastName && { helperText: errors.lastName.message })}
          {...register('lastName')}
        />
      </Grid>
      <Grid item lg={12} xs={12}>
        <CustomTextField
          fullWidth
          label='CUIT/CUIL' placeholder='30991111112'
          error={Boolean(errors.cuit)}
          {...(errors.cuit && { helperText: errors.cuit.message })}
          {...register('cuit')}
        />
      </Grid>
      <Grid item lg={12} xs={12}>
        <CustomTextField
          fullWidth
          label='Empresa/Local' placeholder='Mi Tiendita'
          error={Boolean(errors.alias)}
          {...(errors.alias && { helperText: errors.alias.message })}
          {...register('alias')}
        />
      </Grid>
      <Grid item lg={12} xs={12}>
        <CustomTextField
          fullWidth
          label='Correo'

          {...register('email')}
          placeholder='carlos01@email.com'
          error={Boolean(errors.email)}
          {...(errors.email && { helperText: errors.email.message })}
        />
      </Grid>
      <Grid item lg={12} xs={12}>
        <CustomTextField
          fullWidth
          label='Password'
          id='auth-login-v2-password'
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          error={Boolean(errors.password)}
          {...(errors.password && { helperText: errors.password.message })}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  edge='end'
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Grid>
    </Grid>
  <FormControlLabel
    control={<Checkbox {...register('acceptConditions')}/>}
    sx={{ mb: 4, mt: 1.5, '& .MuiFormControlLabel-label': { fontSize: theme.typography.body2.fontSize } }}
    label={
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Typography sx={{ color: 'text.secondary' }}>Acepto los</Typography>
        <Typography component={LinkStyled} href='/' onClick={e => e.preventDefault()} sx={{ ml: 1 }}>
          Términos y condiciones
        </Typography>
      </Box>
    }
  />
  <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }} disabled={!isValid || !acceptConditions}>
    Registrarse
  </Button>
  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
    <Typography sx={{ color: 'text.secondary', mr: 2 }}>¿Ya tienes una cuenta?</Typography>
    <Typography component={LinkStyled} href='/login'>
      Inciar sesión
    </Typography>
  </Box>

</form>
}

export default RegisterForm;
