import React from 'react'
import { Button } from 'antd'
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Patients from './pacientesDash/main.patients'
import Citas from './citas/main.citas'
import Expedientes from './expedientes/expedientes'
// import Recetas from './recetas'
import Perfil from './perfil'
import Home from './home/home'
import icon from '../assets/Icon.png';
import { Footer, logout } from '../resources'
import { usuario } from '../resources'
import { Historial } from './historial';
import MainPacientes from './pacientes/main.pacientes';
import Escalas from '../escalas/escalasMenu';
import Ingresos from './ingresos/ingresos';
import { KetaminaPublic, DepresionQidsPublic, DepresionEspanolPublic, HeadachePublic, PostTraumaticoPublic, PostTraumaticoClinicoPublic, PostTraumaticoMX } from '../session/public_escalas_routes';
import Horarios from './horarios/horarios';
// import { KetaminaPublic, DepresionQidsPublic, DepresionEspanolPublic,HeadachePublic, PostTraumaticoPublic, PostTraumaticoClinicoPublic, PostTraumaticoMX } from './session/public_escalas_routes';

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
          <Nav.Link href="/">Inicio</Nav.Link>
          {/* <Nav.Link href="/pacientesdash">PacientesDash</Nav.Link> */}
          <Nav.Link href="/pacientes" >Pacientes</Nav.Link>
          <Nav.Link href="/citas">Citas</Nav.Link>
          <Nav.Link href="/escalas">Escalas</Nav.Link>
          {/* <Nav.Link href="/horarios">Horarios</Nav.Link> */}
          <Nav.Link href="/balances">Balances</Nav.Link>
          {/* <Nav.Link href="/expedientes">Expedientes</Nav.Link> */}
          {/* <Nav.Link href="/recetas">Recetas</Nav.Link> */}
          {/* <Nav.Link href="/notas">Notas</Nav.Link> */}
          {/* <Nav.Link href="/historial">Historiales</Nav.Link> */}
          <Nav.Link href="/perfil">Mi Perfil</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Button onClick={logout} ghost>Cerrar Sesion</Button>
      </Navbar.Collapse>
    </Container>
  </Navbar>

}

export default function RecepcionApp() {

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

        {/* <Route path="/Recetas">
          <Recetas />
        </Route> */}

        <Route path="/perfil">
          <Perfil />
        </Route>

        <Route path="/historial">
          <Historial />
        </Route>

        <Route path="/balances">
          <Ingresos />
        </Route>

        <Route path="/horarios">
          <Horarios />
        </Route>

        <Route path="/escalas">
          {/* This is taken from escalas directory*/}
          <Escalas />
        </Route>


        {/* Scales Routes just like anonymous */}
        <Route path="/ketamina_public/:idmedico/:idpaciente/:key">
          <KetaminaPublic />
        </Route>
        <Route path="/dolor_public/:idmedico/:idpaciente/:key">
          <HeadachePublic />
        </Route>
        <Route path="/depresion_qids_public/:idmedico/:idpaciente/:key">
          <DepresionQidsPublic />
        </Route>
        <Route path="/depresion_gpc_public/:idmedico/:idpaciente/:key">
          <DepresionEspanolPublic />
        </Route>
        <Route path="/post_traumatico_public/:idmedico/:idpaciente/:key">
          <PostTraumaticoPublic />
        </Route>
        <Route path="/post_traumatico_clinico_public/:idmedico/:idpaciente/:key">
          <PostTraumaticoClinicoPublic />
        </Route>
        <Route path="/post_traumatico_mx_public/:idmedico/:idpaciente/:key">
          <PostTraumaticoMX />
        </Route>

        {/* End of Scales Routes just like anonymous */}


        <Route path="/">
          <MainPacientes />

        </Route>

      </Switch>

      <Footer />
    </Router>
  )
}
