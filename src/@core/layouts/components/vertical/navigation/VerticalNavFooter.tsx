// ** MUI Imports
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Link from 'next/link'

// ** Custom Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Styled Components
const FooterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  position: 'absolute',
  bottom: 0,
  width: '100%',
  boxSizing: 'border-box',
  textAlign: 'center'
}));

const FooterImage = styled('img')({
  maxWidth: '200px',
  margin: '16px 0'
});

const VerticalNavFooter = () => {
  const { user } = useAuth(); // Obtén la información del usuario

  // Verifica si el usuario tiene un planId de 1 o 2
  if (user?.planId !== 1 && user?.planId !== 2) {
    return null;
  }

  return (
    <FooterContainer>
      <Typography variant="h6" gutterBottom>
        ¿Quieres acceder a funcionalidades mejoradas y recibir atención más personalizada? ¡Mejora tu plan ahora!
      </Typography>
      <FooterImage src="/images/banners/banner-31.jpg" alt="Upgrade Image" />
      <Button variant="contained" color="primary" component={Link} href="/plan">
        Cambiar Plan
      </Button>
    </FooterContainer>
  )
}

export default VerticalNavFooter
