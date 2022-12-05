import React, { useState, useEffect } from 'react'
import { Form, Switch, Button, Radio, Space, Row, Col, Select, message, Divider } from 'antd'
import { getData, sendDataBody } from '../../../resources';
import logo from "../../../assets/Logo.png";
import { catalog_ept_mexicana } from './p_t_mexicana_catalog';

export default function PTMexicanaEncuesta(props) {

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

        console.log('vals depres MX: ', values);
        const body = {
            usuario: props.idpaciente,
            medico: props.idmedico,
            respuestas_ept_3mx: values,
            tipo: 'post_traumatico_mx',
            uuid: props.token
        }
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
            <h4>Validación mexicana de la Escala de Estrés Traumático Secundario  </h4>
            <br />
            <h5>Medico: {medicoData.name}</h5>
            <h5>Paciente: {pacienteData.name}</h5>
            <br />

            <Form
                name="p_t_mx"
                layout='vertical'
                // labelCol={{ span: 8 }}
                // wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                {
                    catalog_ept_mexicana.map((p, i) => {
                        return <Form.Item
                            key={i}
                            label={p}
                            name={i + 1}
                            rules={[{ required: true, message: `Selecciona una opcion` }]}
                        >
                            <Radio.Group>
                                <Space direction="vertical">
                                    <Radio value={1}>Totalmente en desacuerdo.</Radio>
                                    <Radio value={2}>En desacuerdo. </Radio>
                                    <Radio value={3}>De acuerdo. </Radio>
                                    <Radio value={4}>Totalmente de acuerdo. </Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    })
                }

                <br />

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
