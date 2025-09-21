import { Card, CardContent, CardHeader, Typography} from "@mui/material"
import { Box } from "@mui/system"
import { DateTime } from "luxon"

const ItemDescription = ({label, value}: any) => <Box sx={{display: 'flex', mb: 1}}>
<Typography color={'grey'} fontWeight={600} sx={{mr: 2}}>{label}: </Typography>
<Typography>{value}</Typography>
</Box>


const BasicInfoCard = ({inventory}: any) => (
  <Card sx={{ mb: 2 }}>
    <CardHeader title="Información de inventario" />
    <CardContent>
      <ItemDescription label="Tipo" value={inventory.type} />
      <ItemDescription label="Color" value={inventory.color} />
      <ItemDescription label="Unidad" value={inventory.unit} />
      <ItemDescription label="Stock" value={inventory.stock} />
      <ItemDescription label="Proveedor" value={inventory.supplier} />
      <ItemDescription label="Última compra" value={inventory.dateLastPurchase ? DateTime.fromISO(inventory.dateLastPurchase).toFormat('yyyy-MM-dd') : '-'} />
      <ItemDescription label="Activo" value={inventory.isActive ? 'Sí' : 'No'} />
      <ItemDescription label="Creado" value={DateTime.fromISO(inventory.createdAt).toFormat('yyyy-MM-dd hh:mm a')} />
    </CardContent>
  </Card>
);

export default BasicInfoCard;
