import { Box } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import CustomAutocomplete from 'src/@core/components/mui/autocomplete';
import apiConnector from 'src/services/api.service';
import { setListSelect } from 'src/@core/utils/list.util';
import errorMessage from 'src/components/forms/ErrorMessage';
import CustomTextField from 'src/@core/components/mui/text-field';

const SelectProvider = ({errors, setValue, providerId, sx={ mb: 4}}: any) => {

  const [providers, setProviders] = useState<any[]>([]);
  const [option, setOption] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const get = useCallback(async() => {
    setLoading(true)
    const result: any = await apiConnector.get('/provider', {pageSize: 100, page: 0});
    setProviders(result.data);

      if(providerId){
        const category = result.data.find((i: any) => i.id === providerId);
        if (category) {
          setOption({value: category.id, key: `${category.id} - ${category.name}` });
        }
        
      }
      setLoading(false)
  }, [setLoading, setOption, setProviders, providerId]);

  useEffect(() => { get(); }, [get]);

  const handleChange = (event: any, { value }: any) => {
    setValue('providerId', value);
  }

  return(
    <Box sx={{display: 'flex' }}>
      {
        providers.length ? 
         <CustomAutocomplete
            sx={{width: '100%', ...sx}}
            loading={loading}
            defaultValue={option}
            onChange={handleChange}
            options={setListSelect(providers, 'id', 'id', 'name')}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            getOptionLabel={(option: any) => option.key}
            size='small'
            renderInput={ params => 
              <CustomTextField
                {...params}
                label={'Proveedor'}
                variant='outlined'
                size="small"
                error={Boolean(errors.provodierId)}
                {...errorMessage(errors?.provodierId?.message)}
                fullWidth
              />
            }
          /> : <></>
      }
     
    </Box>
  );
}

export default SelectProvider;
