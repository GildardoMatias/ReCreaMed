import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import icon from './assets/Icon.png';
import Home from "./superAdminViews/home/home";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Hospitales } from "./superAdminViews/hospitals/main.hospitals";
import Doctors from "./superAdminViews/doctors/main.doctors";
import Patients from "./doctorViews/pacientes/main.patients";
import { Login } from "./session/login";
import { Register } from "./session/register";
import { Button } from 'antd'
import { Historial } from "./doctorViews/historial";
import { Notas } from "./patientViews/notas";
import { DoctorNotas } from "./doctorViews/doctorNotas";
import { MisCitas } from "./patientViews/misCitas";
import "./App.css"
import { SuperAdminExpedientes } from "./superAdminViews/expedientes";
import { Citas } from "./doctorViews/citas";
import Users from "./superAdminViews/users/main.users";
import { useEffect } from "react";

const logout = () => { localStorage.removeItem('sessionToken'); localStorage.removeItem('userType'); window.location.href = '/'; }

const userType = localStorage.getItem('userType');

function Navigator() {
  switch (userType) {
    case 'Administrador':
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
              <Nav.Link href="usuarios">Usuarios</Nav.Link>
              <Nav.Link href="expedientes">Expedientes</Nav.Link>
              <Nav.Link href="#">|</Nav.Link>

            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Button onClick={logout} >Cerrar Sesion</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>;
    case 'Paciente':
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
            Bienvenido Paciente
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="/">Landing</Nav.Link> */}
              <Nav.Link href="/miscitas">Mis Citas</Nav.Link>
              <Nav.Link href="/misnotas">Mis Notas</Nav.Link>
              <Nav.Link href="/historial_clinico">Mi Historial</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Button onClick={logout} >Cerrar Sesion</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>;
    case 'Medico':
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
            Bienvenido Medico
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">


              <Nav.Link href="/">Inicio</Nav.Link>
              <Nav.Link href="/">Farmacia</Nav.Link>
              <Nav.Link href="/pacientes">Pacientes</Nav.Link>
              <Nav.Link href="/citas">Citas</Nav.Link>
              <Nav.Link href="/notas">Notas</Nav.Link>
              <Nav.Link href="#">Expedientes</Nav.Link>
              <Nav.Link href="#">Recetas</Nav.Link>

            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Button onClick={logout} >Cerrar Sesion</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>;
    default:
      return 'foo';
  }

}

export function App() {

  useEffect(() => {
  }, [])

  const token = localStorage.getItem('sessionToken');

  if (!token) {
    console.log("tok:", localStorage.getItem('sessionToken'));
    return <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Router path="/">
          <Login />
        </Router>

      </Switch>
    </Router>
  }

  return (
    <Router>
      <Navigator />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        {/* Superadmin */}
        <Route path="/hospitales">
          <Hospitales />
        </Route>
        <Route path="/doctores">
          <Doctors />
        </Route>
        <Route path="/expedientes">
          <SuperAdminExpedientes />
        </Route>
        <Route path="/usuarios">
          <Users />
        </Route>
        {/* En of superadmin */}

        {/* Start of Doctor */}
        <Route path="/pacientes">
          <Patients />
        </Route>
        <Route path="/citas">
          <Citas />
        </Route>
        <Route path="/notas">
          <DoctorNotas />
        </Route>
        {/* End of Doctor */}

        {/* Start Paciente */}
        <Route path="/misnotas">
          <Notas />
        </Route>
        <Route path="/miscitas">
          <MisCitas />
        </Route>
        <Route path="/historial_clinico">
          <Historial />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        {/* Ends Paciente */}
      </Switch>
    </Router>
  );
}