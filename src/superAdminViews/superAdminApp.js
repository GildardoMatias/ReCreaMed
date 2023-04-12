import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Button } from 'antd'
import icon from '../assets/Icon.png';
import Patients from "./patients/main.patients";
import Doctors from "./doctors/main.doctors";
import { Hospitales } from "./hospitals/main.hospitals";
import { usuario } from '../resources'
import Admins from './admins/main.admins';
import Receptionists from './receptionists/main.receptionists';

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
      />
      <Navbar.Brand href="#home" style={{ fontFamily: 'Poppins', color: 'White' }}>
        Bienvenido {usuario.name}

      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="hospitales">Hospitales</Nav.Link>
          <Nav.Link href="administradores">Administradores</Nav.Link>
          <Nav.Link href="recepcionistas">Recepcionistas</Nav.Link>
          <Nav.Link href="doctores">Medicos</Nav.Link>
          <Nav.Link href="pacientes">Pacientes</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Button onClick={logout} ghost>Cerrar Sesion</Button>
      </Navbar.Collapse>
    </Container>
  </Navbar>;


}

export default function SuperAdminApp() {
  return (
    <Router>
      <Navigator />
      <Switch>

        <Route path="/hospitales">
          <Hospitales />
        </Route>
        <Route path="/administradores">
          <Admins />
        </Route>
        <Route path="/doctores">
          <Doctors />
        </Route>
        <Route path="/recepcionistas">
          <Receptionists />
        </Route>
        <Route path="/pacientes">
          <Patients />
        </Route>
        <Route path="/">
          <Patients />

        </Route>

      </Switch>
    </Router>
  )
}
