import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import icon from './hospitalViews/assets/Icon.png';
import Home from "./hospitalViews/home/home";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Hospitales } from "./hospitalViews/hospitals/main.hospitals";
import Doctors from "./hospitalViews/doctors/main.doctors";
import Patients from "./doctorViews/pacientes/main.patients";
import { Login } from "./hospitalViews/session/login";
import { Register } from "./hospitalViews/session/register";
import { Button } from 'antd'
import { Historial } from "./doctorViews/historial";
import { Notas } from "./patientViews/notas";
import { DoctorNotas } from "./doctorViews/doctorNotas";
import { MisCitas } from "./patientViews/misCitas";
import "./App.css"
import { Expedientes } from "./hospitalViews/expedientes";
import { Citas } from "./doctorViews/citas";
import Users from "./hospitalViews/users/main.users";
import { useEffect } from "react";

const logout = () => { localStorage.removeItem('sessionToken'); localStorage.removeItem('userType'); window.location.href = '/login'; }

const userType = localStorage.getItem('userType');

function Navigator() {
  switch (userType) {
    case 'admin':
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
              <Nav.Link href="/">Landing</Nav.Link>
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
    case 'patient':
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
              <Nav.Link href="/">Landing</Nav.Link>
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
    case 'medic':
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

  // First Nav

  // return <Navbar bg="light" expand="lg">
  //   <Container>
  //     <Navbar.Brand href="#home">
  //       <img
  //         src={icon}
  //         width="40"
  //         height="35"
  //         className="d-inline-block align-top"
  //         alt="Recreamed logo"
  //       />
  //       {/* re-creaMed */}
  //     </Navbar.Brand>
  //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //     <Navbar.Collapse id="basic-navbar-nav">
  //       <Nav className="me-auto">

  //         {/* <NavDropdown title="Aplicacion Publica" id="basic-nav-dropdown">
  //           <NavDropdown.Item href="/">Inicio</NavDropdown.Item>
  //           <NavDropdown.Item href="/">Landing (pendiente)</NavDropdown.Item>
  //           <NavDropdown.Item href="/">Farmacia (pendiente)</NavDropdown.Item>
  //         </NavDropdown>

  //         <NavDropdown title="Aplicacion para la administracion" id="basic-nav-dropdown">
  //           <NavDropdown.Item href="/hospitales">Hospitales</NavDropdown.Item>
  //           <NavDropdown.Item href="/doctores">Medicos</NavDropdown.Item>
  //           <NavDropdown.Item href="usuarios">Usuarios</NavDropdown.Item>
  //           <NavDropdown.Item href="expedientes">Expedientes</NavDropdown.Item>
  //         </NavDropdown>

  //         <NavDropdown title="Aplicacion para el medico" id="basic-nav-dropdown">
  //           <NavDropdown.Item href="/pacientes">Pacientes</NavDropdown.Item>
  //           <NavDropdown.Item href="/citas">Citas</NavDropdown.Item>
  //           <NavDropdown.Item href="/notas">Notas</NavDropdown.Item>
  //           <NavDropdown.Item href="/historial_clinico">Historial</NavDropdown.Item>
  //         </NavDropdown>

  //         <NavDropdown title="Aplicacion para el paciente" id="basic-nav-dropdown">
  //           <NavDropdown.Item href="/miscitas">Mis Citas</NavDropdown.Item>
  //           <NavDropdown.Item href="/misnotas">Mis Notas</NavDropdown.Item>
  //         </NavDropdown> */}



  //         {/* 
  //         <Nav.Link href="/">Inicio</Nav.Link>
  //         <Nav.Link href="/">Landing</Nav.Link>
  //         <Nav.Link href="/">Farmacia</Nav.Link>
  //         <Nav.Link href="#">|</Nav.Link>
  //         <Nav.Link href="/hospitales">Hospitales</Nav.Link>
  //         <Nav.Link href="/doctores">Medicos</Nav.Link>
  //         <Nav.Link href="usuarios">Usuarios</Nav.Link>
  //         <Nav.Link href="#">|</Nav.Link> */}
  //         {/* <Nav.Link href="expedientes">Expedientes</Nav.Link>
  //         <Nav.Link href="/pacientes">Pacientes</Nav.Link>
  //         <Nav.Link href="/citas">Citas</Nav.Link>
  //         <Nav.Link href="/notas">Notas</Nav.Link>
  //         <Nav.Link href="/historial_clinico">Historial</Nav.Link> */}
  //         {/* <Nav.Link href="#">|</Nav.Link>
  //         <Nav.Link href="/miscitas">Mis Citas</Nav.Link>
  //         <Nav.Link href="/misnotas">Mis Notas</Nav.Link> */}

  //       </Nav>
  //     </Navbar.Collapse>
  //     <Navbar.Collapse className="justify-content-end">
  //       <Button onClick={logout} >Cerrar Sesion</Button>
  //     </Navbar.Collapse>
  //   </Container>
  // </Navbar>
}

export function App() {

  useEffect(() => {
    // fetch("https://recreamed.com/usuarios", {
    //   //  'GET', // *GET, POST, PUT, DELETE, etc.
    //   mode: 'same-origin', // no-cors, *cors, same-origin
    //   // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //   // credentials: 'same-origin', // include, *same-origin, omit
    //   // headers: {
    //   //  'Content-Type': 'application/json'
    //   //  'Content-Type': 'application/x-www-form-urlencoded',
    //   //  'Access-Control-Allow-Origin': '*',
    //   // }
    // })
    //   .then(data =>{ console.log("dara", data); return data})
    //   .then(res => console.log("Users", res.body)) 
  }, [])

  const token = localStorage.getItem('sessionToken');

  if (!token) {
    console.log("tok:", localStorage.getItem('sessionToken'));
    return <Router>
      <Switch>
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
        {/* <Route path="/register">
          <Register />
        </Route> */}
        <Route path="/hospitales">

          <Hospitales />
        </Route>
        <Route path="/doctores">
          <Doctors />
        </Route>
        <Route path="/expedientes">
          <Expedientes />
        </Route>
        <Route path="/pacientes">
          <Patients />
        </Route>
        <Route path="/citas">
          <Citas />
        </Route>
        <Route path="/notas">
          <DoctorNotas />
        </Route>
        <Route path="/usuarios">
          <Users />
        </Route>
        <Route path="/citas">
          <Users />
        </Route>
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
      </Switch>
    </Router>
  );
}

