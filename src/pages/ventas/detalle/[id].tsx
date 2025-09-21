import { OrderDetailProvider } from "src/views/store/orders/components/detail/hooks/OrderDetailContext";
import SalesDetail from "src/views/store/sales/detail/SalesDetail";

const OrderDetailPage = () => {

  return <OrderDetailProvider>
    <SalesDetail />
  </OrderDetailProvider>
}

export default OrderDetailPage;
