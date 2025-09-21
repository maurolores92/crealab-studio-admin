import { Icon } from "@iconify/react"
import { Card, CardContent, Typography, Avatar, CardHeader, Button} from "@mui/material"
import { Box } from "@mui/system"
import { DateTime } from "luxon"
import { useState } from "react"
import toast from "react-hot-toast"
import ButtonLoadFile from "src/components/buttons/ButtonLoadFile"
import ConfirmDeleteDialog from "src/components/dialogs/ConfirmDeleteDialog"
import { constants } from "src/configs/constants"
import apiConnector from "src/services/api.service"

const ItemDescription = ({label, value}: any) => <Box sx={{display: 'flex', mb: 1}}>
<Typography color={'grey'} fontWeight={600} sx={{mr: 2}}>{label}: </Typography>
<Typography>{value}</Typography>
</Box>


const ProductBasicInfoCard = ({product, refresh}: any) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const uploadImage = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append('mainImage', file);
      const result: any = await apiConnector.sendFile( `/products/${product.id}/uploadMainImage`, formData);
      if (result.status === 200) {
        toast.success('Imagen cargada correctamente');
        product.imageUrl = result.data;
      }
      refresh();
    } catch (error) {
      console.log(error);
      toast.error('Ups, ocurrió un error')
    }
  }

    const handleDeleteImage = async () => {
    try {
      await apiConnector.remove(`/products/${product.id}/deleteMainImage`);
      setOpenDelete(false);
      toast.success('Imagen eliminada correctamente');
      product.imageUrl = null;
    } catch (error) {
      console.log(error);
      toast.error('Ups, ocurrió un error');
    }
  };

  return <>
    <Card sx={{mb: 2}}>
      {
        !product.imageUrl ? <CardHeader action={
          <ButtonLoadFile onChange={uploadImage} >Cargar imagen principal</ButtonLoadFile>
        } />: <></>
      }
      <CardContent sx={{display: 'flex'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {product.imageUrl && (
            <>
              <Avatar variant="rounded" src={`${constants.imageUrl}/${product.imageUrl}`} alt='product-detail' sx={{height: {lg: 160, xs: 80}, width: {lg: 160, xs: 80}}}/>
              <Box sx={{ mb: 1, display: 'flex', gap: 1 }}>
                <Button size="small" color="error" startIcon={<Icon icon="tabler:trash" width={18} height={18} />} onClick={() => setOpenDelete(true)}>
                  Borrar
                </Button>
              </Box>
            </>
          )}
        </Box>
        <Box sx={{ml: 5}}>
          <ItemDescription label="SKU" value={product.sku} />
          <ItemDescription label="Stock" value={`${product.stock} items`} />
          <ItemDescription label="Precio" value={`$ ${product.price}`} />
          <ItemDescription label="Creado" value={DateTime.fromISO(product.createdAt).toFormat('yyyy-MM-dd hh:mm a') } />
        </Box>
      </CardContent>
    </Card>
    {
      openDelete && <ConfirmDeleteDialog
      open={openDelete}
      onClose={() => setOpenDelete(false)}
      title={`Eliminar imagen de producto ${product.name}`}
      titleAction="Eliminar imagen"
      action={handleDeleteImage}
      >
        <Typography fontSize={14}>¿Está seguro que desea eliminar la imagen principal de <strong>{product.name}</strong>?</Typography>
      </ConfirmDeleteDialog>
    }
  </>
}

export default ProductBasicInfoCard
