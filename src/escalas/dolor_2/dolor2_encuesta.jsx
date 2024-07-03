import React, { useEffect, useState } from 'react'
import { EncuestaLoading, ThanksMessage, checkEncuesta, onFinishFailed } from '../utils'
import { Form, Input, Button, message, Radio, Slider } from 'antd'
import { sendDataBody } from '../../resources'
import { d2_catalog_1, d2_catalog_2 } from './dolor2_catalog'
import PainZoneSelector from './dolor2_selector'
import pain1 from '../../assets/pain1.jpg'
import pain2 from '../../assets/pain2.jpg'
import pain3 from '../../assets/pain3.jpg'
import pain4 from '../../assets/pain4.jpg'

export default function Dolor2Encuesta({ idpaciente, idmedico, token, protocolo, momento }) {

    const [form] = Form.useForm();

    // const marks = { 0: '0', 10: '10' }
    const marks = { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10' }
    const names = ["one", "two", "tree"]

    const [encuestaNotExists, setEncuestaNotExists] = useState(null)
    const [checking, setChecking] = useState(true)
    const [pacienteData, setPacienteData] = useState({})
    const [medicoData, setMedicoData] = useState({})

    const [ansOne, setAnsOne] = useState(0)
    const [ansTwo, setAnsTwo] = useState(0)
    const [ansTree, setAnsTree] = useState(0)
    const [ansFour, setAnsFour] = useState(0)
    const [dolorZone, setDolorZone] = useState({})
    const [irradiates, setIrradiates] = useState({})

    useEffect(() => {
        init()
    }, [])

    function init() {
        checkEncuesta(token, idpaciente, setPacienteData, idmedico, setMedicoData, setEncuestaNotExists, setChecking)
    }

    const onFinish = (values) => {

        const dolorSchema = {
            one: ansOne,
            two: ansTwo,
            tree: ansTree,
            // four: "" + values.four,
            four: ansFour,
            zona: JSON.stringify(dolorZone),
            irradia: JSON.stringify(irradiates),
            questions: Object.values(values)
        }

        // one: Number,
        // two: Number,
        // tree: Number,
        // four: String,
        // zona: String,
        // irradia: String,
        // questions: [Number]

        const body = {
            usuario: idpaciente,
            medico: idmedico,
            dolor_2: dolorSchema,
            tipo: 'dolor_2',
            uuid: token,
            cat: [protocolo, momento]
        }
        console.log('Values:', values);
        console.log('Body:', body);
        sendDataBody('encuestas/add', body).then((rs) => {
            console.log('add enc resp', rs)
            message.success(rs.message)
        }).then(() => init())
    };

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setAnsFour(e.target.value)
    };

    const SliderItem = ({ label, name, value, setState }) => {
        return <Form.Item
            label={label}
            name={name}
            rules={[{ required: true, message: 'Por favor seleccione un valor' }]}
        >
            <Slider value={value}
                onChange={(value) => setState(value)}
                defaultValue={0} min={0} max={10} marks={marks} />
            <div style={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
                <span>Ningún dolor</span>
                <span>Máximo dolor</span>
            </div>
        </Form.Item>
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


            <Form
                form={form}
                layout='vertical'
                name="dolor_2_enc"
                // labelCol={{ span: 24 }}
                // wrapperCol={{ span: 24 }}
                initialValues={[]}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >



                <SliderItem label={d2_catalog_1[0]} value={ansOne} setState={setAnsOne} />
                <SliderItem label={d2_catalog_1[1]} value={ansTwo} setState={setAnsTwo} />
                <SliderItem label={d2_catalog_1[2]} value={ansTree} setState={setAnsTree} />

                {/* <Form.Item
                    key={1111}
                    label={d2_catalog_1[0]}
                    name='one'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >

                    <Slider defaultValue={0} min={0} max={10} marks={marks} />
                </Form.Item>

                <Form.Item
                    key={222}
                    label={d2_catalog_1[1]}
                    name='two'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >

                    <Slider defaultValue={0} min={0} max={10} marks={marks} />
                </Form.Item> */}


                <Form.Item
                    label='Seleccione imagen que mejor describa el curso de su dolor'
                    // name='four'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Radio.Group onChange={onChange}>
                        <Radio value={0}>
                            <img src={pain1} alt="Dolor1" style={{ marginRight: 5, marginBottom: 4 }} />
                            Dolor constante con ligeras fluctuaciones</Radio>
                        <Radio value={1}>
                            <img src={pain2} alt="Dolor2" style={{ marginRight: 5, marginBottom: 4 }} />
                            Dolor constante con ataques de dolor</Radio>
                        <Radio value={2}>
                            <img src={pain3} alt="Dolor3" style={{ marginRight: 5, marginBottom: 4 }} />
                            Ataques de dolor sin dolor entre los ataques</Radio>
                        <Radio value={3}>
                            <img src={pain4} alt="Dolor4" style={{ marginRight: 5, marginBottom: 4 }} />
                            Ataques de dolor frecuentes con con dolor entre los ataques
                        </Radio>
                    </Radio.Group>
                </Form.Item>

                {/* <Form.Item
                    // name={name}
                    label='Seleccione su zona de dolor'
                    rules={[{ required: true, message: 'Por favor seleccione un valor' }]}
                    valuePropName="value"
                    trigger="onChange"
                >
                </Form.Item> */}
                <PainZoneSelector setDolorZone={setDolorZone} setIrradiates={setIrradiates} />


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
                        <Radio.Group  >
                            <Radio value={0}>No</Radio>
                            <Radio value={1}>Muy ligera</Radio>
                            <Radio value={2}>Ligera</Radio>
                            <Radio value={3}>Moderada</Radio>
                            <Radio value={4}>Intensa</Radio>
                            <Radio value={5}>Muy intensa</Radio>
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
                        Enviar respuestas
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}