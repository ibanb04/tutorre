
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
import SetStatus from '../apartamentos/setStatus';
import SelectApartamentos from './selectApartamentos';
import SelectInquilinos from './selectInquilinos';
import SelectTorre from './selectTorre';
import SelectVehiculo from './selectVehiculo';
import SelectPropietario from './selectPropietario';
import Calendario from './calendario';
import SelectEstadoApartamento from './selectEstadoApartamento';
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

export default function inquilinos() {
  const classes = useStyles();
  const baseUrl = 'https://jsonplaceholder.typicode.com/users'
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [inquilinoSeleccionado, setInquilinoSeleccionado] = useState({
    username: '',
    name: '',
    email: ''
  })

  const handleChange = e => {
    const { name, value } = e.target;
    setInquilinoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(inquilinoSeleccionado);
  }

  const peticionGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      })
  }

  const peticionPost = async () => {
    await axios.post(baseUrl, inquilinoSeleccionado)
      .then(response => {
        setData(data.concat(response.data))
        abrirCerrarModalInsertar()
      })
  }

  const peticionPut = async () => {
    await axios.put(baseUrl + inquilinoSeleccionado.id, inquilinoSeleccionado)
      .then(response => {
        var dataNueva = data;
        dataNueva.map(inquilino => {
          if (inquilinoSeleccionado.id === inquilino.id) {
            inquilino.nombre = inquilinoSeleccionado.nombre;
            inquilino.lanzamiento = inquilinoSeleccionado.lanzamiento;
            inquilino.empresa = inquilinoSeleccionado.empresa;
            inquilino.unidades_vendidas = inquilinoSeleccionado.unidades_vendidas;
          }
        })
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
  }

  const peticionDelete = async () => {
    await axios.delete(baseUrl + inquilinoSeleccionado.id)
      .then(response => {
        setData(data.filter(inquilino => inquilino.id !== inquilinoSeleccionado.id));
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

  const seleccionarInquilino = (inquilino, caso) => {
    setInquilinoSeleccionado(inquilino);
    (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  useEffect(async () => {
    await peticionGet();
  }, [])

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo inquilino </h3>
      <TextField name="name" className={styles.inputMaterial} label="Nombre" onChange={handleChange} />
      <br />
      <TextField name="Apellido" className={styles.inputMaterial}   label="Apellido" onChange={handleChange} />
      <br />
      <SelectApartamentos/>
      <SelectTorre/>
      <Calendario /> 
      <SelectVehiculo/>
      <SelectPropietario/>
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar inquilino</h3>
      <TextField name="name" className={styles.inputMaterial} label="Nombre de la inquilino" onChange={handleChange} value={inquilinoSeleccionado && inquilinoSeleccionado.nombre} />
      <br />
      <TextField name="n_pisos" className={styles.inputMaterial} label="número de pisos" onChange={handleChange} value={inquilinoSeleccionado && inquilinoSeleccionado.empresa} />
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
      <p>Estás seguro que deseas eliminar esta inquilino <b>{inquilinoSeleccionado && inquilinoSeleccionado.nombre}</b> ? </p>
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
      <Title>Lista de apartamentos  </Title>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Torre</TableCell>
            <TableCell>Número de Apartamento</TableCell>
            <TableCell>Número de Piso</TableCell>
            <TableCell>Inquilino</TableCell>
            <TableCell>Tamaño(m2)</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell  align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(inquilino => (
            <TableRow>
              <TableCell>{inquilino.username}</TableCell>
              <TableCell>{inquilino.name}</TableCell>
              <TableCell>{inquilino.name}</TableCell>
              <TableCell>{inquilino.name}</TableCell>
              <TableCell>{inquilino.name}</TableCell>
              <TableCell>{inquilino.email}</TableCell>
              <TableCell >
                
                &nbsp;&nbsp;
                <Edit className={styles.iconos} onClick={() => seleccionarInquilino(inquilino, 'Editar')} />
                
                <Delete className={styles.iconos} onClick={() => seleccionarInquilino(inquilino, 'Eliminar')} />


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