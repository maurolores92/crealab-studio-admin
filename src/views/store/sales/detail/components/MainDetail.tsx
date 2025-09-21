import { Card, CardContent, CardHeader, Grid, Typography, Button } from "@mui/material"
import ButtonMenu from "src/@core/components/mui/buttonMenu"
import { useEffect } from "react";
import ClientCard from "src/views/client/shared/ClientCard";
import { Box } from "@mui/system";
import { Icon } from "@iconify/react";
import { constants } from "src/configs/constants";
import apiConnector from "src/services/api.service";
import useStatuses from "src/views/store/orders/components/detail/hooks/useStatuses";

const MainDetail = () => {
  const {statuses, getStatuses, onStatusChange, order, getOrder} = useStatuses();

  const onSubmit = async () => {
    try {
      await apiConnector.put(`/orders/${order.id}/markAsPaid`, {});
      await getOrder();
      await getStatuses();
    } catch (error) {
      alert('Error al marcar como venta');
    }
  };

  useEffect(() => {getStatuses();}, [getStatuses]);

  return <>
    <Card>
      <CardHeader title={`Orden #${order?.id}`} action={<>
        <Box sx={{display: 'flex', justifyContent: 'flex-end', my: 5, mx: 5, alignItems: 'flex-end'}}>
          <ButtonMenu
            variant='tonal'
            label={order?.status?.name}
            color={order?.status?.color}
            options={statuses}
            onChange={onStatusChange}
          />
          <Button
            variant='outlined'
            color="info"
            href={order ? `${constants.api}/orders/${order.id}/pdf` : undefined}
            startIcon={<Icon icon='hugeicons:pdf-01' />}
            sx={{ml: 2}}
          >Descargar</Button>
          {order?.status?.slug !== 'paid' && (
            <Button
              variant='contained'
              color="info"
              startIcon={<Icon icon='hugeicons:pdf-01' />}
              sx={{ml: 2}}
              onClick={onSubmit}
            >Generar Venta</Button>
          )}
        </Box>
      </>}/>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            {order && <ClientCard client={order.client}/>}
          </Grid>
          <Grid item xs={12} lg={8} sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <Box sx={{display: 'flex', justifyContent: 'flex-end', my: 5, mx: 5, alignItems: 'flex-end'}}>
            <Typography variant='h5' color={'success.main'} fontWeight={600} sx={{mr: 4}}>Total:</Typography>
            <Typography variant='h5' color={'success.main'} fontWeight={600}>{order ? `$${order.totalAmount}` : ''}</Typography>
          </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </>
}
export default MainDetail
