import { Card, CardHeader, CardContent, Typography, Box} from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import Icon from 'src/@core/components/icon'
import { useAuth } from 'src/hooks/useAuth'
import { DateTime } from 'luxon'
import UseBgColor from 'src/@core/hooks/useBgColor'
import ProfilePicture from 'src/components/images/ProfilePicture'
import ModalChangePassword from './ModalChangePassword'

const UserProfileHeader = () => {
  const { user } = useAuth();
  const bgColors = UseBgColor()

  const getJoinDate = (date: string) => {
    return DateTime.fromISO(date, {locale: 'es-US'}).toFormat('MMMM yyyy');
  }


  return user !== null ? (
    <Card>
      <CardHeader
        sx={{
          height: 120,
          backgroundColor: bgColors.primaryLight
        }}
      />
      <CardContent
        sx={{
          pt: 0,
          mt: -8,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}
      >
        <ProfilePicture src={'/images/avatars/15.png'} alt='profile-picture' />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between'],
            position: 'relative'
          }}
        >
          <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
            <Typography variant='h5' sx={{ mb: 2.5 }}>
              {user.name} {user.lastName}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start']
              }}
            >
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'text.secondary' } }}>
                <CustomChip rounded label={user.role.name} skin='light' color='primary' sx={{fontWeight: 600}} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'text.secondary' } }}>
                <Icon fontSize='1.25rem' icon='tabler:calendar' />
                <Typography sx={{ color: 'text.secondary' }}>Desde {getJoinDate(user.createdAt)}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ position: 'absolute', right: 0, bottom: 0 }}>
            <ModalChangePassword />
          </Box>
        </Box>
      </CardContent>
    </Card>
  ) : null
}

export default UserProfileHeader
