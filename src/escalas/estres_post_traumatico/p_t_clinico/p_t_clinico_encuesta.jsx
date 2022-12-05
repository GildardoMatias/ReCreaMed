import React, { useState, useEffect } from 'react'
import { Form, Switch, Button, Radio, Space, Row, Col, Select, message, Input } from 'antd'
import { Card } from 'antd'
import { getData, sendDataBody } from '../../../resources';
import { p_t_clinico_catalog } from './p_t_clinico_catalog'
import logo from "../../../assets/Logo.png";
const { TextArea } = Input;
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

    const Radios = (props) => {
        const l = props.letra;
        const n = props.numero;
        return <div>

            <h6>A(1)</h6>

            <Form.Item label='¿Amenaza vital?' name={`Ac${n}_A1_1`} rules={[{ required: true, message: `Selecciona una opcion` }]} >
                <Radio.Group name={props.nombre} key={props.nombre} >
                    <Radio value="No">No</Radio>
                    <Radio value="Si">Si</Radio>
                    <Radio value="Sujeto">Sujeto</Radio>
                    <Radio value="Otro">Otro</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label='¿Lesion Grave?' name={`Ac${n}_A1_2`} rules={[{ required: true, message: `Selecciona una opcion` }]} >
                <Radio.Group name={props.nombre} key={props.nombre} >
                    <Radio value="No">No</Radio>
                    <Radio value="Si">Si</Radio>
                    <Radio value="Sujeto">Sujeto</Radio>
                    <Radio value="Otro">Otro</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label='¿Amenaza de la integridad física?' name={`Ac${props.n}_A2`} rules={[{ required: true, message: `Selecciona una opcion` }]} >
                <Radio.Group name={props.nombre} key={props.nombre} >
                    <Radio value="No">No</Radio>
                    <Radio value="Si">Si</Radio>
                    <Radio value="Sujeto">Sujeto</Radio>
                    <Radio value="Otro">Otro</Radio>
                </Radio.Group>
            </Form.Item>

            <h6>{l}(2)</h6>
            <Form.Item label='¿Miedo intenso/indefensión/horror?' name={`Ac${props.n}_CritA`} rules={[{ required: true, message: `Selecciona una opcion` }]} >
                <Radio.Group name={props.nombre} key={props.nombre} >
                    <Radio value="No">No</Radio>
                    <Radio value="Si">Si</Radio>
                    <Radio value="Durante">Durante</Radio>
                    <Radio value="Despues">Despues</Radio>
                </Radio.Group>
            </Form.Item>

            <h6>Criterio A</h6>
            <Form.Item label='¿Se cumple?' name={`Ac${props.n}_A1_3`} rules={[{ required: true, message: `Selecciona una opcion` }]} >
                <Radio.Group name={props.nombre} key={props.nombre} >
                    <Radio value="No">No</Radio>
                    <Radio value="Probable">Probable</Radio>
                    <Radio value="Si">Si</Radio>
                </Radio.Group>
            </Form.Item>

        </div>


    }

    return (
        <div className='mainContainer'>
            <h4>Escala para el Trastorno por Estrés Postraumático Administradapor el Clínico (Clinician Administered PTSD Scale, CAPS)</h4>
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

                {
                    p_t_clinico_catalog.map((p) => {
                        return <div>

                            <h5>{p.n}</h5>
                            <Row>
                                <Col span={12} style={{ padding: 6 }}>
                                    <Form.Item
                                        label={p.pregunta}
                                        name="Ac1"
                                        rules={[{ required: true, message: `Selecciona una opcion` }]}
                                    >
                                        <TextArea />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Card>
                                        <Radios letra={p.criterio} />
                                    </Card>
                                </Col>


                            </Row>
                        </div>
                    })
                }

                <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}
