import { Grid, Box, Typography } from "@mui/material";
import { defaultValues, schema } from "./DataConfig";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import FormDialog from "src/components/dialogs/FormDialog";
import apiConnector from "src/services/api.service";
import SelectClient from "src/components/forms/SelectClient";
import InputDate from "src/components/forms/InputDate";

const CreateOrderModal = ({open, onClose, refresh}: any) => {

  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit = async(data: any) => {
    try {
      const result =  await apiConnector.post('/orders', data);
      refresh(result.data);
      onClose()
      reset();
    } catch (error) {
      console.log(error);
      toast.error('Ups, ocurrió un error');
    }
  }

  return (
    <FormDialog
      title={'Crear Orden de venta'}
      onSubmit={handleSubmit(onSubmit)}
      open={open}
      onClose={onClose}
    >
      <Box sx={{textAlign: 'right', mb: 3}}>
        <Typography color="grey"></Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12}>
          <SelectClient setValue={setValue} errors={errors} />
        </Grid>
        <Grid item lg={12} xs={12}>
          <InputDate
            control={control}
            errors={errors}
            name={'orderDate'}
            label='Fecha de la orden'
            dateFormat={'yyyy-MM-dd'}
          />
        </Grid>
      </Grid>
    </FormDialog>
  );
}

export default CreateOrderModal;
