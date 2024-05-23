import React, { useState, useEffect } from 'react'
import { dolor_catalog, initialDolorValues } from './dolor_catalog';
import { Form, Input, Button, Slider, Checkbox, Radio, message, Row } from 'antd';
import { getData, sendDataBody } from '../../resources';
import logo from "../../assets/Logo.png";
import head from '../../assets/head.jpg';

export default function DolorEncuesta(props) {
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
        const body = {
            usuario: props.idpaciente,
            medico: props.idmedico,
            respuestas_dolor: values,
            tipo: 'dolor',
            uuid: props.token
        }
        console.log('Body:', body);
        sendDataBody('encuestas/add', body).then((rs) => {
            console.log('add enc resp', rs)
            message.success(rs.message)
        }).then(() => checkEncuesta())
    };
    const onFinishFailed = (errorInfo) => {
        console.log('init', initialDolorValues)
        console.log('Failed:', errorInfo);
        errorInfo.errorFields.map((p) => {
            message.error('Conteste la pregunta ' + p.name)
        })
    };
    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    const marks = { 0: '0', 10: '10' };

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
            <h4>Encuesta de Dolor</h4>
            <br />
            <h5>Medico: {medicoData.name}</h5>
            <h5>Paciente: {pacienteData.name}</h5>
            <br />
            <Form
                layout='vertical'
                name="dolor_esc"
                // labelCol={{ span: 24 }}
                // wrapperCol={{ span: 24 }}
                initialValues={initialDolorValues}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >



                <Form.Item
                    key={1}
                    label='1. Indique en el diagrama las zonas donde siente dolor sombreando la parte afectada. Marque una cruz en la zona que más le duele.'
                    name={1}
                    rules={[{ required: true, message: 'Conteste correctamente' }]}
                >
                    {/* <Checkbox.Group options={['Delante Derecha', 'Delante Izquierda', 'Detras Derecha', 'Detras Izquierda']} defaultValue={['Apple']} onChange={onChange} /> */}
                    <Checkbox.Group
                        style={{
                            width: '100%',
                        }}
                        onChange={onChange}
                    >
                        <Row>
                            <div className='columna'>
                                <br />
                                <br />
                                <Checkbox value="Delante Izquierda">Delante Izquierda</Checkbox>
                                <br />
                                <br />
                                <br />
                                <Checkbox value="Detras Izquierda">Detras Izquierda</Checkbox>
                            </div>
                            <div>
                                <img
                                    src={head}
                                    width="140"
                                    height="160"
                                    // className="d-inline-block align-top"
                                    alt="Head diagram"
                                />
                            </div>
                            <div className='columna'>
                                <br />
                                <br />
                                <Checkbox value="Delante Derecha">Delante Derecha</Checkbox>
                                <br />
                                <br />
                                <br />
                                <Checkbox value="Detras Derecha">Detras Derecha</Checkbox>
                            </div>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

                {
                    dolor_catalog.map((p) => {
                        let input;
                        switch (p.tipo) {
                            case 'metrica':
                                input = <Slider defaultValue={0} min={0} max={10} marks={marks} />
                                break;
                            case 'multiple':
                                input = <Checkbox.Group options={p.respuestas} defaultValue={['Apple']} onChange={onChange} />
                                break;
                            case 'seleccion':
                                input = <Radio.Group>
                                    {p.respuestas.map((r, i) => { return <Radio value={i}>{r}</Radio> })}
                                </Radio.Group>;
                                break;
                            case 'texto':
                                input = < Input />;
                                break;
                            default:
                                input = < Input />;
                        }

                        return p.tipo !== 'titulo' ? <Form.Item
                            key={p.n}
                            label={p.pregunta}
                            name={p.n}
                            rules={[{ required: true, message: 'Conteste correctamente' }]}
                        >
                            {input}
                        </Form.Item> : <h5>{`${p.n}.  ${p.pregunta}`}</h5>
                    })
                }


                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button form='dolor_esc' type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
