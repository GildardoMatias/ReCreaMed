import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";
import { Button } from 'antd'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Citas } from './citas/citas'
import Users from './patients/main.users';
import Doctors from './doctors/main.doctors'
import Sucursal from './sucursal'
import PerfilAdministrador from './perfilAdministrador'
import Home from './home/home'
import icon from '../assets/Icon.png';
import Escalas from '../escalas/escalasMenu';

const logout = () => { localStorage.removeItem('sessionToken'); localStorage.removeItem('userType'); window.location.href = '/'; }

function Navigator() {
  return <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="#home">
        <img
          src={icon}
          width="40"
          height="35"
          className="d-inline-block align-top"
          alt="Recreamed logo"
        />
        Bienvenido Administrador
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">

          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="pacientes">Pacientes</Nav.Link>
          <Nav.Link href="doctores">Medicos</Nav.Link>
          <Nav.Link href="citas">Citas</Nav.Link>
          <Nav.Link href="escalas">Escalas</Nav.Link>
          <Nav.Link href="administrador">Perfil</Nav.Link>

        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Button onClick={logout} >Cerrar Sesion</Button>
      </Navbar.Collapse>
    </Container>
  </Navbar>;
}

export default function AdminHospitalApp() {
  return (
    <Router>
      <Navigator />
      <Switch>
        <Route path="/sucursal">
          <Sucursal />
        </Route>
        <Route path="/doctores">
          <Doctors />
        </Route>
        <Route path="/citas">
          <Citas />
        </Route>
        <Route path="/pacientes">
          <Users />
        </Route>
        <Route path="/escalas">
          <Escalas/>
        </Route>
        <Route path="/administrador">
          <PerfilAdministrador />
        </Route>
        <Route path="/">
          <Home />
        </Route>

      </Switch>
    </Router>
  )
}
