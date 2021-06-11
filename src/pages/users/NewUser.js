import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SetStatus from './setStatus'

export default function newUserForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (


    <div>

      <Fab color="primary" size="small" aria-label="add" onClick={handleClickOpen} >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nuevo Usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>
            *Por favor diligencie los siguientes datos
          </DialogContentText>
          <TextField
            autoFocus = "true"
            margin="dense"
            id="username"
            label="Nombre de usuario"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus = "true" 
            margin="dense"
            id="name"
            label="Nombre"
            type="name"
            fullWidth = "true"
          />
          <TextField
            autoFocus = "true"
            margin="dense"
            id="last_name"
            label="Apellido"
            type="name"
            fullWidth
          />
          <TextField
            autoFocus = "true"
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus = "true"
            margin="dense"
            id="pass"
            label="Contraseña"
            type="password"
            fullWidth
          />
          <br /> <br />
        <SetStatus/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
}