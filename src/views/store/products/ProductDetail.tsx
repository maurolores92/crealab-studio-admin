import { Button, Grid, Link, Typography, } from "@mui/material"
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react"
import apiConnector from "src/services/api.service";
import StockDistributionCard from "./components/detail/StockDistributionCard";
import ProductBasicInfoCard from "./components/detail/ProductBasicInfoCard";
import ProductDescriptionCard from "./components/detail/ProductDescriptionCard";
import ProductGallery from "./components/detail/ProductGallery";
import HistoryCard from "src/components/cards/HistoryCard";
import LinkNext from 'next/link';
import { Icon } from "@iconify/react";
import MainHeader from "src/components/boxes/MainHeader";

const ProductDetail = () => {
  const [product, setProduct] = useState<any>();
  const router = useRouter();
  const {id} = router.query;

  const get = useCallback(async() => {
    try {
      const result: any = await apiConnector.get(`/products/${id}`);
      setProduct(result.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  useEffect(() => {get();}, [get])

  return product ? <>

    <Grid container spacing={2}>
      <MainHeader title={product.name} type='Producto' actions={<Button
          variant="contained"
          startIcon={<Icon icon={'tabler:pencil'} />}
          onClick={() => router.push(`/productos/editar/${id}`)}>
            Editar
          </Button>}
      >
        <Typography>Categorias: {
            product.categories.map((c: any, index: number) =>
              <Link key={index} sx={{mr: 2}} component={LinkNext} href={`/categorias/detalle/${c.category.id}`}>{c.category.name}</Link>
            )
          }
        </Typography>
      </MainHeader>

      <Grid item lg={5} xs={12}>
        <ProductBasicInfoCard product={product} refresh={get}/>
        <StockDistributionCard productId={id} stockDistribution={product.stockDistribution} refresh={get}/>
        <HistoryCard history={product.history} />
      </Grid>
      <Grid item lg={7} xs={12}>
        <ProductDescriptionCard product={product} refresh={get} />
        <ProductGallery gallery={product.gallery} productId={product.id} refresh={get}/>
      </Grid>
    </Grid>
    </>
  : <></>
}

export default ProductDetail
