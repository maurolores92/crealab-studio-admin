import { Grid, Box, Typography, MenuItem } from "@mui/material";
import { defaultValues, schema } from "./DataConfig";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import FormDialog from "src/components/dialogs/FormDialog";
import CustomTextField from 'src/@core/components/mui/text-field'
import errorMessage from "src/components/forms/ErrorMessage";
import apiConnector from "src/services/api.service";
import useUsers from "src/views/users/list/hooks/useUsers";
import { useAuth } from "src/hooks/useAuth";
import { useEffect } from "react";

const ModalExpenses = ({ open, onClose, refresh, expense, setSelected }: any) => {
  const { user } = useAuth();
  const { users, getUsers } = useUsers();

  useEffect(() => {
    if (open) {
      getUsers();
    }
  }, [open, getUsers]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors,  },
  } = useForm({
    defaultValues: expense || defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });


  const onSubmit = async(data: any) => {
    try {
      let result;
      const payload = { ...data, userId: user?.id, performedById: data.performedById };
      if(expense) {
        result =  await apiConnector.put(`/expenses/${expense.id}`, payload);
      } else {
        result = await apiConnector.post('/expenses', payload);
      }
      refresh(result.data);
      onClose();
      reset();
      setSelected(null);
    } catch (error) {
      console.log(error);
      toast.error('Ups, ocurrió un error');
    }
  }

  return (
    <FormDialog
      title={`${expense ? 'Editar' : 'Crear'} gasto`}
      open={open}
      onClose={() => {
        onClose();
        setSelected(null);
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box sx={{textAlign: 'right', mb: 3}}>
        <Typography color="grey"></Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12}>
          <CustomTextField
            label={'Fecha'}
            type='date'
            fullWidth
            {...register('date', { required: true })}
            error={Boolean(errors.date)}
            {...errorMessage(errors?.date?.message)}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            select
            label="Usuario que realizó el gasto"
            fullWidth
            {...register('performedById')}
            error={Boolean(errors.performedById)}
            SelectProps={{ native: false }}
          >
            {(users.data && users.data.length > 0)
              ? users.data.map((user: any) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name} {user.lastName}
                  </MenuItem>
                ))
              : <MenuItem value="" disabled>No hay usuarios</MenuItem>
            }
          </CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            label="Descripción"
            fullWidth
            {...register('description')}
            error={Boolean(errors.description)}
            {...(errors.description && errorMessage(errors?.description.message))}
          />
        </Grid>
      </Grid>
    </FormDialog>
  );
}

export default ModalExpenses;
