import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Button } from 'antd'
import icon from '../assets/Icon.png';
import Patients from "./patients/main.patients";
import Doctors from "./doctors/main.doctors";
import { SuperAdminExpedientes } from "./expedientes";
import { Hospitales } from "./hospitals/main.hospitals";
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
            Bienvenido Administrador
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <Nav.Link href="/">Inicio</Nav.Link>
              {/* <Nav.Link href="/">Landing</Nav.Link> */}
              <Nav.Link href="/">Farmacia</Nav.Link>
              <Nav.Link href="#">|</Nav.Link>
              <Nav.Link href="/hospitales">Hospitales</Nav.Link>
              <Nav.Link href="/doctores">Medicos</Nav.Link>
              <Nav.Link href="pacientes">Pacientes</Nav.Link>
              <Nav.Link href="pacientes">Pacientes</Nav.Link>
              <Nav.Link href="pacientes">Pacientes</Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Button onClick={logout} >Cerrar Sesion</Button>
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
         <Route path="/doctores">
           <Doctors />
         </Route>
         <Route path="/expedientes">
           <SuperAdminExpedientes />
         </Route>
         <Route path="/pacientes">
           <Patients />
         </Route>
         <Route path="/">
           <Home/>
         </Route>

       </Switch>
     </Router>
  )
}
