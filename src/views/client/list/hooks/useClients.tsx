import { useCallback, useState } from "react";
import apiConnector from "src/services/api.service";
import { defaultDataList, IDataList } from "src/types/apps/listTypes";

const useClients = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });
  const [clients, setClients] = useState<IDataList>({...defaultDataList});

  const getClients = useCallback(async () => {
      const result: any = await apiConnector.get('/client', paginationModel);
      setClients(result);
  }, [paginationModel, setClients]);

  return {clients, getClients, setClients, setPaginationModel, paginationModel}
}
export default useClients