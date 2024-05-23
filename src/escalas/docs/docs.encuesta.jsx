import React, { useEffect, useState } from 'react'
import { Button, Divider, Form, Radio, message, Input } from "antd";
import { EncuestaLoading, ThanksMessage, checkEncuesta, onFinishFailed } from '../utils'
import { sendDataBody } from '../../resources'
import { docs_catalog_1, docs_catalog_2, docs_catalog_3, docs_catalog_4 } from './docs.catalog';

export default function DocsEncuesta({ idpaciente, idmedico, token, protocolo, momento }) {

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

    function convertirObjeto(objeto) {
        const resultado = {};

        for (const clave in objeto) {
            const [categoria, indice] = clave.split('-');
            if (!resultado[categoria]) {
                resultado[categoria] = new Array(5).fill(0);
            }
            resultado[categoria][parseInt(indice) - 1] = objeto[clave];
        }

        return resultado;
    }

    const onFinish = (values) => {

        console.log('Values: ', values)

        const objetoConvertido = convertirObjeto(respuestas);
        console.log('New', objetoConvertido)



        const body = {
            usuario: idpaciente,
            medico: idmedico,
            docs: objetoConvertido,
            tipo: 'docs',
            uuid: token,
            cat: [protocolo, momento]
        }

        console.log('Body:', body);
        sendDataBody('encuestas/add', body).then((rs) => {
            console.log('add enc resp', rs)
            message.success(rs.message)
        }).then(() => init())
    };

    const onDocsFinishFailed = (errorInfo) => {
        console.log(errorInfo)
        message.error('Revise el formulario y conteste todas las preguntas')

    }

    const onChange = (e) => {
        message.info('radio checked ' + e.target.value);
    };

    const [respuestas, setRespuestas] = useState({});

    const handleRespuestaChange = (n, value) => {
        setRespuestas({ ...respuestas, [n]: value });
    };


    if (checking) return <EncuestaLoading />

    if (!encuestaNotExists) return <ThanksMessage />
    return (
        <div className='mainContainer'>
            <h4>Encuesta DOCS</h4>
            <br />
            <h5>Medico: {medicoData.name}</h5>
            <h5>Paciente: {pacienteData.name}</h5>
            <br />

            <Form
                layout='vertical'
                name="docs_enc"
                // labelCol={{ span: 24 }}
                // wrapperCol={{ span: 24 }}
                initialValues={[]}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">

               

                <Divider>Categoria 1</Divider>
                {docs_catalog_1.map((pregunta, i) => (
                    <Form.Item key={pregunta.n} name={i} label={pregunta.pregunta} rules={[{
                        required: true,
                        message: 'Seleccione una respuesta',
                    },
                    ]}>
                        <Radio.Group
                            onChange={(e) => handleRespuestaChange(pregunta.n, e.target.value)}
                            value={respuestas[pregunta.n]}

                        >
                            {pregunta.respuestas.map((respuesta, index) => (
                                <Radio key={index} value={index}>
                                    {respuesta}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                ))}

                <br />
                <Divider>Categoria 2</Divider>
                {docs_catalog_2.map((pregunta,ind) => (
                <Form.Item key={pregunta.n} name={ind+5} label={pregunta.pregunta} rules={[{
                    required: true,
                    message: 'Seleccione una respuesta',
                },
                ]}>
                    <Radio.Group
                        onChange={(e) => handleRespuestaChange(pregunta.n, e.target.value)}
                        value={respuestas[pregunta.n]}
                    >
                        {pregunta.respuestas.map((respuesta, index) => (
                            <Radio key={index} value={index}>
                                {respuesta}
                            </Radio>
                        ))}
                    </Radio.Group>
                </Form.Item>
                ))}

                <br />
                <Divider>Categoria 3</Divider>
                {docs_catalog_3.map((pregunta,i) => (
                    <Form.Item key={pregunta.n} name={i+10} label={pregunta.pregunta} rules={[{
                        required: true,
                        message: 'Seleccione una respuesta',
                    },
                    ]}>
                        <Radio.Group
                            onChange={(e) => handleRespuestaChange(pregunta.n, e.target.value)}
                            value={respuestas[pregunta.n]}
                        >
                            {pregunta.respuestas.map((respuesta, index) => (
                                <Radio key={index} value={index}>
                                    {respuesta}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                ))}

                <br />
                <Divider>Categoria 4</Divider>
                {docs_catalog_4.map((pregunta,i) => (
                    <Form.Item key={pregunta.n} name={i+15} label={pregunta.pregunta} rules={[{
                        required: true,
                        message: 'Seleccione una respuesta',
                    },
                    ]}>
                        <Radio.Group
                            onChange={(e) => handleRespuestaChange(pregunta.n, e.target.value)}
                            value={respuestas[pregunta.n]}
                        >
                            {pregunta.respuestas.map((respuesta, index) => (
                                <Radio key={index} value={index}>
                                    {respuesta}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                ))}



                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button form='docs_enc' type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>


            </Form>
        </div>
    )
}
