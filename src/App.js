import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import icon from './views/assets/Icon.png';
import Home from "./views/home/home";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Hospitales } from "./views/hospitals/main.hospitals";
import Doctors from "./views/doctors/main.doctors";
import Patients from "./views/pacientes/main.patients";
import { Login } from "./views/session/login";
import { Register } from "./views/session/register";

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
      {/* re-creaMed */}
    </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/hospitales">Hospitales</Nav.Link>
          <Nav.Link href="/doctores">Medicos</Nav.Link>
          <Nav.Link href="/pacientes">Pacientes</Nav.Link>
          <Nav.Link href="#">Citas?</Nav.Link>
          <Nav.Link href="#">Balances</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/hospitales">
          <Navigator />
          <Hospitales />
        </Route>
        <Route path="/doctores">
          <Navigator />
          <Doctors />
        </Route>
        <Route path="/pacientes">
          <Navigator />
          <Patients />
        </Route>
        <Route path="/">
          <Navigator />
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
