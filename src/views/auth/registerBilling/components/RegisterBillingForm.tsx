import { Button, Grid, IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import CustomTextField from 'src/@core/components/mui/text-field';
import Icon from 'src/@core/components/icon';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name: yup.string().required('El nombre de fantasia es requerido.'),
  companyName: yup.string().required('El nombre de la empresa es requerido.'),
  cuit: yup.string().required('El CUIT/CUIL es requerido.').matches(/^[0-9]{11}$/, 'Debe contener 11 números'),
  phone: yup.string().required('El teléfono es requerido.'),
  email: yup.string().email().required('El correo es requerido.'),
  pointOfSale: yup.string().required('El número de punto de ventas es requerido.').matches(/^[0-9]{1,5}$/, 'Debe contener hasta 5 números'),
  activitiesStartDate: yup.string().required('La fecha de inicio de actividades es requerida.').matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Debe tener el formato dd/mm/yyyy'),
  incomeNumber: yup.string().required('El número de ingresos es requerido.'),
  taxCode: yup.string().required('La contraseña es requerida.').min(5, 'Debe poseer por lo menos 5 caracteres.'),
});

const defaultValues = {
  name: '',
  companyName: '',
  cuit: '',
  cuitAfip: '',
  phone: '',
  email: '',
  pointOfSale: '',
  activitiesStartDate: '',
  incomeNumber: '',
  taxCode: '',
};

const RegisterBillingForm = ({ onCreate }: any) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const cuitValue = watch('cuit');
  const showAfipCuit = cuitValue && cuitValue.startsWith('3');
  const onSubmit = (data: any) => {
    onCreate(data);
  };

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12}>
          <CustomTextField
            fullWidth
            label='Nombre de Fantasia'
            placeholder='Mi Tiendita'
            error={Boolean(errors.name)}
            {...(errors.name && { helperText: errors.name.message })}
            {...register('name')}
          />
        </Grid>
        <Grid item lg={12} xs={12}>
          <CustomTextField
            fullWidth
            label='Nombre de la Compañia'
            placeholder='Mi Tiendita SRL'
            error={Boolean(errors.companyName)}
            {...(errors.companyName && { helperText: errors.companyName.message })}
            {...register('companyName')}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <CustomTextField
            fullWidth
            label='CUIT/CUIL'
            placeholder='30991111112'
            error={Boolean(errors.cuit)}
            {...(errors.cuit && { helperText: errors.cuit.message })}
            {...register('cuit')}
          />
        </Grid>
        {showAfipCuit && (
          <Grid item lg={6} xs={12}>
            <CustomTextField
              fullWidth
              label='CUIT para ingresar a AFIP'
              placeholder='30991111112'
              {...register('cuitAfip')}
            />
          </Grid>
        )}
        <Grid item lg={6} xs={12}>
          <CustomTextField
            fullWidth
            label='Teléfono'
            placeholder='011 1234-5678'
            error={Boolean(errors.phone)}
            {...(errors.phone && { helperText: errors.phone.message })}
            {...register('phone')}
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
        <Grid item lg={4} xs={12}>
          <CustomTextField
            fullWidth
            label='Punto de venta'
            placeholder='0001'
            error={Boolean(errors.pointOfSale)}
            {...(errors.pointOfSale && { helperText: errors.pointOfSale.message })}
            {...register('pointOfSale')}
          />
        </Grid>
        <Grid item lg={4} xs={12}>
          <CustomTextField
            fullWidth
            label='Inicio de actividades'
            placeholder='01/01/2021'
            error={Boolean(errors.activitiesStartDate)}
            {...(errors.activitiesStartDate && { helperText: errors.activitiesStartDate.message })}
            {...register('activitiesStartDate')}
          />
        </Grid>
        <Grid item lg={4} xs={12}>
          <CustomTextField
            fullWidth
            label='Numero de Ingresos'
            error={Boolean(errors.incomeNumber)}
            {...(errors.incomeNumber && { helperText: errors.incomeNumber.message })}
            {...register('incomeNumber')}
          />
        </Grid>
        <Grid item lg={12} xs={12}>
          <CustomTextField
            fullWidth
            label='Clave Fiscal'
            type={showPassword ? 'text' : 'password'}
            {...register('taxCode')}
            error={Boolean(errors.taxCode)}
            {...(errors.taxCode && { helperText: errors.taxCode.message })}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Button fullWidth type='submit' variant='contained' sx={{ mb: 4, mt: 1.5 }} disabled={!isValid}>
        Enviar solicitud
      </Button>
    </form>
  );
};

export default RegisterBillingForm;
