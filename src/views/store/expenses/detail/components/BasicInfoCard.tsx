import { Icon } from "@iconify/react";
import { Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DateTime } from "luxon";
import { useState } from "react";
import ModalExpenses from '../../list/components/ModalExpenses';
import { formatPrice } from "src/configs/constants";

const ItemDescription = ({label, value}: any) => <Box sx={{display: 'flex', mb: 1}}>
<Typography color={'grey'} fontWeight={600} sx={{mr: 2}}>{label}: </Typography>
<Typography>{value}</Typography>
</Box>



const BasicInfoCard = ({ expense, refresh }: any) => {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <Card sx={{ mb: 2, position: 'relative' }}>
      <CardHeader title="Información de gasto" />
      <Button
        variant="contained"
        startIcon={<Icon icon={'tabler:pencil'} />}
        onClick={() => setOpenEdit(true)}
        sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}
      >
        Editar
      </Button>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <ItemDescription label="Fecha" value={expense?.date ? DateTime.fromISO(expense.date).toFormat('yyyy-MM-dd HH:mm') : '-'} />
            <ItemDescription label="Descripción" value={expense?.description || '-'} />
            <ItemDescription label="Usuario" value={expense?.userId != null ? expense?.userId : '-'} />
            <ItemDescription label="Creado" value={expense?.createdAt ? DateTime.fromISO(expense?.createdAt).toFormat('yyyy-MM-dd HH:mm') : '-'} />
            <ItemDescription label="Actualizado" value={expense?.updatedAt ? DateTime.fromISO(expense?.updatedAt).toFormat('yyyy-MM-dd HH:mm') : '-'} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', minWidth: 180 }}>
            <Typography variant='h6' color={'success.main'} fontWeight={600} sx={{ mr: 2 }}>Total:</Typography>
            <Typography variant='h5' color={'success.main'} fontWeight={600}>{expense?.amountTotal != null ? `$${formatPrice(expense?.amountTotal)}` : '-'}</Typography>
          </Box>
        </Box>
      </CardContent>
      {openEdit && (
        <ModalExpenses
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          refresh={refresh}
          expense={expense}
        />
      )}
    </Card>
  );
};

export default BasicInfoCard;
