import { OrderDetailProvider } from "src/views/store/orders/components/detail/hooks/OrderDetailContext";
import OrderDetail from "src/views/store/orders/OrderDetail";

const OrderDetailPage = () => {
  
  return <OrderDetailProvider>
    <OrderDetail />
  </OrderDetailProvider>
}

export default OrderDetailPage;