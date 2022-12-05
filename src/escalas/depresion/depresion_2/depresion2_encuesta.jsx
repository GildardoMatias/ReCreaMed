import React, { useState, useEffect } from 'react'
import { Form, Switch, Button, Radio, Space, Row, Col, Select, message, Divider } from 'antd'
import { Card } from 'react-bootstrap'
import { getData, sendDataBody } from '../../../resources';
import logo from "../../../assets/Logo.png";
import { depresion2_catalog, catalog2, catalog3, preg10 } from './depresion2_catalog'
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
        let primeros = 0, segundos = 0, terceros = 0;
        console.log('Sintomatologia gpc:', values);

        for (let i = 1; i < 17; i++) { primeros += values[i] }

        for (let i = 1; i < 11; i++) {
            const pos = `2_${i}`
            segundos += values[pos]
        }
        for (let i = 1; i < 10; i++) {
            const pos = `3_${i}`
            terceros += values[pos]
        }


        const respuestas = {
            hrsd: primeros,
            madrs: segundos,
            phq: terceros
        }


        console.log('repuestas: ', respuestas);
        const body = {
            usuario: props.idpaciente,
            medico: props.idmedico,
            respuestas_depresion2_gpc: respuestas,
            tipo: 'depresion_gpc',
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

    // Depreison GPC
    return (
        <div className='mainContainer'>
            <h4>Encuesta de las versiones validadas en español de las escalas HRSD, MADRS y PHQ-9</h4>
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
                            key={p.n}
                            label={p.pregunta}
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
                            key={p.n}
                            label={p.pregunta}
                            name={'2_' + p.n}
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
                <h4>Cuestionario sobre la Salud del Paciente (PHQ-9)108 ©1999 Pfizer Inc.</h4>
                <h5>Durante  las  últimas  2  semanas,  ¿con  qué  frecuencia  le  han  molestado  cada  uno  de  los  siguientes problemas?</h5>
                {
                    catalog3.map((p, i) => {
                        return <Form.Item
                            key={i}
                            label={p}
                            name={'3_' + (i + 1)}
                            rules={[{ required: true, message: `Selecciona una opcion` }]}
                        >
                            <Radio.Group>
                                <Space direction="vertical">
                                    <Radio value={0}> Nunca </Radio>
                                    <Radio value={1}> Varios Dias </Radio>
                                    <Radio value={2}> Más de la mitad de los días </Radio>
                                    <Radio value={3}> Todos o casi todos los días </Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    })
                }

                <Form.Item
                    label={preg10}
                    name='4_1'
                    rules={[{ required: true, message: `Selecciona una opcion` }]}
                >
                    <Radio.Group>
                        <Space direction="vertical">
                            <Radio value="0"> Nada en absoluto </Radio>
                            <Radio value="1"> Algo difícil </Radio>
                            <Radio value="2"> Muy difícil </Radio>
                            <Radio value="3"> Extremadamente difícil </Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>

        </div >
    )
}
