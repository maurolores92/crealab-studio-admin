import { Box } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import CustomAutocomplete from 'src/@core/components/mui/autocomplete';
import apiConnector from 'src/services/api.service';
import { setListSelect } from 'src/@core/utils/list.util';
import errorMessage from 'src/components/forms/ErrorMessage';
import CustomTextField from 'src/@core/components/mui/text-field';

const SelectClient = ({errors, setValue, clientId, sx={ mb: 4}}: any) => {

  const [clients, setClients] = useState<any[]>();
  const [option, setOption] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const get = useCallback(async() => {
    setLoading(true)
    const result: any = await apiConnector.get('/client', {pageSize: 100, page: 0});
    setClients(result.data);

      if(clientId){
        const client = result.countries.find((i: any) => i.id === clientId);
        if (client) {
          setOption({value: client.id, key: `${client.id} - ${client.name}` });
        }
      }
      setLoading(false)
  }, [setLoading, setOption, clientId]);

  useEffect(() => { get(); }, [get]);

  const handleChange = (event: any, { value }: any) => {
    setValue('clientId', value);
  }

  return(
    <Box sx={{display: 'flex' }}>
      {
        clients ?
         <CustomAutocomplete
            sx={{width: '100%', ...sx}}
            loading={loading}
            defaultValue={option}
            onChange={handleChange}
            options={setListSelect(clients, 'id', 'name', 'lastName')}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            getOptionLabel={(option: any) => option.key}
            size='small'
            renderInput={ params =>
              <CustomTextField
                {...params}
                label={'Cliente'}
                variant='outlined'
                size="small"
                error={Boolean(errors.clientId)}
                {...errorMessage(errors?.clientId?.message)}
                fullWidth
              />

            }
          /> : <></>
      }

    </Box>
  );
}

export default SelectClient;
