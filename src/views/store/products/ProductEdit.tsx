import { Box, Button, CircularProgress, Grid, Link, Typography, } from "@mui/material"

import { useState } from "react"
import { useRouter } from "next/router"
import apiConnector from "src/services/api.service";
import toast from "react-hot-toast";
import BasicDataCard from "./components/create/BasicDataCard";
import { useNewProductContent } from "./components/create/NewProductContext";
import { Icon } from "@iconify/react";
import LinkNext from 'next/link';

const ProductEdit = () => {
  const {product, handleSubmit} = useNewProductContent();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const submit = async (data: any) => {
    console.log('[ProductEdit] submit called', data);
    setLoading(true);
    try {
      let categories = data.categories;
      if (Array.isArray(categories) && categories.length > 0) {
        if (typeof categories[0] === 'number') {
          categories = categories.map((id: number) => ({ id }));
        } else if (typeof categories[0] === 'object' && categories[0].id) {
          categories = categories.map((c: any) => ({ id: c.id }));
        }
      }
      const payload: any = {
        name: data.name,
        slug: data.slug,
        sku: data.sku,
        description: data.description,
        summary: data.summary,
        price: data.price,
        priceFinal: data.priceFinal,
        stock: data.stock,
        status: data.status || data.statusSlug,
        type: data.type,
        categories
      };
      console.log('[ProductEdit] sending to backend', `/products/${product.id}`, payload);
      await apiConnector.put(`/products/${product.id}`, payload);
      router.push('/productos');
      toast.success('Producto editado con éxito');
      setLoading(false);
    } catch (error) {
      toast.error('Error al crear el producto');
      setLoading(false);
    }
  }

  return product ? <>
    <form onSubmit={(e) => {
      console.log('[ProductEdit] onSubmit FORM');
      handleSubmit(submit)(e);
    }}>
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12} sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
          <Box>
            <Typography variant="h6">Producto</Typography>
            <Typography variant="h4">{product.name}</Typography>
            <Typography>
              Categorias: {
                product.categories.map((c: any, index: number) =>
                  <Link key={index} sx={{mr: 2}} component={LinkNext} href={`/categorias/detalle/${c.id}`}>{c.name}</Link>
                )
              }
            </Typography>
          </Box>
          <Box sx={{mt: 8, display: 'flex', justifyContent: 'flex-end'}}>
            <Button variant='contained' color='success' type="submit" disabled={loading} startIcon={loading ?
              <CircularProgress size={24}/>:
              <Icon icon='tabler:plus' />}
              onClick={() => {console.log('[ProductEdit] Guardar button clicked')}}
            >
              Guardar
            </Button>
          </Box>
        </Grid>
        <Grid item lg={12} xs={12}>
          <BasicDataCard />
        </Grid>
      </Grid>

    </form>
    </>
  : <></>
}

export default ProductEdit
