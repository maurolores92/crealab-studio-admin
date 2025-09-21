import { NewProductProvider } from "src/views/store/products/components/create/NewProductContext"
import { productSchema, defaultValues } from "src/views/store/products/components/DataConfig"
import NewProduct from "src/views/store/products/NewProduct"

const NewProductPage = () => {
  return <NewProductProvider schema={productSchema} defaultValues={defaultValues}>
    <NewProduct />
  </NewProductProvider>
  
}

export default NewProductPage