import React, { useEffect, useState } from 'react'
import { EncuestaLoading, ThanksMessage, checkEncuesta, onFinishFailed } from '../utils'
import { Form, Input, Button, message, Radio } from 'antd'
import { sendDataBody } from '../../resources'
import { pcl5_questions } from './pcl5.catalog'

export default function Pcl5Encuesta({ idpaciente, idmedico, token, protocolo, momento }) {
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
        // console.log('Orginal values: ', values)

        const valuesArray = Object.values(values).filter(val => typeof val === 'number');
        const newArray = [...valuesArray];

        const newObj = {
            ...values,
            problemas: newArray
        };

        // Eliminar las claves numéricas del objeto original
        Object.keys(newObj).forEach(key => {
            if (!isNaN(parseInt(key))) {
                delete newObj[key];
            }
        });

        // console.log('New Array ', newObj)

        const body = {
            usuario: idpaciente,
            medico: idmedico,
            pcl_5: newObj,
            tipo: 'pcl_5',
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

    const inputRules = [{ required: true, message: 'Conteste correctamente' }];

    if (checking) return <EncuestaLoading />

    if (!encuestaNotExists) return <ThanksMessage />

    return (
        <div className='mainContainer'>
            <h4>Encuesta PCL-5</h4>
            <br />
            <h5>Medico: {medicoData.name}</h5>
            <h5>Paciente: {pacienteData.name}</h5>
            <br />
            <Form
                layout='vertical'
                name="pcl5_enc"
                // labelCol={{ span: 24 }}
                // wrapperCol={{ span: 24 }}
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="Brevemente identifique el peor de los casos (si usted se siente cómodo haciendolo)"
                    name="peor_caso"
                    rules={[{ required: true, message: 'Conteste correctamente' }]}
                >
                    <Input placeholder='peor de los casos' />
                </Form.Item>

                <Form.Item
                    label="¿Hace cuanto tiempo pasó? (Por favor estime si usted no está seguro)"
                    name="tiempo"
                    rules={inputRules}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Hubo muerte real o amenaza, lesiones graves o violencia sexual?"
                    name='muerte_real'
                    rules={inputRules}
                >
                    <Radio.Group onChange={(e) => console.log('changed ', e.target.value)} >
                        <Radio value={true}>Si</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    key='como_experimento'
                    label="¿Cómo lo experimentó?"
                    name='como_experimento'
                    rules={inputRules}
                >
                    <Radio.Group onChange={onChange} >
                        <Radio value="Me paso a mi directamente">Me pasó a mí directamente</Radio>
                        <Radio value="Fui testigo de ello">Fui testigo de ello</Radio>
                        <Radio value="Supe que le pasó a un familiar cercano o un amigo cercano">Supe que le pasó a un familiar cercano o un amigo cercano</Radio>
                        <Radio value="Yo estaba expuesto en repetidas ocasiones sobre detalles al respecto como parte de mi trabajo">Yo estaba expuesto en repetidas ocasiones sobre detalles al respecto como parte de mi trabajo (por ejmplo, paramedico, policia, militar, ayuda de primera respuesta)</Radio>
                        <Radio value="Otra">Otra</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    key='muerte_familiar'
                    id='muerte_familiar'
                    label="Si el, evento involucra la muerte de un familiar cercano o un amigo cercano, ¿fué debido a algún tipo de accidente o violencia, o fué por causas naturales?"
                    name="muerte_familiar"
                    rules={inputRules}
                >
                    <Radio.Group onChange={onChange} >
                        <Radio value="Accidente o violencia">Accidente o violencia</Radio>
                        <Radio value="Causas naturales">Causas naturales</Radio>
                        <Radio value="No aplicable">No aplicable (el evento no involucra la muerte de un familiar o amistad cercana)</Radio>
                    </Radio.Group>
                </Form.Item>

                <strong>En el mes pasado, cuánto le ha molestado tener:</strong>
                {
                    pcl5_questions.map((q, i) => <Form.Item
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
                            <Radio value={0}>No del todo</Radio>
                            <Radio value={1}>Un Poco</Radio>
                            <Radio value={2}>Moderado</Radio>
                            <Radio value={3}>Mucho</Radio>
                            <Radio value={4}>Extremadamente</Radio>
                        </Radio.Group>
                    </Form.Item>)
                }

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button form='pcl5_enc' type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
