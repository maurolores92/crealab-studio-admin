import { useState } from 'react'


// ** MUI Components
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth';

const schema = yup.object().shape({
  email: yup.string().email().required('El correo es requerido'),
  password: yup.string().required('La contraseña es requerida').min(5, 'La contraseña debe poseer mínimo 5 caracteres.')
})

const defaultValues = {
  password: '',
  email: ''
}

const LoginForm = ({setShowError}: any) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** Hooks
  const auth = useAuth()

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: any) => {
    const { email, password } = data
    try {
      await auth.login({ email, password })
    } catch (error) {
      setError('email', {
        type: 'manual',
        message: 'Correo o contraseña invalidos'
      })
      setShowError({
        type: 'manual',
        message: 'Correo o contraseña invalidos'
      });
    }
    
  }

  return <>
  <Box>
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ mb: 4 }}>
        <CustomTextField
          fullWidth
          label='Correo'
          placeholder=''
          {...register('email')}
          error={Boolean(errors.email)}
          {...(errors.email && { helperText: errors.email.message })}
        />
      </Box>
      <Box sx={{ mb: 1.5 }}>
       
        <CustomTextField
          fullWidth
          label='Contraseña'
          id='auth-login-v2-password'
          {...register('password')}
          error={Boolean(errors.password)}
          {...(errors.password && { helperText: errors.password.message })}
          type={showPassword ? 'text' : 'password'}
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
      </Box>
      <Box
        sx={{
          mb: 1.75,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
      </Box>
      <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
        Inciar sesión
      </Button>
     
    </form>
  </Box>
  </>
}

export default LoginForm;
