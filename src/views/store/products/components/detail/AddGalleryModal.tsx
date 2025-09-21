import { Grid } from "@mui/material"
import apiConnector from "src/services/api.service";
import toast from "react-hot-toast";
import AppReactDropzone from "src/components/forms/AppReactDropzone";
import FileUploaderMultiple from "src/components/forms/FileUploaderMultiple";
import { useState } from "react";
import PrimaryDialog from "src/components/dialogs/PrimaryDialog";


const AddGalleryModal = ({productId, open, onClose, refresh}: any) => {
  const [files, setFiles] = useState<any[]>([]);

  const onSubmit = async() => {
    try {
      const formData = new FormData();
      formData.append('productId', productId);
      if(files && files.length) {
        files.forEach((file: any) => formData.append(`gallery`, file));
      }
      await apiConnector.sendFile('/products/add-gallery', formData);
      setFiles([]);
      toast.success('Se han cargado las imagenes correctamente');
      refresh();
      onClose();
    } catch (error) {
      toast.error('Error al cargar las imagenes.')
    }
  }

  return <>
  <PrimaryDialog 
    {...{open, onClose}} 
    title="Agregar imagenes a la galería" 
    onAction={onSubmit}
    size='sm'
  >
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <AppReactDropzone sx={{mt: 3}}>
            <FileUploaderMultiple 
              files={files} 
              setFiles={setFiles}
            />
          </AppReactDropzone>
      </Grid>
    </Grid>
  </PrimaryDialog>
  </>
}

export default AddGalleryModal;
