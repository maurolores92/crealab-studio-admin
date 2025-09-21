

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Demo Imports
import LoginForm from './components/LoginForm';
import { Alert, Card, CardContent } from '@mui/material'

import { useState } from 'react'
import UseBgColor from 'src/@core/hooks/useBgColor'
import { styled } from '@mui/system';
import AuthIllustrationV1Wrapper from './components/AuthIllustrationV1Wrapper';

const LoginLogo = styled('img')(({ theme }) => ({

  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))


const LoginView = () => {


  // ** Hooks
  const bgColors = UseBgColor();
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);


  return (
    <Box className='content-center'>
      <AuthIllustrationV1Wrapper>
        <Card>
          <CardContent sx={{ p: theme => `${theme.spacing(10.5, 8, 8)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <LoginLogo src='/images/crealab-studio-logo.png' alt='logo' sx={{width: 200}} />
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h4' sx={{ mb: 1.5 }}>
                {`Bienvenido a  ${themeConfig.templateName}! 👋🏻`}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>

              </Typography>
            </Box>
            {showErrorMessage ?
              <Alert icon={false} sx={{ py: 3, mb: 6, ...bgColors.primaryLight, '& .MuiAlert-message': { p: 0 } }}>
                <Typography variant='body2' sx={{ mb: 2, color: 'primary.main' }}>
                  Ups! hubo un error al ingresar, por favor verifique tu usuario o tu contraseña.
                </Typography>
              </Alert>
            : <></>}
           <LoginForm setShowError={setShowErrorMessage}/>
          </CardContent>
        </Card>
      </AuthIllustrationV1Wrapper>
    </Box>
  )
}

export default LoginView
