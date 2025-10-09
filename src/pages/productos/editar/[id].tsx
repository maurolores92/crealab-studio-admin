
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import apiConnector from 'src/services/api.service';
import { NewProductProvider } from 'src/views/store/products/components/create/NewProductContext'
import { productSchema } from 'src/views/store/products/components/DataConfig'
import ProductEdit from 'src/views/store/products/ProductEdit'
import { CircularProgress, Box } from '@mui/material';

const ProductEditView = () => {
  const router = useRouter();
  const {id} = router.query;
  const [product, setProduct] = useState<any | null>(null);

  const get = useCallback(async() => {
    if (!id || id === 'undefined' || id === 'null') {
      setProduct(null);

      return;
    }
    try {
      const result: any = await apiConnector.get(`/products/${id}`);
      if(result.data) {
        setProduct(result.data);
      }
    } catch (error) {
      toast.error('Ups! Ocurrió un error.')
    }
  }, [id, setProduct]);

  useEffect(() => { get(); }, [get]);

  if (!id || id === 'undefined' || id === 'null') {
    return <div>ID de producto inválido.</div>;
  }
  if (!product) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
      <CircularProgress />
    </Box>;
  }
  const safeProduct = {
    ...product,
    status: product.status || 'publish',
  };

  return (
    <NewProductProvider key={product.id} schema={productSchema} defaultValues={safeProduct}>
      <ProductEdit />
    </NewProductProvider>
  );
}

export default ProductEditView;
