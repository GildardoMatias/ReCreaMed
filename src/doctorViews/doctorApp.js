import React from 'react'
import { Button } from 'antd'
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Citas } from './citas/citas'
import Expedientes from './expedientes/expedientes'
import Perfil from './perfil/perfil'
import Home from './home/home'
import icon from '../assets/Icon.png';
import { Footer, logout } from '../resources'
import { usuario } from '../resources'
import MainPacientes from './pacientes/main.pacientes';
import Escalas from '../escalas/escalasMenu';
import Balances from './balances/balances';
import Stripe from './stripe/stripe';

function Navigator() {
  console.log("DoctorApp", usuario.name)
  return <Navbar bg="primary" variant="dark" expand="lg">
    <Container>
      <img
        src={icon}
        width="40"
        height="35"
        className="d-inline-block align-top"
        alt="Recreamed logo"
        style={{ marginRight: 6 }}
      />
      <Navbar.Brand href="#home" style={{ fontFamily: 'Poppins', color: 'White' }}>
        Bienvenido {usuario.name}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {/* <Nav.Link href="/">Inicio</Nav.Link> */}
          {/* <Nav.Link href="/pacientesdash">PacientesDash</Nav.Link> */}
          <Nav.Link href="/pacientes" >Pacientes</Nav.Link>
          <Nav.Link href="/citas">Citas</Nav.Link>
          <Nav.Link href="/escalas">Escalas</Nav.Link>
          <Nav.Link href="/balances">Ingresos</Nav.Link>
          {/* <Nav.Link href="/expedientes">Expedientes</Nav.Link> */}
          {/* <Nav.Link href="/recetas">Recetas</Nav.Link> */}
          {/* <Nav.Link href="/notas">Notas</Nav.Link> */}
          {/* <Nav.Link href="/historial">Historiales</Nav.Link> */}
          <Nav.Link href="/perfil">Mi Perfil</Nav.Link>
          {/* <Nav.Link href="/stripe">Stripe</Nav.Link> */}
        </Nav>
      </Navbar.Collapse>

      <Navbar.Brand href="#home" className="justify-content-end">
        <Button ghost onClick={logout} style={{ marginLeft: 10 }}>Cerrar Sesion</Button>
      </Navbar.Brand>

    </Container>
  </Navbar>

}

export default function DoctorApp() {

  return (
    <Router>
      <Navigator />
      <Switch>

        <Route path="/pacientes">
          <MainPacientes />
        </Route>

        <Route path="/citas">
          <Citas />
        </Route>

        <Route path="/expedientes">
          <Expedientes />
        </Route>

        {/* <Route path="/Recetas">
          <Recetas />
        </Route> */}

        <Route path="/perfil">
          <Perfil />
        </Route>

        <Route path="/balances">
          <Balances />
        </Route>
        
        {/* Teporaty stripe */}
        {/* <Route path="/stripe">
          <Stripe/>
        </Route> */}

        <Route path="/escalas">
          {/* This is taken from escalas directory*/}
          <Escalas />
        </Route>

        <Route path="/">
        <MainPacientes />
        </Route>

      </Switch>

      <Footer />
    </Router>
  )
}
