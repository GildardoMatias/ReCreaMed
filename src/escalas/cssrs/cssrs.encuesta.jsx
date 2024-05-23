import React, { useEffect, useState } from 'react'
import { EncuestaLoading, ThanksMessage, checkEncuesta, onFinishFailed } from '../utils'
import { Form, Input, Button, message, Radio } from 'antd'
import { sendDataBody } from '../../resources'
import { cssrs_catalog } from './cssrs.catalog'
export default function CssrsEncuesta({ idpaciente, idmedico, token, protocolo, momento }) {

    const [encuestaNotExists, setEncuestaNotExists] = useState(null)
    const [checking, setChecking] = useState(true)
    const [pacienteData, setPacienteData] = useState({})
    const [medicoData, setMedicoData] = useState({})

    const [twoEnabled, setTwoEnabled] = useState(false) // Enables 1-5 questions

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
            cssrs: Object.values(values),
            tipo: 'cssrs',
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
    const onEnables = (e) => {
        console.log('radio checked', e.target.value);
        setTwoEnabled(e.target.value)
    };

    const Question = ({ i }) => {
        return <Form.Item
            label={cssrs_catalog[i]}
            name={i}
            rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
            ]}
        >
            <Radio.Group onChange={i === 1 ? onEnables : onChange} >
                <Radio value={true}>Si</Radio>
                <Radio value={false}>No</Radio>
            </Radio.Group>
        </Form.Item>
    }

    if (checking) return <EncuestaLoading />

    if (!encuestaNotExists) return <ThanksMessage />

    return (
        <div className='mainContainer'>
            <h4>Encuesta C-SSRS</h4>
            <br />
            <h5>Medico: {medicoData.name}</h5>
            <h5>Paciente: {pacienteData.name}</h5>
            <br />
            <Form
                layout='vertical'
                name="cssrs_enc"
                // labelCol={{ span: 24 }}
                // wrapperCol={{ span: 24 }}
                initialValues={[]}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <p className='desc'>Desde la última visita:</p>

                <Question i={0} />
                <Question i={1} />

                {
                    twoEnabled && <div>
                        <Question i={2} />
                        <Question i={3} />
                        <Question i={4} />
                    </div>
                }

                <Question i={5} />



                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button form='cssrs_enc' type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}