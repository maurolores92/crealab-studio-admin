import { Button, Grid, Link, Typography, CircularProgress, Box } from "@mui/material"
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react"
import apiConnector from "src/services/api.service";
import ProductBasicInfoCard from "./components/detail/ProductBasicInfoCard";
import ProductDescriptionCard from "./components/detail/ProductDescriptionCard";
import ProductGallery from "./components/detail/ProductGallery";
import LinkNext from 'next/link';
import { Icon } from "@iconify/react";
import MainHeader from "src/components/boxes/MainHeader";

const ProductDetail = () => {
  const [product, setProduct] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const {id} = router.query;

  const get = useCallback(async() => {
    if (!id) return;
    setLoading(true);
    try {
      const result: any = await apiConnector.get(`/products/${id}`);
      setProduct(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);
  useEffect(() => {get();}, [get])

  if (loading || !product || !id) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
      <CircularProgress />
    </Box>;
  }

  return <>
    <Grid container spacing={2}>
      <MainHeader title={product.name} type='Producto' actions={<Button
          variant="contained"
          startIcon={<Icon icon={'tabler:pencil'} />}
          onClick={() => router.push(`/productos/editar/${id}`)}>
            Editar
          </Button>}
      >
        <Typography>
          Categorias: {
            product.categories.map((c: any, index: number) =>
              <Link key={index} sx={{mr: 2}} component={LinkNext} href={`/categorias/detalle/${c.id}`}>{c.name}</Link>
            )
          }
        </Typography>
      </MainHeader>

      <Grid item lg={5} xs={12}>
        <ProductBasicInfoCard product={product} refresh={get}/>
      </Grid>
      <Grid item lg={7} xs={12}>
        <ProductDescriptionCard product={product} refresh={get} />
        <ProductGallery
          gallery={[
            ...(Array.isArray(product.images) ? product.images : []),
            ...((product.imageUrl && (!product.images || !product.images.some((img: any) => img.src === product.imageUrl)))
              ? [{ id: 'main', src: product.imageUrl }] : [])
          ]}
          productId={product.id}
          refresh={get}
        />
      </Grid>
    </Grid>
    </>
}

export default ProductDetail
