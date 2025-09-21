import { Alert, Box, Button, Card, CardContent, CardHeader, Typography } from "@mui/material"


const ProductDescriptionCard = ({product}: any) => {
  
  return <>
    <Card sx={{mb: 2}}>
      <CardHeader title='Descripciones' />
      <CardContent>
        {
          product.summary ? <Box >
          <Typography sx={{my: 1, fontWeight: 600}} variant="h5">Sumario</Typography>
          <Box dangerouslySetInnerHTML={{__html: product.summary}}></Box>
        </Box>: <>
        <Alert severity="warning" sx={{mb: 2}} action={<>
          <Button variant="outlined">Agregar</Button>
        </>}
        >EL producto no tiene sumario</Alert></>
        }
        {
          product.description ? <Box >
          <Typography sx={{my: 5, fontWeight: 600}} variant="h5">Descripción del servicio</Typography>
          <Box dangerouslySetInnerHTML={{__html: product.description}}></Box>
        </Box>: <>
          <Alert severity="warning" sx={{mb: 2}} action={<>
            <Button variant="outlined">Agregar</Button>
          </>}>El producto no tiene descripción</Alert>
        </>
        }
        
      </CardContent>
    </Card>
  </>
}

export default ProductDescriptionCard