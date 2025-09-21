import { useRouter } from "next/router";
import { useCallback } from "react";
import apiConnector from "src/services/api.service";
import { useOrderDetail } from "./OrderDetailContext";

const useOrderHistory = () => {
  const router = useRouter();
  const {id} = router.query;

  const {history, setHistory} = useOrderDetail();

  const getOrderHistory = useCallback(async () => {
    try {
        const result: any = await apiConnector.get(`/orders/history/${id}`);
        setHistory(result);
    } catch (error) {
      console.log(error);
    }
  }, [id, setHistory]);

  return {history, getOrderHistory, setHistory};
};

export default useOrderHistory;