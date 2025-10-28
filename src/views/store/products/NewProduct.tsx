import { Box, Button, CircularProgress, Grid, Typography, } from "@mui/material";
import { useNewProductContent } from "./components/create/NewProductContext";
import BasicDataCard from "./components/create/BasicDataCard";
import apiConnector from "src/services/api.service";
import { useState } from "react";
import SuccessModal from "src/components/dialogs/SuccessModal";
import { Icon } from "@iconify/react";
import Link from "next/link";
import toast from "react-hot-toast";

const NewProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [id, setId] = useState<number>();
  const { handleSubmit, mainImage, files } = useNewProductContent();

  const submit = async(data: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('mainImage', mainImage);
      if(files && files.length) {
        files.forEach((file: any) => formData.append(`gallery`, file));
      }
      Object.keys(data).forEach(key => formData.append(key, data[key]));

      const result = await apiConnector.sendFile('/products', formData);
      setId(result.id);

      Object.keys(data).forEach(key => {
        if (key === 'insumos' && Array.isArray(data.insumos)) {
          formData.append('insumos', JSON.stringify(data.insumos));
        } else {
          formData.append(key, data[key]);
        }
      });

      setOpenSuccess(true);
      setLoading(false);
    } catch (error) {
      toast.error('Error al crear el producto');
      setLoading(false);
    }
  }

  return <>
    <form onSubmit={handleSubmit(submit)}>
      <Box sx={{mt: 6, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant='h3'>Nuevo producto</Typography>
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button variant='contained' color='success' type="submit" disabled={loading} startIcon={loading ? <CircularProgress size={24}/>: <Icon icon='tabler:plus' />}>
            Guardar
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12}>
          <BasicDataCard />
        </Grid>

        {/* <Grid item lg={5} xs={12}>
          <FilesCard />
        </Grid> */}

      </Grid>

    </form>
    {
      openSuccess && <SuccessModal
        title='Producto creado con éxito'
        message='Tu producto ha sido creado. Puedes ir al listado o ir al detalle del mismo.'
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        actions={<>
          <Button
            variant="outlined"
            color='info'
            startIcon={<Icon icon='icons8:left-round'/>}
            LinkComponent={Link}
            href="/productos/"
          >
            Volver al listado
          </Button>
          <Button
           variant="contained"
            endIcon={<Icon icon='icons8:right-round'/>}
            LinkComponent={Link}
            href={`/productos/detalle/${id}`}>
            Ver el detalle
          </Button>
        </>}
      />
    }

  </>
}

export default NewProduct;
