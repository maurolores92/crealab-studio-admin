import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import apiConnector from "src/services/api.service";
import useOrder from "./useOrder";
import useOrderHistory from "./useHistory";

const useStatuses = () => {
  const [statuses, setStatuses] = useState<any>([]);
  const {order, getOrder} = useOrder();
  const {getOrderHistory} = useOrderHistory();

  const getStatuses = useCallback(async() => {
    try {
      const result: any = await apiConnector.get('/orders/status');
      setStatuses(result);
    } catch (error) {
      console.log(error);
    }
  }, [setStatuses]);

  const onStatusChange = async (status: any) => {
    try {
      await apiConnector.put('/orders/status', {id: order.id, statusId: status.id});
      getOrder();
      getOrderHistory();
      toast.success('Estatus cambiado');
    } catch (error) {
      toast.error('Error al cambiar el estatus');
    }

  }

  return {statuses, getStatuses, setStatuses, onStatusChange, order, getOrder};
}

export default useStatuses;
