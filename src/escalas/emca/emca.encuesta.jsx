import React, { useEffect, useState } from 'react'
import { EncuestaLoading, ThanksMessage, checkEncuesta, onFinishFailed } from '../utils'
import { Form, Input, Button, message, Radio } from 'antd'
import { sendDataBody } from '../../resources'
import { emca_catalog } from './emca.catalog'
export default function EmcaEncuesta({ idpaciente, idmedico, token, protocolo, momento }) {

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
            emca: Object.values(values),
            tipo: 'emca',
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
            <h4>Encuesta EMCA</h4>
            <br />
            <h5>Medico: {medicoData.name}</h5>
            <h5>Paciente: {pacienteData.name}</h5>
            <br />
            <h5>Escala Multidimensional de Craving de Alcohol (EMCA)</h5>
            <p>Durante la última semana...</p>
            <Form
                layout='vertical'
                name="emca_enc"
                // labelCol={{ span: 24 }}
                // wrapperCol={{ span: 24 }}
                initialValues={[]}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                {
                    emca_catalog.map((q, i) => <Form.Item
                        label={q}
                        name={i}
                        rules={[
                            {
                                required: true,
                                message: 'Seleccione una respuesta',
                            },
                        ]}
                    >
                        <Radio.Group onChange={onChange} >
                            <Radio value={5}>Muy de acuerdo</Radio>
                            <Radio value={4}>Bastante de acuerdo</Radio>
                            <Radio value={3}>Ni de acuerdo ni en desacuerdo</Radio>
                            <Radio value={2}>Bastante en desacuerdo</Radio>
                            <Radio value={1}>Muy en desacuerdo</Radio>
                        </Radio.Group>
                    </Form.Item>)
                }

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button form='emca_enc' type="primary" htmlType="submit">
                        Enviar respuestas
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}