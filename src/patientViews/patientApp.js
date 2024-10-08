import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";
import icon from '../assets/Icon.png';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Button } from 'antd'
import MisCitas from './misCitas'
import Recetas from './recetas'
import Perfil from './perfil';
// import Home from './home/home';
import { usuario } from '../resources'

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
      <Navbar.Brand href="#home" style={{ fontFamily: 'Poppins', color: 'White' }}>
        Bienvenido {usuario.name}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {/* <Nav.Link href="/">Landing</Nav.Link> */}
          <Nav.Link href="/citas">Mis Citas</Nav.Link>
          <Nav.Link href="/recetas">Mis Recetas</Nav.Link>
          <Nav.Link href="/perfil">Mi Perfil</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Button onClick={logout} ghost>Cerrar Sesion</Button>
      </Navbar.Collapse>
    </Container>
  </Navbar>;

}

export default function PatientApp() {
  return (
    <Router>
      <Navigator />
      <Switch>
        <Route path="/citas">
          <MisCitas />
        </Route>
        <Route path="/recetas">
          <Recetas />
        </Route>
        <Route path="/perfil">
          <Perfil />
        </Route>
        <Route path="/">
        <MisCitas />
        </Route>
      </Switch>
    </Router>
  )
}
