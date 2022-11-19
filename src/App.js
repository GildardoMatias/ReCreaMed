import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Login } from "./session/login";
import { Register } from "./session/register";
import "./App.css"
import DoctorApp from "./doctorViews/doctorApp";
import RecepcionApp from "./recepcionViews/recepcionApp";
import PatientApp from "./patientViews/patientApp";
import AdminHospitalApp from "./admHospitalViews/adminHospitalApp";
import SuperAdminApp from "./superAdminViews/superAdminApp";
import KetaminaPublic from "./session/ketaminaPublic";
import DepresionPublic from "./session/depresionPublic";
import HeadachePublic from "./session/dolorPublic";
import PostTraumaticoPublic from "./session/postTraumaticoPublic";

const userType = localStorage.getItem('userType');

// Changing Repo

export function App() {

  const token = localStorage.getItem('sessionToken');

  // Public Routes
  if (!token) {
    console.log("tok:", localStorage.getItem('sessionToken'));
    return <Router>
      <Switch>
        <Route path="/ketamina_public/:idmedico/:idpaciente/:key">
          <KetaminaPublic />
        </Route>
        <Route path="/depresion_public/:idmedico/:idpaciente/:key">
          <DepresionPublic />
        </Route>
        <Route path="/dolor_public/:idmedico/:idpaciente/:key">
          <HeadachePublic />
        </Route>
        <Route path="/post_traumatico_public/:idmedico/:idpaciente/:key">
          <PostTraumaticoPublic />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
        <Router path="/">
          <Login />
        </Router>

      </Switch>
    </Router>
  }

  switch (userType) {
    case 'SuperAdministrador':
      return <SuperAdminApp />
    case 'Administrador':
      return <AdminHospitalApp />
    case 'Recepcion':
      return <RecepcionApp />
    case 'Paciente':
      return <PatientApp />
    case 'Medico':
      return <DoctorApp />
    default:
      return 'foo';
  }
}