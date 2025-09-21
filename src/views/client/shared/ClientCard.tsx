
import { Icon } from "@iconify/react";
import { Avatar, Typography, Box, useTheme} from "@mui/material"
import BoxBordered from "src/components/boxes/BoxBordered";

const ClientCard = ({client}: any) => {
  const theme = useTheme();

  return <>
    <BoxBordered sx={{display: 'flex' }}>
          <Box>
            <Avatar 
              variant="rounded"
              sx={{width: 80, height: 80}} 
              src={client.avatar} 
            />
          </Box>
          <Box>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 2, ml: 3}}>
              <Box >
                <Typography variant="h4">{client.name} {client.lastName || ''}</Typography>
                <Typography>
                  Cliente {' '}#{client.id}
                </Typography>
                <Typography>
                  <Icon icon='majesticons:mail-line' style={{marginRight: 5, color: theme.palette.error.main}} /> {' '}{client.email}
                </Typography>
                <Typography>
                  <Icon icon='tabler:phone-call' style={{marginRight: 5, color: theme.palette.info.main}}/> {' '}{client.phone}
                </Typography>
              </Box>
            </Box>
          </Box>
        </BoxBordered>
  </>
}

export default ClientCard