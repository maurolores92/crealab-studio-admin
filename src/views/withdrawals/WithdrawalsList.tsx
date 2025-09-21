import { Box, Button, Card, CardHeader, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import CustomChip from 'src/@core/components/mui/chip';
import { useCallback, useEffect, useState } from "react";
import FullTable from "src/components/table/FullTable";
import { Icon } from "@iconify/react";
import apiConnector from "src/services/api.service";
import ConfirmDeleteDialog from "src/components/dialogs/ConfirmDeleteDialog";
import toast from "react-hot-toast";
import Link from "next/link";
import { columns } from "./components/DataConfig";
import ModalWithdrawals from "./components/ModalWithdrawals";
import { defaultDataList, IDataList } from "src/types/apps/listTypes";
import { formatPrice } from "src/configs/constants";

const WithdrawalsList = () => {

  const theme = useTheme();
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>();
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });
  const [withdrawals, setWithdrawals] = useState<IDataList>({...defaultDataList});
  const [balance, setBalance] = useState<{sales: number, expenses: number, withdrawals: number, available: number} | null>(null);
  const [userDebtSummary, setUserDebtSummary] = useState<any[]>([]);

  const getWithdrawals = useCallback(async () => {
    const params = { page: paginationModel.page, pageSize: paginationModel.pageSize };
    const result: any = await apiConnector.get('/withdrawals', params);
    setWithdrawals(result);
  }, [paginationModel, setWithdrawals]);

  const getBalance = useCallback(async () => {
    const res: any = await apiConnector.get('/withdrawals/balance');
    setBalance(res);
  }, []);

  const getUserDebtSummary = useCallback(async () => {
    const res: any = await apiConnector.get('/withdrawals/user-debt-summary');
    setUserDebtSummary(res.filter((u: any) => u.totalSpent > 0));
  }, []);

  useEffect(() => {
    getWithdrawals();
    getBalance();
    getUserDebtSummary();
  }, [getWithdrawals, getBalance, getUserDebtSummary]);

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
      await apiConnector.remove(`/withdrawals/${selected.id}`);
      setOpenDelete(false);
      toast.success('Se eliminó el usuario con éxito.');
      getWithdrawals();
    } catch (error) {
      toast.error('Ups! Ocurrió un error al eliminar el usuario.');
    }
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="textSecondary">Ventas</Typography>
              {balance !== null && (
                <CustomChip
                  label={`${formatPrice(balance.sales)}`}
                  skin="light"
                  color={balance.sales >= 0 ? 'success' : 'error'}
                  sx={{ fontWeight: 700, fontSize: 18, mt: 1 }}
                />
              )}
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="textSecondary">Gastos</Typography>
              {balance !== null && (
                <CustomChip
                  label={`$${formatPrice(balance.expenses)}`}
                  skin="light"
                  color={balance.expenses >= 0 ? 'error' : 'success'}
                  sx={{ fontWeight: 700, fontSize: 18, mt: 1 }}
                />
              )}
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="textSecondary">Saldo a retirar</Typography>
              {balance !== null && (
                <CustomChip
                  label={`$${formatPrice(balance.available)}`}
                  skin="light"
                  color={balance.available >= 0 ? 'success' : 'error'}
                  sx={{ fontWeight: 700, fontSize: 18, mt: 1 }}
                />
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Grid>
        <Grid item lg={12} xs={12}>
          <Card>
            <CardHeader title='Retiros' action={
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
              data={withdrawals}
              columns={cols}
              paginationModel={paginationModel}
              setPagination={setPagination}
              checkboxSelection={false}
            />
          </Card>
        </Grid>
        {userDebtSummary.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Usuarios con gastos y saldo pendiente por retirar</Typography>
            <Grid container spacing={2}>
              {userDebtSummary.map(user => (
                <Grid item xs={12} md={6} lg={4} key={user.userId}>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight={700}>{user.name} {user.lastName}</Typography>
                    <Typography variant="body2" color="textSecondary">Total gastado: <strong>${formatPrice(user.totalSpent)}</strong></Typography>
                    <Typography variant="body2" color="textSecondary">Saldo pendiente: <CustomChip label={`$${formatPrice(user.pendingBalance)}`} skin="light" color={user.pendingBalance > 0 ? 'error' : 'success'} sx={{ fontWeight: 700, fontSize: 16, ml: 1 }} /></Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Grid>
      {
      openCreate &&
      <ModalWithdrawals
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        refresh={() => {
          getWithdrawals();
          getBalance();
        }}
        withdrawal={selected}
        setSelected={setSelected}
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

export default WithdrawalsList;
