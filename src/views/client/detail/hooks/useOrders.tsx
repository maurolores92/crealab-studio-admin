import { useCallback } from "react";
import { useClientDetail } from "./ClientDetailContext";
import apiConnector from "src/services/api.service";
import { useRouter } from "next/router";

const useOrders = () => {
  
  const router = useRouter();
  const { id } = router.query;
  const {orders, setOrders} = useClientDetail();

  const getOrders = useCallback(async (paginationModel: any) => {
    await apiConnector.get(`/orders/byClient/${id}`, paginationModel);
    
  }, [setOrders]);

  return {orders, getOrders};
}
export default useOrders