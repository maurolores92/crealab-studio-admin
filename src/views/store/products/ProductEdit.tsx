import { Box, Button, CircularProgress, Grid, Link, Typography, } from "@mui/material"

import { useState } from "react"
import apiConnector from "src/services/api.service";
import toast from "react-hot-toast";
import BasicDataCard from "./components/create/BasicDataCard";
import { useNewProductContent } from "./components/create/NewProductContext";
import { Icon } from "@iconify/react";
import LinkNext from 'next/link';

const ProductEdit = () => {
  const {product, handleSubmit} = useNewProductContent();
  const [loading, setLoading] = useState<boolean>(false);

  const submit = async (data: any) => {
    setLoading(true);
    try {

      await apiConnector.put(`/products/${product.id}`, {...data});
      toast.success('Producto editado con éxito');
      setLoading(false);
    } catch (error) {
      toast.error('Error al crear el producto');
      setLoading(false);
    }
  }

  return product ? <>
    <form onSubmit={handleSubmit(submit)}>
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12} sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
          <Box>
            <Typography variant="h6">Producto</Typography>
            <Typography variant="h4">{product.name}</Typography>
            <Typography>Categorias: {
              product.categories.map((c: any, index: number) =>
                <Link key={index} sx={{mr: 2}} component={LinkNext} href={`/categorias/detalle/${c.category.id}`}>{c.category.name}</Link>
              )
            }
        </Typography>
          </Box>
          <Box sx={{mt: 8, display: 'flex', justifyContent: 'flex-end'}}>
            <Button variant='contained' color='success' type="submit" disabled={loading} startIcon={loading ?
              <CircularProgress size={24}/>:
              <Icon icon='tabler:plus' />}>
              Guardar
            </Button>
          </Box>
        </Grid>
        <Grid item lg={7} xs={12}>
          <BasicDataCard />
        </Grid>
      </Grid>

    </form>
    </>
  : <></>
}

export default ProductEdit
