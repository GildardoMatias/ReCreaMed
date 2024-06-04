import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'antd/dist/antd.css';
import { Login } from "./session/login";
import { Register } from "./session/register";
import "./App.css"
import DoctorApp from "./doctorViews/doctorApp";
import RecepcionApp from "./recepcionViews/recepcionApp";
import PatientApp from "./patientViews/patientApp";
import AdminHospitalApp from "./admHospitalViews/adminHospitalApp";
import SuperAdminApp from "./superAdminViews/superAdminApp";
import { KetaminaPublic, DepresionQidsPublic, DepresionEspanolPublic, HeadachePublic, PostTraumaticoPublic, PostTraumaticoClinicoPublic, PostTraumaticoMX, SatisfaccionPublic, Gad7Public, PHQ9PPublic, CssrsPublic, ThiPublic, EmcaPublic, OwsPublic, SowsPublic, DocsPublic, Pcl5Public, Dolor2Public } from './session/public_escalas_routes';
import RegisterPatientFisio from "./session/register_patient_fisio";

const userType = localStorage.getItem('userType');

// Changing Repo
// Melissa Anton adm cidealr melissaanton59@gmail.com 4351063115
// Marana Enferm mivg2509@gmail.com 4431460122

export function App() {

  const token = localStorage.getItem('sessionToken');

  // Public Routes
  if (!token) {
    console.log("tok:", localStorage.getItem('sessionToken'));
    return <Router>
      <Switch>
        <Route path="/ketamina_public/:idmedico/:idpaciente/:key/:protocolo/:momento">
          <KetaminaPublic />
        </Route>
        <Route path="/dolor_public/:idmedico/:idpaciente/:key/:protocolo/:momento">
          <HeadachePublic />
        </Route>
        <Route path="/depresion_qids_public/:idmedico/:idpaciente/:key/:protocolo/:momento">
          <DepresionQidsPublic />
        </Route>
        <Route path="/depresion_gpc_public/:idmedico/:idpaciente/:key/:protocolo/:momento">
          <DepresionEspanolPublic />
        </Route>
        <Route path="/post_traumatico_public/:idmedico/:idpaciente/:key/:protocolo/:momento">
          <PostTraumaticoPublic />
        </Route>
        <Route path="/post_traumatico_clinico_public/:idmedico/:idpaciente/:key/:protocolo/:momento">
          <PostTraumaticoClinicoPublic />
        </Route>
        <Route path="/post_traumatico_mx_public/:idmedico/:idpaciente/:key/:protocolo/:momento">
          <PostTraumaticoMX />
        </Route>
        <Route path="/satisfaccion_public/:idmedico/:idpaciente/:key/:protocolo/:momento">
          <SatisfaccionPublic />
        </Route>
        <Route path="/gad_7_public/:idmedico/:idpaciente/:key/:protocolo/:momento">
          <Gad7Public />
        </Route>
        <Route path="/phq9p_public/:idmedico/:idpaciente/:key/:protocolo/:momento">
          <PHQ9PPublic />
        </Route>
        <Route path="/cssrs_public/:idmedico/:idpaciente/:key/:protocolo/:momento">
          <CssrsPublic />
        </Route>
        <Route path="/thi_public/:idmedico/:idpaciente/:key/:protocolo/:momento">
          <ThiPublic />
        </Route>
        <Route path="/docs_public/:idmedico/:idpaciente/:key/:protocolo/:momento">
          <DocsPublic />
        </Route>
        <Route path="/emca_public/:idmedico/:idpaciente/:key/:protocolo/:momento">
          <EmcaPublic />
        </Route>
        <Route path="/ows_public/:idmedico/:idpaciente/:key/:protocolo/:momento">
          <OwsPublic />
        </Route>
        <Route path="/sows_public/:idmedico/:idpaciente/:key/:protocolo/:momento">
          <SowsPublic />
        </Route>
        <Route path="/dolor_2_public/:idmedico/:idpaciente/:key/:protocolo/:momento">
          <Dolor2Public />
        </Route>
        <Route path="/pcl_5_public/:idmedico/:idpaciente/:key/:protocolo/:momento">
          <Pcl5Public />
        </Route>


        <Route path="/register/:idmedico/patient">
          <RegisterPatientFisio />
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

  // Private Apps / routes
  switch (userType) {
    case 'SuperAdministrador':
      return <SuperAdminApp />
    case 'Administrador':
      return <AdminHospitalApp />
    case 'Recepcion':
      return <RecepcionApp />
    case 'Enfermero':
      return <RecepcionApp />
    case 'Paciente':
      return <PatientApp />
    case 'Medico':
      return <DoctorApp />
    default:
      return 'foo';
  }
}