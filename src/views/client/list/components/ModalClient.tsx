import { Grid, Box, Typography, MenuItem } from "@mui/material";
import { defaultValues, schema } from "./DataConfig";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import FormDialog from "src/components/dialogs/FormDialog";
import CustomTextField from 'src/@core/components/mui/text-field'
import errorMessage from "src/components/forms/ErrorMessage";
import apiConnector from "src/services/api.service";
import SelectProvince from "src/components/forms/SelectProvince";

const ModalClient = ({ open, onClose, refresh, client, setSelected }: any) => {

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors,  },
  } = useForm({
    defaultValues: client || defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });


  const onSubmit = async(data: any) => {
    try {
      let result;
      if(client) {
        result =  await apiConnector.put(`/client/${client.id}`, data);
      } else {
        result = await apiConnector.post('/client', data);
      }
      refresh(result.data);
      onClose()
      reset();
      setSelected(null)
    } catch (error) {
      console.log(error);
      toast.error('Ups, ocurrió un error');
    }
  }

  return (
    <FormDialog
      title={`${client ? 'Crear' : 'Editar'} cliente`}
      onSubmit={handleSubmit(onSubmit)}
      open={open}
      onClose={() => {
        onClose();
        setSelected(null);
      }}
    >
      <Box sx={{textAlign: 'right', mb: 3}}>
        <Typography color="grey"></Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <CustomTextField
            label={'Nombre'}
            fullWidth
            {...register('name')}
            error={Boolean(errors.name)}
            {...(errors.name && errorMessage(errors?.name.message))}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <CustomTextField
            label={'Apellido'}
            fullWidth
            {...register('lastName')}
            error={Boolean(errors.lastName)}
            {...(errors.lastName && errorMessage(errors?.lastName.message))}
          />
        </Grid>
        <Grid item lg={3} xs={12}>
          <CustomTextField
            label={'Tipo de Documento'}
            select
            fullWidth
            defaultValue={client?.documentType ?? "DNI"}
            {...register('documentType')}
            error={Boolean(errors.documentType)}
            {...errorMessage(errors?.documentType?.message)}
          >
            <MenuItem value="DNI">DNI</MenuItem>
            <MenuItem value="CUIL">CUIL</MenuItem>
            <MenuItem value="CUIT">CUIT</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item lg={4} xs={12}>
          <CustomTextField
            label={'Documento'}
            fullWidth
            {...register('document')}
            error={Boolean(errors.document)}
            {...(errors.document && errorMessage(errors?.document.message))}
          />
        </Grid>
        <Grid item lg={5} xs={12}>
          <CustomTextField
            label={'Telefono'}
            fullWidth
            {...register('phone')}
            error={Boolean(errors.phone)}
            {...(errors.phone && errorMessage(errors?.phone.message))}
          />
        </Grid>
        <Grid item lg={12} xs={12}>
          <CustomTextField
            label={'Email'}
            fullWidth
            {...register('email')}
            error={Boolean(errors.email)}
            {...(errors.email && errorMessage(errors?.email.message))}
          />
        </Grid>
        <Grid item lg={4} xs={12}>
          <SelectProvince 
            setValue={setValue} 
            errors={errors} 
            field={'address.provinceId'}
            id={client?.address?.provinceId}
          />
        </Grid>
        <Grid item lg={5} xs={12}>
          <CustomTextField
            label={'Ciudad'}
            fullWidth
            {...register('address.city')}
            error={Boolean(errors.city)}
            {...(errors.city && errorMessage(errors?.city.message))}
          />
        </Grid>
        <Grid item lg={3} xs={12}>
          <CustomTextField
            label={'Código postal'}
            fullWidth
            {...register('address.postalCode')}
            error={Boolean(errors.postalCode)}
            {...(errors.postalCode && errorMessage(errors?.postalCode.message))}
          />
        </Grid>
        <Grid item lg={12} xs={12}>
          <CustomTextField
            label={'Dirección'}
            fullWidth
            {...register('address.address')}
            error={Boolean(errors.address)}
            {...(errors.address && errorMessage(errors?.address.message))}
          />
        </Grid>

        <Grid item lg={12} xs={12}>
          <CustomTextField
            label={'Notas'}
            rows={4}
            multiline
            fullWidth
            error={Boolean(errors.notes)}
            {...(errors.notes && errorMessage(errors?.notes.message))}
            {...register('notes')}
          />
        </Grid>
      </Grid>
    </FormDialog>
  );
}

export default ModalClient;
