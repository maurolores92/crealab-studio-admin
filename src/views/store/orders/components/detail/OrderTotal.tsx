import { Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { useOrderDetail } from "./hooks/OrderDetailContext";

const OrderTotal = () => {
  const{ order } = useOrderDetail();
  
  return <>
    <Card>
      <CardContent>
        <Grid container spacing={2} sx={{display: {lg: 'flex'}, justifyContent: 'flex-end'}}>
          <Grid item xs={12} lg={4}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography variant='h6' fontWeight={600}>Subtotal:</Typography>
              <Typography variant='h6' fontWeight={600}>${order.subTotal}</Typography>
            </Box>
            {/* <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography variant='h6'>Descuento:</Typography>
              <Typography variant='h6'>${order.discount}</Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography variant='h6'>Envío:</Typography>
              <Typography variant='h6'>${order.shippingAmount}</Typography>
            </Box> */}
            <Divider sx={{my: 2}}/>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography variant='h5' color={'success.main'} fontWeight={600}>Total:</Typography>
              <Typography variant='h5' color={'success.main'} fontWeight={600}>${order.totalAmount}</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </>
}
export default OrderTotal