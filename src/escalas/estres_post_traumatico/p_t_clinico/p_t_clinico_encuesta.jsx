import React, { useState, useEffect } from 'react'
import { Form, Switch, Button, Radio, Space, Row, Col, Select, message, Input } from 'antd'
import { Card } from 'react-bootstrap'
import { getData, sendDataBody } from '../../../resources';
import logo from "../../../assets/Logo.png";

export default function PTClinicoEncuesta(props) {
    const [pesoEnabled, setPesoEnabled] = useState(false)
    const [apetitoEnabled, setApetitoEnabled] = useState(false)
    // For check if the encuesta existts on db
    const [encuestaNotExists, setEncuestaNotExists] = useState(null)
    const [checking, setChecking] = useState(true)
    const [pacienteData, setPacienteData] = useState({})
    const [medicoData, setMedicoData] = useState({})



    useEffect(() => {
        checkEncuesta()
    }, [])

    const checkEncuesta = () => {

        getData('getuser/' + props.idpaciente).then((rs) => { setPacienteData(rs) })
        getData('getuser/' + props.idmedico).then((rs) => { setMedicoData(rs) })


        getData(`encuestas/uuid/${props.token}`).then(rs => {
            console.log(rs);
            setEncuestaNotExists(rs.message === 'The survey does not exist')
        }).then(() => { setChecking(false); console.log('Not exists: ', encuestaNotExists); })
    }

    const onFinish = (values) => {


        console.log('Vals EPTClinic: ', values);
        const body = {
            usuario: props.idpaciente,
            medico: props.idmedico,
            score: values,
            tipo: 'depresion',
            uuid: props.token
        }

        console.log('Efectos body:', body);
        sendDataBody('encuestas/add', body).then((rs) => {
            console.log(rs)
            message.success(rs.message)
        }).then(() => checkEncuesta())
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        errorInfo.errorFields.map((p) => {
            message.error('Conteste la pregunta ' + p.name)
        })
    };
    const handleChange = (value) => {
        // console.log(`selected ${value}`);
    };

    // Loading state
    if (checking) return <div style={{ paddingTop: 180 }}>
        <div style={{ margin: 'auto', width: '40%', textAlign: 'center' }}>
            <h3 >Cargando</h3>
        </div>
    </div>

    if (!encuestaNotExists) return <div style={{ paddingTop: 180 }}>
        <div style={{ margin: 'auto', width: '40%', textAlign: 'center' }}>
            <h3 >Gracias por contestar la encuesta</h3>
            <img width={256} src={logo} alt="recreamedLogo" style={{ margin: 'auto' }} />
        </div>
    </div>

    return (
        <div className='mainContainer'>
            <h4>Post Traumatico Clinico Encuesta</h4>
            <br />
            <h5>Medico: {medicoData.name}</h5>
            <h5>Paciente: {pacienteData.name}</h5>
            <br />

            <Form
                name="basic"
                layout='vertical'
                // labelCol={{ span: 8 }}
                // wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >


               <Form.Item
                    label="¿Ha estado especialmente alerta o vigilante, auncuando no había necesidad real? ¿Se ha sentidocomo si estuviese constantemente en guardia? ¿Porqué?  ¿Cuánto  tiempo  durante  el  último  mes?¿Cuándo comenzó a actuar así? (Después delacon-tecimiento?)0.  Nunca1.  Muy poco (menos del 10 %)2.  Algo (aproximadamente el 20-30 %)3.  Mucho tiempo (aproximadamente el 50-60 %)4.  Todo o casi todo el tiempo (más del 60 %) Descripción/Ejemplos:"
                    name="Name"
                    rules={[{ required: true, message: `Selecciona una opcion` }]}
                >
                    <Input />
                </Form.Item>





                <Form.Item
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}
