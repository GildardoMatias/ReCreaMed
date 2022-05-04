import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";
import icon from '../assets/Icon.png';
import { Button } from 'antd'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Patients from './pacientes/main.patients'
import { Citas } from './citas'
import Home from './home/home'

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
        Bienvenido Recepcionista
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/">Farmacia</Nav.Link>
          <Nav.Link href="/pacientes">Pacientes</Nav.Link>
          <Nav.Link href="/citas">Citas</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Button onClick={logout} >Cerrar Sesion</Button>
      </Navbar.Collapse>
    </Container>
  </Navbar>

}

export default function RecepcionApp() {
  return (
    <Router>
      <Navigator />
      <Switch>

        <Route path="/pacientes">
          <Patients />
        </Route>

        <Route path="/citas">
          <Citas />
        </Route>

        <Route path="/citas">
          <Citas />
        </Route>

        <Route path="/">
          <Home />
        </Route>

      </Switch>
    </Router>
  )
}
