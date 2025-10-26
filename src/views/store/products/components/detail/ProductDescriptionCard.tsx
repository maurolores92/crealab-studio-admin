

import { Alert, Box, Button, Card, CardContent, CardHeader, Typography, Grid, CircularProgress } from "@mui/material"
import { useState } from "react";
import Editor from "src/components/forms/Editor";
import toast from "react-hot-toast";
import apiConnector from "src/services/api.service";

const ProductDescriptionCard = ({product}: any) => {
  // Estado de loading para cada submit
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingDescription, setLoadingDescription] = useState(false);

  // PUT solo summary
  const onSaveSummary = async (summary: string) => {
    setLoadingSummary(true);
    try {
      await apiConnector.put(`/products/${product.id}`, { summary });
      toast.success('Sumario actualizado');
      setShowSummaryInput(false);
      setSummaryValue("");
      if (product) product.summary = summary;
    } catch (e) {
      toast.error('Error al actualizar el sumario');

      return;
    } finally {
      setLoadingSummary(false);
    }
  };

  // PUT solo description
  const onSaveDescription = async (description: string) => {
    setLoadingDescription(true);
    try {
      await apiConnector.put(`/products/${product.id}`, { description });
      toast.success('Descripción actualizada');
      setShowDescriptionInput(false);
      setDescriptionValue("");
      if (product) product.description = description;
    } catch (e) {
      toast.error('Error al actualizar la descripción');

      return;
    } finally {
      setLoadingDescription(false);
    }
  };
  const [showSummaryInput, setShowSummaryInput] = useState(false);
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [summaryValue, setSummaryValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  // Handler para Editor (setValue)
  const handleEditorChange = (name: string, value: string) => {
    if (name === "summary") setSummaryValue(value);
    if (name === "description") setDescriptionValue(value);
  };

  const handleSaveSummary = () => {
    if (!summaryValue.trim()) {

      return;
    }
    if (onSaveSummary) onSaveSummary(summaryValue);
  };

  const handleSaveDescription = () => {
    if (!descriptionValue.trim()) {

      return;
    }
    if (onSaveDescription) onSaveDescription(descriptionValue);
  };

  return <>
    <Card sx={{mb: 2}}>
      <CardHeader title='Descripciones' />
      <CardContent>
        {product.summary && !showSummaryInput ? (
          <Box>
            <Box sx={{display: 'flex', alignItems: 'center', my: 1}}>
              <Typography sx={{fontWeight: 600, mr: 2}} variant="h5">Sumario</Typography>
              <Button variant="outlined" size="small" onClick={() => {
                setShowSummaryInput(true);
                setSummaryValue(product.summary || "");
              }}>Editar</Button>
            </Box>
            <Box dangerouslySetInnerHTML={{__html: product.summary}}></Box>
          </Box>
        ) : showSummaryInput ? (
          <Grid container spacing={2} sx={{mb: 2}}>
            <Grid item xs={12}>
              <Editor
                setValue={handleEditorChange}
                defaultValue={product?.summary}
                name='summary'
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleSaveSummary} disabled={loadingSummary}>
                {loadingSummary && <CircularProgress size={24} sx={{ml: 2, verticalAlign: 'middle'}} />} Aceptar
              </Button>

              <Button variant="text" sx={{ml: 2}} onClick={() => setShowSummaryInput(false)} disabled={loadingSummary}>Cancelar</Button>
            </Grid>
          </Grid>
        ) : (
          <Alert severity="warning" sx={{mb: 2}} action={<Button variant="outlined" onClick={() => setShowSummaryInput(true)}>Agregar</Button>}>
            El producto no tiene sumario
          </Alert>
        )}

        {product.description && !showDescriptionInput ? (
          <Box>
            <Box sx={{display: 'flex', alignItems: 'center', my: 5}}>
              <Typography sx={{fontWeight: 600, mr: 2}} variant="h5">Descripción del servicio</Typography>
              <Button variant="outlined" size="small" onClick={() => {
                setShowDescriptionInput(true);
                setDescriptionValue(product.description || "");
              }}>Editar</Button>
            </Box>
            <Box dangerouslySetInnerHTML={{__html: product.description}}></Box>
          </Box>
        ) : showDescriptionInput ? (
          <Grid container spacing={2} sx={{mb: 2}}>
            <Grid item xs={12}>
              <Typography variant='h6' sx={{mb:2}}>Descripción</Typography>
              <Editor
                setValue={handleEditorChange}
                defaultValue={product?.description}
                name='description'
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleSaveDescription} disabled={loadingDescription}>
                Aceptar
              </Button>
              {loadingDescription && <CircularProgress size={24} sx={{ml: 2, verticalAlign: 'middle'}} />}
              <Button variant="text" sx={{ml: 2}} onClick={() => setShowDescriptionInput(false)} disabled={loadingDescription}>Cancelar</Button>
            </Grid>
          </Grid>
        ) : (
          <Alert severity="warning" sx={{mb: 2}} action={<Button variant="outlined" onClick={() => setShowDescriptionInput(true)}>Agregar</Button>}>
            El producto no tiene descripción
          </Alert>
        )}
      </CardContent>
    </Card>
  </>;
}

export default ProductDescriptionCard
