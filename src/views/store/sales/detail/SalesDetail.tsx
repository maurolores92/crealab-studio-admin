import { Grid } from "@mui/material"
import { useEffect } from "react";
import MainDetail from "./components/MainDetail";
import SalesItemsList from "./components/SalesItemsList";
import useOrder from "../../orders/components/detail/hooks/useOrder";

const SalesDetail = () => {
  const {order, getOrder } = useOrder();

  useEffect(() => {getOrder()}, [getOrder]);

  return <>
  {
    order ?
    <Grid container spacing={2}>
      <Grid item lg={12} xs={12}>
        <MainDetail/>
      </Grid>
      <Grid item lg={12} xs={12}>
        <SalesItemsList items={order.items} refresh={getOrder}/>
      </Grid>
    </Grid>
    : <></>
  }
  </>
}

export default SalesDetail
