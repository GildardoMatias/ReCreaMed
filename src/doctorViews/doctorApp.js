import React from 'react'
import { Button } from 'antd'
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Patients from './pacientesDash/main.patients'
import { Citas } from './citas'
import Expedientes from './expedientes/expedientes'
import Recetas from './recetas'
import Perfil from './perfil'
import { DoctorNotas } from './doctorNotas'
import Home from './home/home'
import icon from '../assets/Icon.png';
import { Footer, logout } from '../resources'
import { usuario } from '../resources'
import { Historial } from './historial';
import MainPacientes from './pacientes/main.pacientes';
import Escalas from '../escalas/escalas'; 

function Navigator() {
  console.log("DoctorApp", usuario.name)
  return <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="#home" style={{ fontFamily: 'Arial', color: '#515a6e' }}>
        <img
          src={icon}
          width="40"
          height="35"
          className="d-inline-block align-top"
          alt="Recreamed logo"
          style={{ marginRight: 6 }}
        />
        Bienvenido {usuario.name}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Inicio</Nav.Link>
          {/* <Nav.Link href="/pacientesdash">PacientesDash</Nav.Link> */}
          <Nav.Link href="/pacientes" >Pacientes</Nav.Link>
          <Nav.Link href="/citas">Citas</Nav.Link>
          <Nav.Link href="/escalas">Escalas</Nav.Link>
          {/* <Nav.Link href="/expedientes">Expedientes</Nav.Link> */}
          {/* <Nav.Link href="/recetas">Recetas</Nav.Link> */}
          {/* <Nav.Link href="/notas">Notas</Nav.Link> */}
          {/* <Nav.Link href="/historial">Historiales</Nav.Link> */}
          <Nav.Link href="/perfil">Mi Perfil</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Button onClick={logout} >Cerrar Sesion</Button>
      </Navbar.Collapse>
    </Container>
  </Navbar>

}

export default function DoctorApp() {

  return (
    <Router>

      <Navigator />

      <Switch>

        <Route path="/pacientesdash">
          <Patients />
        </Route>

        <Route path="/pacientes">
          <MainPacientes />
        </Route>

        <Route path="/citas">
          <Citas />
        </Route>

        <Route path="/expedientes">
          <Expedientes />
        </Route>

        <Route path="/Recetas">
          <Recetas />
        </Route>

        <Route path="/perfil">
          <Perfil />
        </Route>

        <Route path="/notas">
          <DoctorNotas />
        </Route>

        <Route path="/historial">
          <Historial />
        </Route>
        
        <Route path="/escalas">
          {/* This is taken from recepcion  */}
          <Escalas/> 
        </Route>

        <Route path="/">
          <Home />
        </Route>

      </Switch>

      <Footer />
    </Router>
  )
}
