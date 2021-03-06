
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Modal, Button, TextField } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../home/Title';
import { Edit, Delete, Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import SetStatus from '../users/setStatus'
import PeopleIcon from '@material-ui/icons/Person';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  }
}));

export default function Users() {
  const classes = useStyles();

  const baseUrl = 'http://25.84.83.43:8093/user/getUsers'
  const createUserUrl = 'http://25.84.83.43:8093/user/create'
  const updateUserUrl = 'http://25.84.83.43:8093/user/updateUser'
  const deleteUserUrl = 'http://25.84.83.43:8093/user/deleteUser'
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [userSeleccionada, setUserSeleccionada] = useState({
    username: '',
    name: '',
    lastname: '',
    email: '',
    state: '',
    pass: ''
  })

  const handleChange = e => {
    const { name, value } = e.target;
    setUserSeleccionada(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(userSeleccionada);
  }

  const peticionGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        console.log(response.data.response),
          setData(response.data.response);
      })
  }

  const peticionPost = async () => {
    await axios.post(createUserUrl, userSeleccionada)
      .then(response => {
        setData(data.concat(response.data))
        abrirCerrarModalInsertar()
        window.location.reload();
      })
  }

  const peticionUpdate = async () => {
    await axios.post(updateUserUrl, userSeleccionada)
    .then(response => {
      setData(data.concat(response.data))
      abrirCerrarModalEditar()
      window.location.reload();
    })
  }

  const peticionDelete = async () => {
    await axios.post(deleteUserUrl, userSeleccionada)
    .then(response=>{
      setData(data.filter(user=>user.id!==userSeleccionada.id));
      abrirCerrarModalEliminar();
    })
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const seleccionarUser = (user, caso) => {
    setUserSeleccionada(user);
    (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  useEffect(async () => {
    await peticionGet()

  }, [])

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo Usuario </h3>
      <TextField name="username" className={styles.inputMaterial} label="Nombre de usuario" onChange={handleChange} />
      <br />
      <TextField name="name" className={styles.inputMaterial} label="Nombre" onChange={handleChange} />
      <br />
      <TextField name="lastname" className={styles.inputMaterial} label="Apellido" onChange={handleChange} />
      <br />
      <TextField name="email" className={styles.inputMaterial} label="Email" onChange={handleChange} />
      <br />
      <TextField name="pass" type="password" className={styles.inputMaterial} label="Contrase??a" onChange={handleChange} />
      <br />

      <br />
      <div>
        <SetStatus></SetStatus>
      </div>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar user</h3>
      <TextField name="username" className={styles.inputMaterial} label="Nombre de usuario" onChange={handleChange} value={userSeleccionada && userSeleccionada.username} />
      <br />
      <TextField name="name" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={userSeleccionada && userSeleccionada.name} />
      <br />
      <TextField name="lastname" className={styles.inputMaterial} label="Apellido" onChange={handleChange} value={userSeleccionada && userSeleccionada.lastname} />
      <br />
      <TextField name="email" className={styles.inputMaterial} label="Email" onChange={handleChange} value={userSeleccionada && userSeleccionada.email} />
      <br />
      <TextField name="pass" className={styles.inputMaterial} label="Contrase??a" onChange={handleChange} value={userSeleccionada && userSeleccionada.pass} />
      <br />
      <TextField name="state" className={styles.inputMaterial} label="Estado" onChange={handleChange} value={userSeleccionada && userSeleccionada.state} />
      <br /><br />
      <div>
        <SetStatus></SetStatus>
      </div>
      <div align="right">
        <Button color="primary" onClick={() => peticionUpdate()}>Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>Est??s seguro que deseas eliminar el Usuario <b>{userSeleccionada && userSeleccionada.name}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()} >S??</Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )





  return (
    <React.Fragment>
      <Fab color="primary" onClick={() => abrirCerrarModalInsertar()} size="small" aria-label="add">
        <AddIcon />
      </Fab>
      <br />

      <Title>Lista de Usuarios  </Title>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre de Usuario</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {data.map(user => (
            <TableRow>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.lastname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.state}</TableCell>
              <TableCell align="right">
                <Search></Search>
                &nbsp;&nbsp;&nbsp;
                <Edit className={styles.iconos} onClick={() => seleccionarUser(user, 'Editar')} />
                &nbsp;&nbsp;&nbsp;
                <Delete className={styles.iconos} onClick={() => seleccionarUser(user, 'Eliminar')} />


              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver m??s
        </Link>
        <Modal
          open={modalInsertar}
          onClose={abrirCerrarModalInsertar}>
          {bodyInsertar}
        </Modal>

        <Modal
          open={modalEditar}
          onClose={abrirCerrarModalEditar}>
          {bodyEditar}
        </Modal>

        <Modal
          open={modalEliminar}
          onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
        </Modal>
      </div>
    </React.Fragment>

  );
}