import React, { useEffect, useState } from 'react'
import { EncuestaLoading, ThanksMessage, checkEncuesta, onFinishFailed } from '../utils'
import { Form, Input, Button, message, Radio } from 'antd'
import { sendDataBody } from '../../resources'
import { d2_catalog_1, d2_catalog_2 } from './dolor2_catalog'
import PainZoneSelector from './dolor2_selector'

export default function Dolor2Encuesta({ idpaciente, idmedico, token, protocolo, momento }) {

    const [encuestaNotExists, setEncuestaNotExists] = useState(null)
    const [checking, setChecking] = useState(true)
    const [pacienteData, setPacienteData] = useState({})
    const [medicoData, setMedicoData] = useState({})

    useEffect(() => {
        init()
    }, [])

    function init() {
        checkEncuesta(token, idpaciente, setPacienteData, idmedico, setMedicoData, setEncuestaNotExists, setChecking)
    }

    const onFinish = (values) => {
        console.log('Orginal values: ', values)
        const body = {
            usuario: idpaciente,
            medico: idmedico,
            dolor_2: Object.values(values),
            tipo: 'dolor_2',
            uuid: token,
            cat: [protocolo, momento]
        }
        console.log('Body:', body);
        // sendDataBody('encuestas/add', body).then((rs) => {
        //     console.log('add enc resp', rs)
        //     message.success(rs.message)
        // }).then(() => init())
    };

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
    };

    const Instructions = () => {
        return <p>
            Durante las  <u>últimas 2 semanas</u>, ¿qué tan seguido ha tenido molestias debido a los siguientes problemas?
            <br /> <span style={{ fontSize: 14 }}>(Selecciona una respuesta)</span>
        </p>
    }

    if (checking) return <EncuestaLoading />

    if (!encuestaNotExists) return <ThanksMessage />

    return (
        <div className='mainContainer'>
            <h4>Encuesta de Dolor</h4>
            <br />
            <h5>Medico: {medicoData.name}</h5>
            <h5>Paciente: {pacienteData.name}</h5>

            <br />
            <Instructions />

            <Form
                layout='vertical'
                name="dolor_2_enc"
                // labelCol={{ span: 24 }}
                // wrapperCol={{ span: 24 }}
                initialValues={[]}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                {
                    d2_catalog_1.map((q, i) => <Form.Item
                        label={q}
                        name={i}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Radio.Group onChange={onChange} >
                            <Radio value={0}>Ningún día</Radio>
                            <Radio value={1}>Varios días</Radio>
                            <Radio value={2}>Más de la mitad de los días</Radio>
                            <Radio value={3}>Casi todos los días</Radio>
                        </Radio.Group>
                    </Form.Item>)
                }

                <PainZoneSelector />


                {
                    d2_catalog_2.map((q, i) => <Form.Item
                        label={q}
                        name={i}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Radio.Group onChange={onChange} >
                            <Radio value={0}>Ningún día</Radio>
                            <Radio value={1}>Varios días</Radio>
                            <Radio value={2}>Más de la mitad de los días</Radio>
                            <Radio value={3}>Casi todos los días</Radio>
                        </Radio.Group>
                    </Form.Item>)
                }

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button form='dolor_2_enc' type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}