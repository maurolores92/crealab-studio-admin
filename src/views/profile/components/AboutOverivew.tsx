// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import { useAuth } from 'src/hooks/useAuth';
import ItemWithIcon from 'src/components/ItemWithIcon';



const AboutOverivew = () => {
  const { user } = useAuth();
  const companyMain = user?.companies?.find((company: any) => company.isMain);

  return user ?
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 6 }}>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>Mis datos</Typography>
              <ItemWithIcon property='Nombre' label={`${user.name} ${user.lastName}`} icon={'fluent:rename-16-regular'}/>
              <ItemWithIcon property='Usuario' label={user.username} icon={'tabler:user'}/>
              <ItemWithIcon property='Email'  label={user.email} icon={'majesticons:mail-line'}/>
              { user.phone ? <ItemWithIcon property='Telefono' label={user.phone} icon={'tabler:phone-call'}/>: null}

            </Box>
            {
              companyMain ?
              <Box sx={{ mb: 6 }}>
                <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                  Empresa principal
                </Typography>
                <ItemWithIcon
                property='Nombre'
                label={`${companyMain.name}`}
                icon={'tabler:building-store'}/>
                <ItemWithIcon
                  property='CUIL/CUIT'
                  label={companyMain.cuit}
                  icon={'solar:user-id-broken'}/>
                <ItemWithIcon
                  property='Email'
                  label={companyMain.email}
                  icon={'tabler:mail'}/>
                {
                  companyMain.phone ? <ItemWithIcon
                  property='Telefono'
                  label={companyMain.phone}
                  icon={'tabler:phone-call'}/>: null
                }
                {
                  companyMain.address ? <ItemWithIcon
                  property='Telefono'
                  label={companyMain.phone}
                  icon={'tabler:phone-call'}/>: null
                }
                {
                  companyMain.address ? <ItemWithIcon
                  property='Telefono'
                  label={companyMain.phone}
                  icon={'tabler:phone-call'}/>: null
                }
              </Box>
              : <></>
            }

          </CardContent>
        </Card>
      </Grid>
      {/* <Grid item xs={12}>
        <Card>
          <CardContent>
            <div>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                Overview
              </Typography>
              {renderList(overview)}
            </div>
          </CardContent>
        </Card>
      </Grid> */}
    </Grid>
    : <></>
}

export default AboutOverivew
