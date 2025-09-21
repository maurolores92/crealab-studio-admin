import { Card, Box, CardContent, CardHeader, styled, Typography, IconButton } from "@mui/material"

import FileUploaderMultiple from "src/components/forms/FileUploaderMultiple";
import AppReactDropzone from "src/components/forms/AppReactDropzone";
import { Icon } from "@iconify/react";
import ButtonLoadFile from "src/components/buttons/ButtonLoadFile";
import { useNewProductContent } from "./NewProductContext";


const MainImagePeview = styled('img')(({ theme }) => ({
  width: 108,
  height: 108,
  borderRadius: 15,
  border: `4px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

const FilesCard = () => {
  const { mainImage, setMainImage, files, setFiles } = useNewProductContent();

  return <Card>
  <CardHeader title="Imagenes" />
  <CardContent>
    <Box sx={{mb: 3}}>
      <Typography>Imagen del producto</Typography>
      <Typography variant="caption">Agrega una imagen principal</Typography>
      <Box sx={{ my: 5, alignItems: 'center'}}>
        {mainImage ? <MainImagePeview alt={'Image'} src={URL.createObjectURL(mainImage as any)} />: <></>}
        {
        mainImage ? <IconButton  color='error' sx={{p: [0, 2], ml: -5, backgroundColor: '#fff'}} onClick={() => setMainImage(null)}>
          <Icon icon='tabler:trash' fontSize={22}/>
        </IconButton>: 
        <ButtonLoadFile onChange={setMainImage} >Cargar imagen principal</ButtonLoadFile>
        }
      </Box>
    </Box>
    <Box sx={{mb: 3}}>
      <Typography>Galería</Typography>
      <Typography variant="caption">Agrega una imagen principal</Typography>
      <AppReactDropzone sx={{mt: 3}}>
        <FileUploaderMultiple 
          files={files} 
          setFiles={setFiles}
        />
      </AppReactDropzone>
    </Box>
  </CardContent>
</Card>
}

export default FilesCard