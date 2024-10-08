import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";
import { Button } from 'antd'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Citas from './citas/main.citas'
import Users from './patients/main.users';
import Doctors from './doctors/main.doctors'
import Sucursal from './sucursal'
import PerfilAdministrador from './perfil/perfil.administrador'
import Ingresos from './ingresos/ingresos'
import icon from '../assets/Icon.png';
import Escalas from '../escalas/escalasMenu';
import { usuario } from '../resources'
import Cortes from './cortes/main.cortes';
import Receptionists from './receptionists/main.receptionists';
import Enfermeros from './enfermeros/main.enfermeros';
import Home from './home/home'

const logout = () => { localStorage.removeItem('sessionToken'); localStorage.removeItem('userType'); window.location.href = '/'; }

function Navigator() {
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
      <Navbar.Brand href="/" style={{ fontFamily: 'Poppins', color: 'White' }}>
        Bienvenido {usuario.name}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">

          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="pacientes">Pacientes</Nav.Link>
          <Nav.Link href="doctores">Médicos</Nav.Link>
          <Nav.Link href="recepcionistas">Recepcionistas</Nav.Link>
          <Nav.Link href="enfermeros">Enfermeros</Nav.Link>
          <Nav.Link href="citas">Citas</Nav.Link>
          <Nav.Link href="escalas">Escalas</Nav.Link>
          <Nav.Link href="balances">Balances</Nav.Link>
          <Nav.Link href="cortes">Cortes</Nav.Link>
          <Nav.Link href="perfil">Perfil</Nav.Link>

        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Button onClick={logout} ghost>Cerrar Sesion</Button>
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
        <Route path="/recepcionistas">
          <Receptionists />
        </Route>
        <Route path="/enfermeros">
          <Enfermeros />
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
          <Escalas />
        </Route>
        <Route path="/balances">
          <Ingresos />
        </Route>
        <Route path="/cortes">
          <Cortes />
        </Route>
        <Route path="/perfil">
          <PerfilAdministrador />
        </Route>
        <Route path="/">
          <Home />
          {/* <Users /> */}
        </Route>

      </Switch>
    </Router>
  )
}
