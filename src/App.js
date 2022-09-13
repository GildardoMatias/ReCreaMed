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

const userType = localStorage.getItem('userType');

// Changing Repo

export function App() {

  const token = localStorage.getItem('sessionToken');

  if (!token) {
    console.log("tok:", localStorage.getItem('sessionToken'));
    return <Router>
      <Switch>
        <Route path="/escalas_public/:id/:key">
          <KetaminaPublic/>
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
      return <SuperAdminApp/>
    case 'Administrador':
      return <AdminHospitalApp/>
    case 'Recepcion':
      return <RecepcionApp/>
    case 'Paciente':
      return <PatientApp/>
    case 'Medico':
      return <DoctorApp />
    default:
      return 'foo';
  }
}