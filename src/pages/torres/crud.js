
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
import SetStatus from '../torres/setStatus'
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

export default function Torres() {
  const classes = useStyles();
  const baseUrl = 'https://jsonplaceholder.typicode.com/users'
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [torreSeleccionada, setTorreSeleccionada] = useState({
    username: '',
    name: '',
    email: ''
  })

  const handleChange = e => {
    const { name, value } = e.target;
    setTorreSeleccionada(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(torreSeleccionada);
  }

  const peticionGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      })
  }

  const peticionPost = async () => {
    await axios.post(baseUrl, torreSeleccionada)
      .then(response => {
        setData(data.concat(response.data))
        abrirCerrarModalInsertar()
      })
  }

  const peticionPut = async () => {
    await axios.put(baseUrl + torreSeleccionada.id, torreSeleccionada)
      .then(response => {
        var dataNueva = data;
        dataNueva.map(torre => {
          if (torreSeleccionada.id === torre.id) {
            torre.nombre = torreSeleccionada.nombre;
            torre.lanzamiento = torreSeleccionada.lanzamiento;
            torre.empresa = torreSeleccionada.empresa;
            torre.unidades_vendidas = torreSeleccionada.unidades_vendidas;
          }
        })
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
  }

  const peticionDelete = async () => {
    await axios.delete(baseUrl + torreSeleccionada.id)
      .then(response => {
        setData(data.filter(torre => torre.id !== torreSeleccionada.id));
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

  const seleccionarTorre = (torre, caso) => {
    setTorreSeleccionada(torre);
    (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  useEffect(async () => {
    await peticionGet();
  }, [])

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nueva Torre </h3>
      <TextField name="name" className={styles.inputMaterial} label="Nombre de la torre" onChange={handleChange} />
      <br />
      <TextField name="n_pisos" className={styles.inputMaterial} label="Numero de pisos" onChange={handleChange} />
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
      <h3>Editar torre</h3>
      <TextField name="name" className={styles.inputMaterial} label="Nombre de la torre" onChange={handleChange} value={torreSeleccionada && torreSeleccionada.nombre} />
      <br />
      <TextField name="n:pisos" className={styles.inputMaterial} label="número de pisos" onChange={handleChange} value={torreSeleccionada && torreSeleccionada.empresa} />
      <br />
      <br />
      <div>
        <SetStatus></SetStatus>
      </div>
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar esta torre <b>{torreSeleccionada && torreSeleccionada.nombre}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()} >Sí</Button>
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
      <Title>Lista de torres  </Title>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre de la torre</TableCell>
            <TableCell>Número de pisos</TableCell>
            <TableCell>Ascensor</TableCell>
            <TableCell  align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(torre => (
            <TableRow>
              <TableCell>{torre.username}</TableCell>
              <TableCell>{torre.name}</TableCell>
              <TableCell>{torre.email}</TableCell>
              <TableCell align="center">
                <Search></Search>
                &nbsp;&nbsp;&nbsp;
                <Edit className={styles.iconos} onClick={() => seleccionarTorre(torre, 'Editar')} />
                &nbsp;&nbsp;&nbsp;
                <Delete className={styles.iconos} onClick={() => seleccionarTorre(torre, 'Eliminar')} />


              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver más
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