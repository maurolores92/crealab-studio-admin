import { useRouter } from "next/router";
import { useCallback } from "react"
import apiConnector from "src/services/api.service"
import { useOrderDetail } from "./OrderDetailContext";

const useOrder = () => {
  const router = useRouter();
  const {id} = router.query;
  const {order, setOrder} = useOrderDetail();

  const getOrder = useCallback(async () => {
    try {
      const result: any = await apiConnector.get(`/orders/${id}`)
      setOrder(result.data)
    } catch (error) {
      console.log(error)
    }
  }, [id, setOrder]);

  return { order, getOrder, setOrder }
}
export default useOrder