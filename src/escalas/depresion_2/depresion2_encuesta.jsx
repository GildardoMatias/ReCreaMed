import React, { useState, useEffect } from 'react'
import { Form, Switch, Button, Radio, Space, Row, Col, Select, message, Divider } from 'antd'
import { Card } from 'react-bootstrap'
import { getData, sendDataBody } from '../../resources';
import logo from "../../assets/Logo.png";
import { depresion2_catalog, catalog2 } from './depresion2_catalog'
const { Option } = Select;

export default function Depresion2Encuesta(props) {
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
        let _score = 0;
        let high1_4 = 0;
        let high6_9 = 0;
        console.log('Sintomatologia:', values);
        // El mayor de la 1 a la 4
        for (var i = 1; i < 5; i++) {
            if (values[i] > high1_4) high1_4 = values[i]
        }
        // El mayor de la 6 a la 9
        for (var i = 6; i < 10; i++) {
            if (values[i] > high6_9) high6_9 = values[i]
        }
        // console.log('6-9', high6_9)
        // Suma de la 10 a la 14
        for (var i = 10; i < 15; i++) {
            _score += values[i]
        }
        // Suma el mayor enre 15 y 16 y sumarlo
        values[15] > values[16] ? _score += values[15] : _score += values[16];

        // Sumar la 5 y el resto
        _score = _score + high1_4 + values[5] + high6_9;

        console.log('score: ', _score);
        const body = {
            usuario: props.idpaciente,
            medico: props.idmedico,
            score: _score,
            tipo: 'depresion',
            uuid: props.token
        }

        console.log('Efectos body:', body);
        // sendDataBody('encuestas/add', body).then((rs) => {
        //   console.log(rs)
        //   message.success(rs.message)
        // }).then(() => checkEncuesta())
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
            <h4>Anexo 2. Versiones validadas en español de las escalas HRSD, MADRS y PHQ-9</h4>
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
                <h4>Versión validada en español de la HRSD1</h4>

                {
                    depresion2_catalog.map((p) => {
                        return <Form.Item
                            label={p.n + '. ' + p.pregunta}
                            name={p.n}
                            rules={[{ required: true, message: `Selecciona una opcion` }]}
                        >
                            <Radio.Group>
                                <Space direction="vertical">
                                    {
                                        p.respuestas.map((r, i) => <Radio value={i}> {r} </Radio>)
                                    }
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    })
                }
                <h4>Versión validada en español de la escala Montgomery-Asberg Depression Rating Scale (MADRS)1</h4>
                {
                    catalog2.map((p) => {
                        return <Form.Item
                            label={p.n + '. ' + p.pregunta}
                            name={p.n}
                            rules={[{ required: true, message: `Selecciona una opcion` }]}
                        >
                            <Radio.Group>
                                <Space direction="vertical">
                                    {
                                        p.respuestas.map((r, i) => <Radio value={i}> {r} </Radio>)
                                    }
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    })
                }










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
