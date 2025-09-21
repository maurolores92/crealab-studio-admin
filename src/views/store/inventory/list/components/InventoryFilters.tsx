
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react"
import { Box, Button, CardContent, useMediaQuery, useTheme } from "@mui/material"
import { useForm } from "react-hook-form";
import FilterInput from "src/components/filters/FilterInput"
import * as yup from 'yup';

export const productSchema = yup.object().shape({
  name: yup.string().nullable(),
})


const InventoryFilters = ({apply}: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    register, handleSubmit } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: null,
    }
  });
  const onSubmit = async(data: any) => {
    apply(data)
  }

  const margin = isMobile ? {mb: 2} : {mr: 2}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent sx={{display: {lg: 'flex', xs: 'block'}, justifyContent: 'space-between'}}>
        <Box sx={{display: {lg: 'flex', xs: 'block'}}}>
          <FilterInput
            size={'small'}
            label='Nombre'
            {...register('name')}
            variant='outlined'
            fullWidth={isMobile}
            sx={{ ...margin , minWidth: 200}}
            inputProps={{ style: {paddingBottom: 4, paddingTop: 5}}}
          />
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button
            variant="outlined"
            size="small"
            color="info"
            type="submit"
            startIcon={<Icon icon='tabler:search' />}
            sx={{marginLeft: 2}}>Buscar</Button>
        </Box>
      </CardContent>
    </form>
  )
}

export default InventoryFilters
