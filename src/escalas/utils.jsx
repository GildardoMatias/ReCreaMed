import { getData } from "../resources"
import logo from "../assets/Logo.png";
import { message } from "antd";


export const EncuestaLoading = () => <div style={{ paddingTop: 180 }}>
    <div style={{ margin: 'auto', width: '40%', textAlign: 'center' }}>
        <h3 >Cargando</h3>
    </div>
</div>

export function checkEncuesta  ( token, idpaciente, setPacienteData, idmedico, setMedicoData, setEncuestaNotExists, setChecking ) {

    getData('getuser/' + idpaciente).then((rs) => { setPacienteData(rs) })
    getData('getuser/' + idmedico).then((rs) => { setMedicoData(rs) })


    getData(`encuestas/uuid/${token}`).then(rs => {
        console.log(rs);
        setEncuestaNotExists(rs.message === 'The survey does not exist')
    }).then(() => { setChecking(false) })
}

export const ThanksMessage = () => {
    return <div style={{ paddingTop: 180 }}>
        <div style={{ margin: 'auto', width: '40%', textAlign: 'center' }}>
            <h3 >Gracias por contestar la encuesta</h3>
            <img width={256} src={logo} alt="recreamedLogo" style={{ margin: 'auto' }} />
        </div>
    </div>
}

export const onFinishFailed = (errorInfo) => {
    errorInfo.errorFields.map((p) => {
        message.error('Conteste la pregunta ' + p.name)
    })
};