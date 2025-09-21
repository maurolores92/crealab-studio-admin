import { Icon } from "@iconify/react";
import {  Box, Button, Card, CardHeader, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from "@mui/material"
import { DateTime } from "luxon";
import { useState } from "react";
import CustomChip from 'src/@core/components/mui/chip'
import AddStockModal from "./AddStockModal";

const StockDistributionCard = ({productId, stockDistribution, refresh}: any) => {
  const theme = useTheme();
  const [openAdd, setOpenAdd] = useState<boolean>(false);

  return <>
    <Card sx={{mb: 2}}>
      <CardHeader title='Stock' action={<>
        <Button variant="tonal" size="small" onClick={() => setOpenAdd(true)}>
          <Icon icon='tabler:plus' /></Button>
      </>}/>
      <Box sx={{
        mt: 3,
        display: 'flex', justifyContent: 'space-between'
      }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{textTransform: 'uppercase', color: 'grey'}}>
              <TableCell sx={{color: theme.palette.grey[400]}}>Fecha</TableCell>
              <TableCell sx={{color: theme.palette.grey[400]}} align="center">Cantidad</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {
              stockDistribution.map((item: any, index: number) => 
              <TableRow key={index}>
                <TableCell sx={{fontWeight: 500}}>
                  {DateTime.fromISO(item.createdAt).toFormat('yyyy-MM-dd')}
                  {
                    item.status === 'current' &&  <CustomChip  
                      color='info' 
                      skin='light'
                      rounded
                      sx={{ml: 2}}
                      size='small' 
                      label={'Actual'}
                    />
                  }
                
                </TableCell>
                <TableCell sx={{fontWeight: 500}} align="center">{item.stock}</TableCell>
              </TableRow>
            )
          }
          </TableBody>
        </Table>
      </Box>
    </Card>
    {
      openAdd && <AddStockModal open={openAdd} onClose={() => setOpenAdd(false)} productId={productId} refresh={refresh} />
    }
  </>
}

export default StockDistributionCard