
import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../home/Title';
import SetStatus from './setStatus'
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


// Generate Order Data
function createData(id, username, name, last_name, email, status) {
  return { id, username, name, last_name, email, status };
}

const rows = [
  createData(0, 'juan11', 'juan', 'Martinez', 'juanmartinez@mail.com', <SetStatus/>),
  createData(1, 'mario23', 'mario', 'perez', 'mario@mail.com', 'Inactivo'),
  createData(2, 'luisa123', 'luis', 'daza', 'luis@mail.com', 'Activo'),
  createData(3, 'maaria2', 'maria', 'perez', 'maria@mail.com', 'Activo'),
  createData(4, 'juan11', 'juan', 'Martinez', 'juanmartinez@mail.com', 'Activo'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Users() {
  const classes = useStyles();
  return (
    <React.Fragment>   
 
      <br/>
      <Title>Lista de Usuarios  </Title>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre de Usuario</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver más
        </Link>
      </div>


    </React.Fragment>

  );
}