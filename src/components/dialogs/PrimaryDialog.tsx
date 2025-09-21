import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

import { Icon } from '@iconify/react'

const PrimaryDialog = ({open, onClose, title, children, onAction, titleAction='Guardar', loading=false, size='sm' }: any) => {
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={size}>
      <DialogTitle id='form-dialog-title'>
        <Typography fontWeight={600} fontSize={22}>{title}</Typography>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button onClick={onClose} color="error">Cancelar</Button>
        <Button variant="contained" 
        color="primary" 
        onClick={onAction}
        startIcon={loading ? <Icon icon='eos-icons:loading' /> : <></>}>
          {titleAction}
        </Button>
      </DialogActions>
  </Dialog>
  );
}

export default PrimaryDialog;
