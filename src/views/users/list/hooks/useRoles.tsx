import { useCallback, useState } from 'react';
import apiConnector from 'src/services/api.service';

const useRoles = () => {
  const [roles, setRoles] = useState([]);

  const getRoles = useCallback(async () => {
    try {
      const result: any = await apiConnector.get('/user/roles');
      setRoles(result.data);
    } catch (error) {
      setRoles([]);
    }
  }, []);

  return { roles, getRoles };
};

export default useRoles;
