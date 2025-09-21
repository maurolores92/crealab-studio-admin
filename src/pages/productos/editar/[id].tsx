
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import apiConnector from 'src/services/api.service';
import { NewProductProvider } from 'src/views/store/products/components/create/NewProductContext'
import { productSchema } from 'src/views/store/products/components/DataConfig'
import ProductEdit from 'src/views/store/products/ProductEdit'

const ProductEditView = () => {
  const router = useRouter();
  const {id} = router.query;
  const [product, setProduct] = useState<any | null>(null);
  
  const get = useCallback(async() => {
    try {
      const result: any = await apiConnector.get(`/products/${id}`);
      if(result.data) {
        result.data.statusSlug = result.data.status.slug;
        setProduct(result.data);
      } 
    } catch (error) {
      toast.error('Ups! Ocurrió un error.')
    }
  }, [id, setProduct]);
  useEffect(() => {get();}, [get])

  return product ?
      <NewProductProvider schema={productSchema} defaultValues={product}>
        <ProductEdit /> 
      </NewProductProvider>
    : <></>
}

export default ProductEditView;
