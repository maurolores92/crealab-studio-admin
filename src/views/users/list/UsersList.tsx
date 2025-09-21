import { Box, Button, Card, CardHeader, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import FullTable from "src/components/table/FullTable";
import { Icon } from "@iconify/react";
import apiConnector from "src/services/api.service";
import ConfirmDeleteDialog from "src/components/dialogs/ConfirmDeleteDialog";
import toast from "react-hot-toast";
import Link from "next/link";
import ModalUsers from "./components/ModalUsers";
import { columns } from "./components/DataConfig";
import useUsers from "./hooks/useUsers";
import useRoles from "./hooks/useRoles";

const UsersList = () => {
  const theme = useTheme();
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>();
  const {getUsers, users, setPaginationModel, paginationModel} = useUsers();
  const {roles, getRoles} = useRoles();

  useEffect(() => {
    getUsers();
    getRoles();
  }, [getUsers, getRoles]);

  const actions = (row: any) => (
    <>
      <Tooltip title='Ver usuario' arrow placement='top'>
        <IconButton LinkComponent={Link} href={`/usuarios/detalle/${row.id}`}>
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
      await apiConnector.remove(`/user/${selected.id}`);
      setOpenDelete(false);
      toast.success('Se eliminó el usuario con éxito.');
      getUsers();
    } catch (error) {
      toast.error('Ups! Ocurrió un error al eliminar el usuario.');
    }
  };

  return (
    <>
      <Box></Box>
      <Grid>
        <Grid item lg={12} xs={12}>
          <Card>
            <CardHeader title='Usuarios' action={
              <>

                <Button
                  variant="contained"
                  startIcon={<Icon icon='tabler:plus' />}
                  onClick={() => setOpenCreate(true)}
                >
                  Nuevo
                </Button>
              </>
            } />
            <FullTable
              data={users}
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
      <ModalUsers
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        refresh={getUsers}
        user={selected}
        setSelected={setSelected}
        roles={roles}
      />
      }
      {openDelete && (
        <ConfirmDeleteDialog
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          title={`Eliminar al usuario ${selected.name}`}
          titleAction="Eliminar usuario"
          action={onDelete}
        >
          <Typography fontSize={14}>¿Está seguro que desea eliminar al usuario <strong>{selected.name}</strong>?</Typography>
        </ConfirmDeleteDialog>
      )}
    </>
  );
};

export default UsersList;
