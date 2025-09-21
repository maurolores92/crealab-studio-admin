import { Grid } from '@mui/material';
import UserProfileHeader from './components/UserProfileHeader';
import AboutOverivew from './components/AboutOverivew';
import { useAuth } from 'src/hooks/useAuth';

const ProfileView = () => {
  const { user } = useAuth();

  return <>
  {
    user ?
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <UserProfileHeader />
      </Grid>
      <Grid item lg={4}>
        <Grid item xs={12}>
          <AboutOverivew />
        </Grid>
      </Grid>
      <Grid item lg={8}>
      
      </Grid>
    </Grid>
    : <></>
  }
  </>
}

export default ProfileView;
