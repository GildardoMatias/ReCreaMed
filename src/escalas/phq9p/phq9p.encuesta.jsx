import React, { useEffect, useState } from 'react'
import { EncuestaLoading, ThanksMessage, checkEncuesta, onFinishFailed } from '../utils'
import { Form, Input, Button, message, Radio } from 'antd'
import { sendDataBody } from '../../resources'
import { phq9_catalog } from './phq9p.catalog'
export default function Phq9pEncuesta({ idpaciente, idmedico, token, protocolo, momento }) {

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
            phq9p: Object.values(values),
            tipo: 'phq9p',
            uuid: token,
            cat: [protocolo, momento]
        }
        console.log('Body:', body);
        sendDataBody('encuestas/add', body).then((rs) => {
            console.log('add enc resp', rs)
            message.success(rs.message)
        }).then(() => init())
    };

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
    };

    if (checking) return <EncuestaLoading />

    if (!encuestaNotExists) return <ThanksMessage />

    return (
        <div className='mainContainer'>
            <h4>Encuesta PHQ9P</h4>
            <br />
            <h5>Medico: {medicoData.name}</h5>
            <h5>Paciente: {pacienteData.name}</h5>
            <br />

            <p className='name'>Durante las ultimas dos semanas, ¿qué tan seguido ha tenido molestias por alguna de las siguientes dificultades?</p>

            <Form
                layout='vertical'
                name="phq9p_enc"
                // labelCol={{ span: 24 }}
                // wrapperCol={{ span: 24 }}
                initialValues={[]}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                {
                    phq9_catalog.map((q, i) => <Form.Item
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
                            <Radio value={0}>No del todo</Radio>
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
                    <Button form='phq9p_enc' type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}