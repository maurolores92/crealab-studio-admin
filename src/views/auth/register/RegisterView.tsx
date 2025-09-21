
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/auth/components/FooterIllustrationsV2';
import RegisterForm from './components/RegisterForm'
import { useState } from 'react'
import SuccessModal from 'src/components/dialogs/SuccessModal'
import { Button } from '@mui/material'
import Link from 'next/link'

// ** Styled Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 600,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))


const RegisterView = () => {

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const [ openSuccess, setOpenSuccess] = useState<boolean>(false);

  const { skin } = settings

  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'
  const onCreate = async(result: any) => {
    console.log(result);
    setOpenSuccess(true);
  }

  return (
    <>
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <RegisterIllustration
            alt='register-illustration'
            src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
          />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            {/* Aqui va la imagen */}
            <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                La aventura está por comenzar 🚀
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>¡Haz que la gestión de tus ventas sea fácil y divertida!</Typography>
            </Box>
            <RegisterForm onCreate={onCreate}/>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
    {
      openSuccess ? <SuccessModal
      open={openSuccess}
      onClose={() => setOpenSuccess(false)}
      title='Bienvenido a EcommerAH'
      message='Nos encanta tenerte con nostros, comienza la aventura ingresando e impulsando tus ventas'
      actions={<>
        <Button variant='contained' LinkComponent={Link} href='/login/'>Ir al login</Button>
      </>}
      /> :<></>
    }
    </>
  )
}


export default RegisterView;
