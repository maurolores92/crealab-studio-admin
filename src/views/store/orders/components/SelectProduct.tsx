
import { Box } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import CustomAutocomplete from 'src/@core/components/mui/autocomplete';
import apiConnector from 'src/services/api.service';
import { setListSelect } from 'src/@core/utils/list.util';
import errorMessage from 'src/components/forms/ErrorMessage';
import CustomTextField from 'src/@core/components/mui/text-field';

const SelectProduct = ({errors, setValue, productId, sx={ mb: 4}, onProductSelect}: any) => {

  const [products, setProducts] = useState<any[]>();
  const [option, setOption] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const get = useCallback(async() => {
    setLoading(true)
    const result: any = await apiConnector.get('/products', {pageSize: 100, page: 0});
    setProducts(result.data);

      if(productId){
        const product = result.countries.find((i: any) => i.id === productId);
        if (product) {
          setOption({value: product.id, key: `${product.id} - ${product.name}` });
        }
      }
      setLoading(false)
  }, [setLoading, setOption, productId]);

  useEffect(() => { get(); }, [get]);

  const handleChange = (event: any, { value }: any) => {
    setValue('productId', value);
    if (typeof onProductSelect === 'function') {
      onProductSelect(products?.find((p: any) => p.id === value));
    }
  }

  return(
    <Box sx={{display: 'flex' }}>
      {
        products ?
         <CustomAutocomplete
            sx={{width: '100%', ...sx}}
            loading={loading}
            defaultValue={option}
            onChange={handleChange}
            options={setListSelect(products, 'id', 'name')}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            getOptionLabel={(option: any) => option.key}
            size='small'
            renderInput={ params =>
              <CustomTextField
                {...params}
                label={'Producto'}
                variant='outlined'
                size="small"
                error={Boolean(errors.productId)}
                {...errorMessage(errors?.productId?.message)}
                fullWidth
              />
            }
          /> : <></>
      }
    </Box>
  );
}

export default SelectProduct;
