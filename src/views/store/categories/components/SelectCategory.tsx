import { useCallback, useEffect, useState } from 'react';

import CustomAutocomplete from 'src/@core/components/mui/autocomplete';
import apiConnector from 'src/services/api.service';
import { setListSelect } from 'src/@core/utils/list.util';
import errorMessage from 'src/components/forms/ErrorMessage';
import CustomTextField from 'src/@core/components/mui/text-field';
import FilterInput from 'src/components/filters/FilterInput';

const SelectCategory = ({errors, setValue, categoriesId, sx={ mb: 4}, fullWidth = true, filter = false}: any) => {

  const [categories, setCategories] = useState<any[]>([]);
  const [option, setOption] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const get = useCallback(async() => {
    setLoading(true)
    const result: any = await apiConnector.get('/products/categories', {pageSize: 30, page: 0});
    setCategories(result.data);

      if(categoriesId && categoriesId.length){
        setValue('categories', categoriesId);
        const categoriesSelected = result.data.filter((i: any) => categoriesId.includes(i.id));
        if (categoriesSelected && categoriesSelected.length) {
          setOption(categoriesSelected.map((category: any) => ({value: category.id, key: category.name })));
        }
      }
      setLoading(false)
  }, [setLoading, setOption, categoriesId]);

  useEffect(() => { get(); }, [get]);

  const handleChange = (event: any, data: any) => {
    const values = data.map((d: {key: string, value: number}) => d.value);
    setValue('categories', values);
  }

  const inputProps = (params: any) => ({
    ...params,
    label:'Categorias',
    variant:'outlined',
    size:'small',
    error:Boolean(errors.categories),
    ...errorMessage(errors?.categories?.message),
    fullWidth
  })

  return categories.length ? 
    <CustomAutocomplete
      sx={{width: '100%', ...sx}}
      loading={loading}
      defaultValue={option}
      onChange={handleChange}
      multiple
      options={setListSelect(categories, 'id', 'name')}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={(option: any) => option.key}
      size='small'
      renderInput={ params => 
        filter ? 
        <FilterInput {...inputProps(params)} /> :
        <CustomTextField {...inputProps(params)}/>
      }
    /> : <></>
}

export default SelectCategory;
