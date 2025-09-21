import { Box, Grid, Typography } from "@mui/material"


const MainHeader = ({type, title, children, actions}: any) => {
  return <Grid item lg={12} xs={12} sx={{ 
    display: {xs: 'block', sm: 'flex'}, 
    justifyContent: 'space-between',
    mb: 2
  }}>
  <Box>
    <Typography variant="h6">{type}</Typography>
    <Typography variant="h4">{title}</Typography>
    {children}
  </Box>
  <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
    {actions}
  </Box>
</Grid>
}
export default MainHeader