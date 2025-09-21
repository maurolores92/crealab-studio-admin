import { Box } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import CustomAutocomplete from 'src/@core/components/mui/autocomplete';
import apiConnector from 'src/services/api.service';
import { setListSelect } from 'src/@core/utils/list.util';
import errorMessage from 'src/components/forms/ErrorMessage';
import CustomTextField from 'src/@core/components/mui/text-field';

const SelectInventory = ({errors, setValue, inventoryId, sx={ mb: 4}, onProductSelect, refreshKey}: any) => {

  const [inventory, setInventory] = useState<any[]>();
  const [option, setOption] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const get = useCallback(async() => {
    setLoading(true)
    const result: any = await apiConnector.get('/inventory', {pageSize: 100, page: 0});
    setInventory(result.data);

      if(inventoryId && result.data){
        const inventoryItem = result.data.find((i: any) => i.id === inventoryId);
        if (inventoryItem) {
          setOption({value: inventoryItem.id, key: `${inventoryItem.id} - ${inventoryItem.name}` });
        }
      }
      setLoading(false)
  }, [setLoading, setOption, inventoryId]);

  useEffect(() => { get(); }, [get, refreshKey]);

  const handleChange = (event: any, option: any) => {
    setValue('inventoryId', option?.value);
    console.log('Producto seleccionado:', option);
    if (typeof onProductSelect === 'function') {
      onProductSelect(option);
    }
  }

  return(
      <Box sx={{display: 'flex' }}>
      {
        inventory ?
         <CustomAutocomplete
            sx={{width: '100%', ...sx}}
            loading={loading}
            defaultValue={option}
            onChange={handleChange}
            options={setListSelect(inventory, 'id', 'name')}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            getOptionLabel={(option: any) => option.key}
            size='small'
            renderInput={ params =>
              <CustomTextField
                {...params}
                label={'Producto'}
                variant='outlined'
                size="small"
                error={Boolean(errors.inventoryId)}
                {...errorMessage(errors?.inventoryId?.message)}
                fullWidth
              />
            }
          /> : <></>
      }

    </Box>
  );
}

export default SelectInventory;
