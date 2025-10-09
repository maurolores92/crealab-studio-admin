

import { Alert, Box, Button, Card, CardContent, CardHeader, CardMedia, Typography, useMediaQuery, useTheme } from '@mui/material';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import AddGalleryModal from './AddGalleryModal';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import apiConnector from 'src/services/api.service';
import ConfirmDeleteDialog from 'src/components/dialogs/ConfirmDeleteDialog';

const toImage = (src: string) => ({ original: src, thumbnail: src });

const ProductGallery = ({productId, gallery, refresh}: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const images = Array.isArray(gallery)
    ? gallery.filter((img: any) => !!img.src).map((img: any) => toImage(img.src))
    : [];
  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);


  const deleteImageGallery = (item: any) => {
    const galleryImage = gallery.find((img: any) => img.src === item.original);

    return (
      <Box style={{ position: 'relative' }}>
        <CardMedia component="img" image={item.thumbnail} alt="" sx={{ width: '100%', borderRadius: 1 }} />
        <Box sx={{ mb: 1, display: 'flex', gap: 1 }}>
          <Button size="small" color="error" startIcon={<Icon icon="tabler:trash" width={18} height={18} />} onClick={() => { setSelectedImageId(galleryImage?.id); setOpenDelete(true); }}>
            Borrar
          </Button>
        </Box>
      </Box>
    );
  };

  const handleDeleteImageGallery = async () => {
    if (!selectedImageId) return;
    try {
      await apiConnector.remove(`/products/${productId}/gallery/${selectedImageId}`);
      setOpenDelete(false);
      toast.success('Imagen eliminada correctamente');
      refresh();
      setSelectedImageId(null);
    } catch (error) {
      console.log(error);
      toast.error('Ups, ocurrió un error');
    }
  };

  return <>
    <Card sx={{mb: 2}}>
      <CardHeader title='Galería de imagenes' action={<>
        <Button
          variant="outlined"
          size={isMobile ? 'small' : 'medium'}
          onClick={() => setOpen(true)}>
          {isMobile ? <Icon icon='tabler:plus' /> : 'Agregar'}
        </Button>
      </>}/>
      <CardContent>
        {
          gallery && gallery.length ?  <ImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={false}
          renderThumbInner={deleteImageGallery}
        />
        : <>
            <Alert severity="warning" sx={{mb: 2}} action={<>

            </>}
            >El producto no tiene imagenes de galería</Alert>
          </>
        }
      </CardContent>
    </Card>
    <AddGalleryModal open={open} onClose={() => setOpen(false)} productId={productId} refresh={refresh}/>
    {
      openDelete && (
        <ConfirmDeleteDialog
          open={openDelete}
          onClose={() => {
            setOpenDelete(false);
            setSelectedImageId(null);
          }}
          title="Eliminar imagen de la galería"
          titleAction="Eliminar imagen"
          action={handleDeleteImageGallery}
        >
          <Typography fontSize={14}>¿Está seguro que desea eliminar la imagen de la galería?</Typography>
        </ConfirmDeleteDialog>
      )
    }
  </>

}

export default ProductGallery
