import { Grid } from "@mui/material"
import OrderItemsList from "./components/detail/OrderItemsList"
import { useEffect } from "react";
import MainDetail from "./components/detail/MainDetail";
import useOrder from "./components/detail/hooks/useOrder";

const OrderDetail = () => {
  const {order, getOrder } = useOrder();

  useEffect(() => {getOrder();}, [getOrder]);

  return <>
  {
    order ?
    <Grid container spacing={2}>
      <Grid item lg={12} xs={12}>
        <MainDetail/>
      </Grid>
      <Grid item lg={12} xs={12}>
        <OrderItemsList items={order.items} refresh={getOrder}/>
      </Grid>
    </Grid>
    : <></>
  }
  </>
}

export default OrderDetail
