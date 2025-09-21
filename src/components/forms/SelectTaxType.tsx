import { Box } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import CustomAutocomplete from 'src/@core/components/mui/autocomplete';
import apiConnector from 'src/services/api.service';
import { setListSelect } from 'src/@core/utils/list.util';
import errorMessage from 'src/components/forms/ErrorMessage';
import CustomTextField from 'src/@core/components/mui/text-field';

const SelectTaxType = ({errors, setValue, taxTypeId, sx={ mb: 4}}: any) => {

  const [taxTypes, setTaxTypes] = useState<any[]>();
  const [option, setOption] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const get = useCallback(async() => {
    setLoading(true)
    const result: any = await apiConnector.get('/taxType');
    setTaxTypes(result);

      if(taxTypeId){
        const type = result.find((i: any) => i.id === taxTypeId);
        if (type) {
          setOption({value: type.id, key: `${type.percentage}` });
        }
      }
      setLoading(false)
  }, [setLoading, setOption, taxTypeId]);

  useEffect(() => { get(); }, [get]);

  const handleChange = (event: any, data: any) => {
    if(data) {
      setValue('taxTypeId', data.value);
    }
  }

  return(
    <Box sx={{display: 'flex' }}>
      {
        taxTypes ?
         <CustomAutocomplete
            sx={{width: '100%', ...sx}}
            loading={loading}
            defaultValue={option}
            onChange={handleChange}
            options={setListSelect(taxTypes, 'id', 'percentage')}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            getOptionLabel={(option: any) => option.key}
            size='small'
            renderInput={ params =>
              <CustomTextField
                {...params}
                label={'Impuesto (%)'}
                variant='outlined'
                size="small"
                error={Boolean(errors.taxTypeId)}
                {...errorMessage(errors?.taxTypeId?.message)}
                fullWidth
              />

            }
          /> : <></>
      }

    </Box>
  );
}

export default SelectTaxType;
