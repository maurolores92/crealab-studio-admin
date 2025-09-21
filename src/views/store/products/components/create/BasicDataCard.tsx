
import CustomTextField from "src/@core/components/mui/text-field";
import errorMessage from "src/components/forms/ErrorMessage";
import Editor from "src/components/forms/Editor";
import { useNewProductContent } from "./NewProductContext";
import { Card, CardContent, CardHeader, Grid, InputAdornment, MenuItem, Typography, Autocomplete } from "@mui/material";
import { Icon } from "@iconify/react";
import SelectCategory from "src/views/store/categories/components/SelectCategory";
import { useEffect, useState, useCallback } from "react";
import apiConnector from "src/services/api.service";

const BasicDataCard = () => {
  const { register, errors, setValue, product, watch } = useNewProductContent();
  const categoriesId = product?.categories?.map((c: any) => c.category.id) || [];
  const [inventoryList, setInventoryList] = useState<any[]>([]);
  const [selectedInsumos, setSelectedInsumos] = useState<any[]>([]);

  const getInventory = useCallback(() => {
    apiConnector.get('/inventory/all').then((res: any) => {
      setInventoryList(res);
    });
  }, []);

  useEffect(() => {
    getInventory();
  }, [getInventory]);


  const handleInsumoChange = (event: any, value: any[]) => {
    setSelectedInsumos(value);
    setValue('insumos', value);
  };

  const handleCantidadChange = (index: number, cantidad: number) => {
    const updated = [...selectedInsumos];
    updated[index].cantidad = cantidad;
    setSelectedInsumos(updated);
    setValue('insumos', updated);
  };

  const peso = typeof watch === 'function' ? Number(watch('weight')) || 0 : 0;
  const tiempo = typeof watch === 'function' ? Number(watch('time')) || 0 : 0;

  useEffect(() => {
    if (peso > 0 || tiempo > 0) {
      const precioCosto = (15 * peso) + (8.2 * tiempo);
      setValue('price', precioCosto.toFixed(2));
      let precioVenta = precioCosto * 2.3;
      precioVenta = Math.ceil(precioVenta / 500) * 500;
      setValue('priceFinal', precioVenta);
    }
  }, [peso, tiempo, setValue]);

  return <Card sx={{mb: 2}}>
  <CardHeader title='General' />
    <CardContent>
      <Grid container spacing={2}>
      <Grid item lg={12} xs={12}>
        <CustomTextField
          label={'Nombre'}
          fullWidth
          {...register('name')}
          error={Boolean(errors.name)}
          {...errorMessage(errors?.name?.message)}
        />
      </Grid>
      <Grid item lg={12} xs={12}>
        <SelectCategory setValue={setValue} errors={errors} categoriesId={categoriesId} />
      </Grid>
      <Grid item lg={6} xs={12}>
        <CustomTextField
          label={'SKU'}
          fullWidth
          {...register('sku')}
          error={Boolean(errors.sku)}
          {...errorMessage(errors?.sku?.message)}
        />
      </Grid>
      <Grid item lg={4} xs={12}>
        <CustomTextField
          select
          label={'Estatus'}
          fullWidth
          {...register('statusSlug')}
          error={Boolean(errors.status)}
          value={product ? product?.status?.slug : 'published'}
          {...(errors.status && errorMessage(errors?.status.message))}
        >
          <MenuItem value='draft'>Pendiente</MenuItem>
          <MenuItem value='published'>Publicado</MenuItem>
        </CustomTextField>
      </Grid>
      <Grid item lg={2} xs={12}>
        <CustomTextField
          label={'Stock'}
          fullWidth
          type='number'
          inputProps={{min: 0}}
          {...register('stock')}
          error={Boolean(errors.stock)}
          {...errorMessage(errors?.stock?.message)}
        />
      </Grid>
      <Grid item lg={6} xs={12}>
        <CustomTextField
          label={'Peso (Gramos)'}
          fullWidth
          {...register('weight')}
          error={Boolean(errors.weight)}
          {...errorMessage(errors?.weight?.message)}
        />
      </Grid>
      <Grid item lg={6} xs={12}>
        <CustomTextField
          label={'Tiempo de preparación (minutos)'}
          fullWidth
          {...register('time')}
          error={Boolean(errors.time)}
          {...errorMessage(errors?.time?.message)}
        />
      </Grid>
      <Grid item lg={6} xs={12}>
        <CustomTextField
          label={'Precio de Costo'}
          fullWidth
          {...register('price')}
          error={Boolean(errors.price)}
          {...errorMessage(errors?.price?.message)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Icon fontSize='1.25rem' icon={'pepicons-pop:dollar'} />
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Grid item lg={6} xs={12}>
        <CustomTextField
          label={'Precio de Venta'}
          fullWidth
          {...register('priceFinal')}
          error={Boolean(errors.priceFinal)}
          {...errorMessage(errors?.priceFinal?.message)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Icon fontSize='1.25rem' icon={'pepicons-pop:dollar'} />
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Grid item lg={12} xs={12}>
        <CustomTextField
          label={'Sumario'}
          multiline
          rows={4}
          fullWidth
          {...register('summary')}
          error={Boolean(errors.summary)}
          {...errorMessage(errors?.summary?.message)}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant='h6' sx={{mb:2}}>Insumos y consumo</Typography>
        <Autocomplete
          multiple
          options={inventoryList}
          getOptionLabel={(option) => option.name}
          value={selectedInsumos}
          onChange={handleInsumoChange}
          renderInput={(params) => (
            <CustomTextField {...params} label='Selecciona insumos/materiales' fullWidth />
          )}
        />
        {selectedInsumos.map((insumo, idx) => (
          <Grid container spacing={1} key={insumo.id} sx={{mt:1}} alignItems='center'>
            <Grid item xs={7}>
              <Typography>{insumo.name} ({insumo.unit})</Typography>
            </Grid>
            <Grid item xs={5}>
              <CustomTextField
                label='Cantidad a consumir'
                type='number'
                inputProps={{min: 0}}
                value={insumo.cantidad || ''}
                onChange={e => handleCantidadChange(idx, Number(e.target.value))}
                fullWidth
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant='h6' sx={{mb:2}}>Descripción</Typography>
        <Editor
          setValue={setValue}
          defaultValue={product?.description}
          name='description'
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant='h6' sx={{mb:2}}>Descripción adicional</Typography>
        <Editor
          setValue={setValue}
          defaultValue={product?.aditionalDescription}
          name='aditionalDescription'
        />
      </Grid>
    </Grid>
  </CardContent>
</Card>
}

export default BasicDataCard
