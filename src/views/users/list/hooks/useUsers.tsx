import { useCallback, useState } from "react";
import apiConnector from "src/services/api.service";
import { defaultDataList, IDataList } from "src/types/apps/listTypes";

const useUsers = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });
  const [users, setUsers] = useState<IDataList>({...defaultDataList});

  const getUsers = useCallback(async () => {
      const result: any = await apiConnector.get('/user', paginationModel);
      setUsers(result);
  }, [paginationModel, setUsers]);

  return {users, getUsers, setUsers, setPaginationModel, paginationModel}
}
export default useUsers
