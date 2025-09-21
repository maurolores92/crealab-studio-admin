import { Grid } from "@mui/material"
import OrderItemsList from "./components/detail/OrderItemsList"
import { useEffect } from "react";
import MainDetail from "./components/detail/MainDetail";
import HistoryCard from "src/components/cards/HistoryCard";
import useOrder from "./components/detail/hooks/useOrder";
import useOrderHistory from "./components/detail/hooks/useHistory"

const OrderDetail = () => {
  const {order, getOrder } = useOrder();
  const {history, getOrderHistory} = useOrderHistory();

  useEffect(() => {getOrder(); getOrderHistory();}, [getOrder, getOrderHistory]);

  return <>
  {
    order ?
    <Grid container spacing={2}>
      <Grid item lg={12} xs={12}>
        <MainDetail/>
      </Grid>
      <Grid item lg={4} xs={12}>
        <HistoryCard history={history}/>
      </Grid>
      <Grid item lg={8} xs={12}>
        <OrderItemsList items={order.items} refresh={getOrder}/>
      </Grid>
    </Grid>
    : <></>
  }
  </>
}

export default OrderDetail
