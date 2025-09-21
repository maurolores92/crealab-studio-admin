import { Box } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import CustomAutocomplete from 'src/@core/components/mui/autocomplete';
import apiConnector from 'src/services/api.service';
import { setListSelect } from 'src/@core/utils/list.util';
import errorMessage from 'src/components/forms/ErrorMessage';
import CustomTextField from 'src/@core/components/mui/text-field';

const SelectBrand = ({errors, setValue, brandId, sx={ mb: 4}}: any) => {

  const [brands, setBrands] = useState<any[]>();
  const [option, setOption] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const get = useCallback(async() => {
    setLoading(true)
    const result: any = await apiConnector.get('/brand', {pageSize: 100, page: 0});
    setBrands(result.data);

      if(brandId){
        const brand = result.data.find((i: any) => i.id === brandId);
        if (brand) {
          setOption({value: brand.id, key: `${brand.id} - ${brand.name}` });
        }
      }
      setLoading(false)
  }, [setLoading, setOption, brandId]);

  useEffect(() => { get(); }, [get]);

  const handleChange = (event: any, { value }: any) => {
    setValue('brandId', value);
  }

  return(
    <Box sx={{display: 'flex' }}>
      {
        brands ? 
         <CustomAutocomplete
            sx={{width: '100%', ...sx}}
            loading={loading}
            defaultValue={option}
            onChange={handleChange}
            options={setListSelect(brands, 'id', 'id', 'name')}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            getOptionLabel={(option: any) => option.key}
            size='small'
            renderInput={ params => 
              <CustomTextField
                {...params}
                label={'Marca'}
                variant='outlined'
                size="small"
                error={Boolean(errors.brandId)}
                {...errorMessage(errors?.brandId?.message)}
                fullWidth
              />
            }
          /> : <></>
      }
     
    </Box>
  );
}

export default SelectBrand;
