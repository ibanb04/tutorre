
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

export default function apartamentos() {
  const classes = useStyles();
  const baseUrl = 'http://25.84.83.43:8093/apartment/getApartments'
  const createApartmentUrl = 'http://25.84.83.43:8093/apartment/create'
  const updateApartmentUrl = 'http://25.84.83.43:8093/apartment/updateApartment'
  const deleteApartmentUrl = 'http://25.84.83.43:8093/apartment/deleteApartments'
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [inquilino, setInquilino] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [apartamentoSeleccionado, setApartamentoSeleccionado] = useState({
    apartmentSize: '',
    busy: '',
    number: '',
    tenant: '',
    tower: '',
    floorNumber: ''
  })

  const handleChange = e => {
    const { name, value } = e.target;
    setApartamentoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(apartamentoSeleccionado);
  }


 
  const peticionGet = async () => {
    await axios.get(baseUrl)
      .then(res => {
       setData(res.data.response)        
      })
  }

  const peticionPost = async () => {
    await axios.post(baseUrl, apartamentoSeleccionado)
      .then(response => {
        setData(data.concat(response.data))
        abrirCerrarModalInsertar()
      })
  }

  const peticionPut = async () => {
    await axios.put(baseUrl + apartamentoSeleccionado.id, apartamentoSeleccionado)
      .then(response => {
        var dataNueva = data;
        dataNueva.map(apartamento => {
          if (apartamentoSeleccionado.id === apartamento.id) {
            apartamento.nombre = apartamentoSeleccionado.nombre;
            apartamento.lanzamiento = apartamentoSeleccionado.lanzamiento;
            apartamento.empresa = apartamentoSeleccionado.empresa;
            apartamento.unidades_vendidas = apartamentoSeleccionado.unidades_vendidas;
          }
        })
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
  }

  const peticionDelete = async () => {
    await axios.delete(baseUrl + apartamentoSeleccionado.id)
      .then(response => {
        setData(data.filter(apartamento => apartamento.id !== apartamentoSeleccionado.id));
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

  const seleccionarApartamento = (apartamento, caso) => {
    setApartamentoSeleccionado(apartamento);
    (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  useEffect(async () => {
    await peticionGet();
  }, [])

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nueva apartamento </h3>
      <SelectApartamentos />
      <TextField name="floorNumber" className={styles.inputMaterial} label="Número de Apartamento" onChange={handleChange} />
      <br />
      <TextField name="" className={styles.inputMaterial} type="number" label="Número de piso" onChange={handleChange} />
      <br />
      <TextField name="apartmentSize" className={styles.inputMaterial} label="Tamaño(m2)" onChange={handleChange} />
      <SelectEstadoApartamento />
      <SelectInquilinos />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar apartamento</h3>
      <TextField name="name" className={styles.inputMaterial} label="Nombre de la apartamento" onChange={handleChange} value={apartamentoSeleccionado && apartamentoSeleccionado.nombre} />
      <br />
      <TextField name="n_pisos" className={styles.inputMaterial} label="número de pisos" onChange={handleChange} value={apartamentoSeleccionado && apartamentoSeleccionado.empresa} />
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
      <p>Estás seguro que deseas eliminar esta apartamento <b>{apartamentoSeleccionado && apartamentoSeleccionado.nombre}</b> ? </p>
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
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log(data)}
          {data.map(apartamentos => (
            <TableRow>
              <TableCell>{apartamentos.tower}</TableCell>
              <TableCell>{apartamentos.number}</TableCell>
              <TableCell>{apartamentos.floorNumber}</TableCell>
              <TableCell>{apartamentos.tenant}</TableCell>
              <TableCell>{apartamentos.apartmentSize}</TableCell>
              <TableCell>{apartamentos.busy}</TableCell>

              <TableCell >

                &nbsp;&nbsp;
                <Edit className={styles.iconos} onClick={() => seleccionarApartamento(apartamento, 'Editar')} />

                <Delete className={styles.iconos} onClick={() => seleccionarApartamento(apartamento, 'Eliminar')} />


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