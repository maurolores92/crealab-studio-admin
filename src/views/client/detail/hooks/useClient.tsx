import { useCallback } from "react";
import { useClientDetail } from "./ClientDetailContext";
import apiConnector from "src/services/api.service";
import { useRouter } from "next/router";

const useClient = () => {

  const router = useRouter();
  const { id } = router.query;
  const {client, setClient} = useClientDetail();

  const getClient = useCallback(async () => {
    const result: any = await apiConnector.get(`/client/${id}`);
    setClient(result.data);
  }, [setClient]);

  return {client, getClient};
}
export default useClient