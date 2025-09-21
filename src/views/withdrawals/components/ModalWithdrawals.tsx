import React, { useEffect } from "react";
import { Grid, Box, Typography, MenuItem } from "@mui/material";
import CustomChip from 'src/@core/components/mui/chip';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormDialog from "src/components/dialogs/FormDialog";
import CustomTextField from 'src/@core/components/mui/text-field'
import errorMessage from "src/components/forms/ErrorMessage";
import apiConnector from "src/services/api.service";

import useUsers from "src/views/users/list/hooks/useUsers";



const ModalWithdrawals = ({ open, onClose, refresh, withdrawal, setSelected }: any) => {
  const { users, getUsers } = useUsers();
  const [balance, setBalance] = React.useState<number | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: withdrawal || {
      userId: '',
      amount: '',
      date: new Date().toISOString().slice(0, 10),
      description: ''
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (open) {
      getUsers();
      apiConnector.get('/withdrawals/balance').then((res: any) => {
        setBalance(res.available);
      });
    }
  }, [open, getUsers]);

  const onSubmit = async (data: any) => {
    try {
      if (withdrawal) {
        await apiConnector.put(`/withdrawals/${withdrawal.id}`, data);
      } else {
        await apiConnector.post('/withdrawals', data);
      }
      refresh();
      onClose();
      reset();
      setSelected(null);
      toast.success('Retiro registrado correctamente');
    } catch (error) {
      console.log(error);
      toast.error('Ups, ocurrió un error');
    }
  };

  return (
    <FormDialog
      title={`${withdrawal ? 'Editar' : 'Registrar'} retiro`}
      onSubmit={handleSubmit(onSubmit)}
      open={open}
      onClose={() => {
        onClose();
        setSelected(null);
      }}
    >
      <Box sx={{ textAlign: 'right', mb: 3 }}>
        <Typography color="grey" sx={{ mb: 1 }}>
          Dinero disponible para retirar:
        </Typography>
        {balance !== null && (
          <CustomChip
            label={`$${balance}`}
            skin="light"
            color={balance >= 0 ? 'success' : 'error'}
            sx={{ fontWeight: 700, fontSize: 18 }}
          />
        )}
      </Box>
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12}>
          <CustomTextField
            label={'Usuario'}
            select
            fullWidth
            defaultValue={withdrawal?.userId ?? ''}
            {...register('userId', { required: true })}
            error={Boolean(errors.userId)}
            {...errorMessage(errors?.userId?.message)}
          >
            {users?.data?.map((user: any) => (
              <MenuItem key={user.id} value={user.id}>{user.name} {user.lastName}</MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        <Grid item lg={6} xs={12}>
          <CustomTextField
            label={'Monto'}
            type='number'
            fullWidth
            {...register('amount', { required: true })}
            error={Boolean(errors.amount)}
            {...errorMessage(errors?.amount?.message)}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <CustomTextField
            label={'Fecha'}
            type='date'
            fullWidth
            {...register('date', { required: true })}
            error={Boolean(errors.date)}
            {...errorMessage(errors?.date?.message)}
          />
        </Grid>
        <Grid item lg={12} xs={12}>
          <CustomTextField
            label={'Descripción'}
            fullWidth
            rows={4}
            multiline
            placeholder="Colocar por favor banco del cual retiro el dinero"
            {...register('description', { required: true })}
            error={Boolean(errors.description)}
            {...errorMessage(errors?.description?.message)}
          />
        </Grid>
      </Grid>
    </FormDialog>
  );
};

export default ModalWithdrawals;
