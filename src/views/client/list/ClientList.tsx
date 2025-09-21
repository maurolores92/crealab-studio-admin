import { Box, Button, Card, CardHeader, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import FullTable from "src/components/table/FullTable";
import { columns } from "src/views/client/list/components/DataConfig";
import { Icon } from "@iconify/react";
import apiConnector from "src/services/api.service";
import ConfirmDeleteDialog from "src/components/dialogs/ConfirmDeleteDialog";
import toast from "react-hot-toast";
import Link from "next/link";
import ModalClient from "./components/ModalClient";
import useClients from "./hooks/useClients";

const ClientsList = () => {
  const theme = useTheme();
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
 
  const [selected, setSelected] = useState<any>();
  const {getClients, clients, setPaginationModel, paginationModel} = useClients();

  useEffect(() => {getClients()}, [getClients]);

  const actions = (row: any) => (
    <>
      <Tooltip title='Ver cliente' arrow placement='top'>
        <IconButton LinkComponent={Link} href={`/clientes/detalle/${row.id}`}>
          <Icon icon='tabler:eye' />
        </IconButton>
      </Tooltip>
      <Tooltip title='Editar' arrow placement='top'>
        <IconButton onClick={() => {
          setSelected(row);
          setOpenCreate(true);
        }}><Icon icon='tabler:pencil' /></IconButton>
      </Tooltip>
      <Tooltip title='Eliminar' arrow placement="top">
        <IconButton onClick={() => {
          setSelected(row);
          setOpenDelete(true);
        }}>
          <Icon icon='tabler:trash' color={theme.palette.error.main}/>
        </IconButton>
      </Tooltip>
    </>
  );

  const cols = columns(actions);

  const setPagination = (model: any) => {
    setPaginationModel(model);
  }


  const onDelete = async () => {
    try {
      await apiConnector.remove(`/client/${selected.id}`);
      setOpenDelete(false);
      toast.success('Se eliminó el cliente con éxito.');
      getClients();
    } catch (error) {
      toast.error('Ups! Ocurrió un error al eliminar el cliente.');
    }
  };


  return (
    <>
      <Box></Box>
      <Grid>
        <Grid item lg={12} xs={12}>
          <Card>
            <CardHeader title='Clientes' action={
              <>
            
                <Button
                  variant="contained"
                  startIcon={<Icon icon='tabler:plus' />}
                  onClick={() => setOpenCreate(true)}
                >
                  Nueva
                </Button>
              </>
            } />
            <FullTable
              data={clients}
              columns={cols}
              paginationModel={paginationModel}
              setPagination={setPagination}
              checkboxSelection={false}
            />
          </Card>
        </Grid>
      </Grid>
      {
      openCreate &&
      <ModalClient
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        refresh={getClients}
        client={selected}
        setSelected={setSelected}
      />
      }
      {openDelete && (
        <ConfirmDeleteDialog
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          title={`Eliminar al cliente ${selected.name}`}
          titleAction="Eliminar cliente"
          action={onDelete}
        >
          <Typography fontSize={14}>¿Está seguro que desea eliminar al cliente <strong>{selected.name}</strong>?</Typography>
        </ConfirmDeleteDialog>
      )}
    </>
  );
};

export default ClientsList;
