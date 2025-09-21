import { Box } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import CustomAutocomplete from 'src/@core/components/mui/autocomplete';
import apiConnector from 'src/services/api.service';
import { setListSelect } from 'src/@core/utils/list.util';
import errorMessage from 'src/components/forms/ErrorMessage';
import CustomTextField from 'src/@core/components/mui/text-field';

const SelectProvince = ({errors, setValue, id, field, sx={}}: any) => {

  const [provinces, setProvinces] = useState<any[]>();
  const [option, setOption] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const get = useCallback(async() => {
    setLoading(true)
    const result: any = await apiConnector.get('/client/address/provinces');
    setProvinces(result);
    if(id){
      const provinceSelected = result.find((i: any) => i.id === id);
      if (provinceSelected) {
        setOption({value: provinceSelected.id, key: provinceSelected.name });
      }
    }
    setLoading(false)
  }, [setLoading, setOption, id]);

  useEffect(() => { get(); }, [get]);

  const handleChange = (event: any, data: any) => {
    if(data) {
      setValue(field, data.value);
    }
  }

  return(
    <Box sx={{display: 'flex' }}>
      {
        provinces ?
         <CustomAutocomplete
            sx={{width: '100%', ...sx}}
            loading={loading}
            defaultValue={option}
            onChange={handleChange}
            options={setListSelect(provinces, 'id', 'name')}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            getOptionLabel={(option: any) => option.key}
            size='small'
            renderInput={ params =>
              <CustomTextField
                {...params}
                label={'Provincia'}
                variant='outlined'
                size="small"
                error={Boolean(errors[field])}
                {...errorMessage(errors[field]?.message)}
                fullWidth
              />

            }
          /> : <></>
      }

    </Box>
  );
}

export default SelectProvince;
