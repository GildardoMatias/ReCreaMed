import React, { useState, useEffect } from 'react'
import { Form, Switch, Button, Radio, Space, Row, Col, Select, message, Input } from 'antd'
import { Card } from 'react-bootstrap'
import { getData, sendDataBody } from '../../../resources';
import logo from "../../../assets/Logo.png";
import { post_catalog } from './p_t_catalog'
const { Option } = Select;

export default function PostTraumaticoEncuesta(props) {
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
        Object.keys(values).map(k => values[k] = Object.values(values[k]))
        console.log('Values: ', values);
        const body = {
            usuario: props.idpaciente,
            medico: props.idmedico,
            score: values,
            tipo: 'post_traumatico',
            uuid: props.token
        }

        console.log('Post Traum Body:', body);
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
            <h4>La Evaluación Del Trastorno Por Estrés Postraumático: Aproximación A Las Propiedades Psicométricas De La Escala De Trauma De Davidson</h4>
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

                {/* {
                    post_catalog.map((p, i) => {
                        return <Form.Item
                            label={p}
                            name={i}
                            rules={[{ required: true, message: `Selecciona una opcion` }]}
                        >
                            <Radio.Group>
                                <Space direction="vertical">
                                    <Radio value={0}> Nunca </Radio>
                                    <Radio value={1}> A veces </Radio>
                                    <Radio value={2}> 2-3 veces </Radio>
                                    <Radio value={3}> Nunca </Radio>
                                    <Radio value={4}> Nunca </Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    })
                } */}

                {
                    post_catalog.map((p, i) => {
                        return <Form.Item label={p}>
                            <Input.Group compact>
                                <Form.Item
                                    label='Frecuencia'
                                    name={[i + 1, 'Frecuencia']}
                                    noStyle
                                    rules={[{ required: true, message: 'Selecciona Frecuencia' },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Space direction="vertical">
                                            <Radio value={0}> Nunca </Radio>
                                            <Radio value={1}> A Veces </Radio>
                                            <Radio value={2}> 2-3 Veces </Radio>
                                            <Radio value={3}> 4-6 Veces </Radio>
                                            <Radio value={4}> A diario </Radio>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    label='Gravedad'
                                    name={[i + 1, 'Gravedad']}
                                    noStyle
                                    rules={[{ required: true, message: 'Selecciona Gravedad' }]}
                                >
                                    <Radio.Group>
                                        <Space direction="vertical">
                                            <Radio value={0}> Nada </Radio>
                                            <Radio value={1}> Leve </Radio>
                                            <Radio value={2}> Moderada </Radio>
                                            <Radio value={3}> Marcada </Radio>
                                            <Radio value={4}> Extrema </Radio>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>
                            </Input.Group>
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

        </div >
    )
}
