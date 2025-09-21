import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Divider, Typography, CardHeader, Grid } from "@mui/material";
import ModalClient from "../list/components/ModalClient";
import useClient from "./hooks/useClient";
import useOrders from "./hooks/useOrders";
import { useClientDetail } from "./hooks/ClientDetailContext";
import FullTable from "src/components/table/FullTable";
import { defaultDataList } from "src/types/apps/listTypes";
import { columnsOrders } from "./DataConfigOrders";


const ClientDetailView = () => {
  const {client, orders } = useClientDetail();
  const [paginationModel, setPaginationModel] = useState({ page: 1, pageSize: 7 });
  const {getClient} = useClient();
  const { getOrders} = useOrders();

  const [openEdit, setOpenEdit] = useState<boolean>(false);

  useEffect(() => {
    getClient()
    getOrders(paginationModel);
  }, [getOrders, getClient, paginationModel]);
  
  const getDefaultImageUrl = () => "/images/avatars/11.png";

  const colsOrders = columnsOrders();

  return client ? <>
    <Grid container spacing={2}>
      <Grid item xs={12} lg={4}>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Box >
              <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" sx={{margin:'2rem'}}>
              <img src={client.profileImage || getDefaultImageUrl()} alt="Perfil" style={{ width: "100px", height: "auto", borderRadius: '10px', margin: 2 }} />
                <Typography variant="h4" gutterBottom>{client.name} {client.lastName}</Typography>
                <Typography variant="subtitle1">Numero de Cliente: #{client.id}</Typography>
              </Box>
              <Divider style={{ margin: '1rem 0' }} />
              <Box textAlign="left" sx={{ m: 2}}>
                <Box sx={{ display: 'flex', alignItems: 'center',  mt: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: 1 }}>Nombre y apellido:</Typography>
                  <Typography variant="body1">{client.name} {client.lastName}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center',  mt: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: 1 }}>Documento:</Typography>
                  <Typography variant="body1">{client.documentType} - {client.document}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: 1 }}>Email:</Typography>
                  <Typography variant="body1">{client.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: 1 }}>Teléfono:</Typography>
                  <Typography variant="body1">{client.phone}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: 1 }}>Dirección:</Typography>
                  <Typography variant="body1">{client.address.address}, {client.address.province.name}</Typography>
                </Box>
                <Button variant="contained" fullWidth sx={{width:'80%', mt: 2}} onClick={() => {
                  setOpenEdit(true);
                }}>Modificar datos</Button>
                {
                openEdit &&
                  <ModalClient
                    open={openEdit}
                    onClose={() => setOpenEdit(false)}
                    refresh={getClient}
                    client={client}
                   
                  />
                }
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={8}>
        <Card sx={{ mb: 2}}>
          <CardHeader title="Ordenes" />
          <FullTable
            data={orders || defaultDataList}
            columns={colsOrders}
            paginationModel={paginationModel}
            setPagination={setPaginationModel}
            checkboxSelection={false}
          />
        </Card>
      </Grid>
    </Grid>
  </>: <></>
};

export default ClientDetailView;
