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

    const InitialInstr = () => {
        return <p style={{ textAlign: 'justify' }}>
            En este cuestionario se le pregunta sobre 4 tipos de preocupaciones diferentes que puede que usted esté
            (o no esté) experimentando. Para cada tipo de preocupación, hay una descripción del tipo de
            pensamientos (a veces llamados obsesiones) y conductas (a veces llamadas rituales o compulsiones) que
            son típicas de ese tipo de preocupación en particular, seguida de 5 preguntas sobre sus experiencias en
            relación con estos pensamientos y conductas. Por favor, lea cada descripción detenidamente y responda
            a las preguntas para cada categoría basándose en las experiencias que usted ha tenido durante el
            último mes.
        </p>
    }

    const Instr1 = () => {
        return <div>
            <p><strong>Preocupaciones relacionadas con gérmenes y contaminación.</strong></p>
            <p style={{ textAlign: 'justify' }}>
                Ejemplos... <br />
                - Pensar o sentir que está contaminado/a porque estuvo en contacto con ciertos objetos o personas o
                estuvo cerca de ellos.  <br />
                - Sentir que está contaminado/a porque estuvo en ciertos lugares (por ejemplo, un cuarto de baño).  <br />
                - Pensar en gérmenes, enfermedades o en la posibilidad de propagar la contaminación.  <br />
                - Lavarse las manos, usar desinfectante de manos, ducharse, cambiarse de ropa o limpiar objetos
                contaminación. <br />
                - Evitar ciertas personas, objetos o lugares debido a la contaminación. <br />
                Las siguientes preguntas se refieren a sus experiencias con pensamientos y conductas relacionados con
                la contaminación durante el último mes. Recuerde que sus experiencias pueden ser diferentes de los
                ejemplos mencionados anteriormente. Por favor, rodee con un círculo el número junto a su respuesta.
            </p>
        </div>
    }

    const Instr2 = () => {
        return <div>
            <p><strong>Preocupaciones relacionadas con causar daño, provocar lesiones o traer mala suerte</strong></p>
            <p style={{ textAlign: 'justify' }}>
                Ejemplos... <br />
                - Dudar de si ha cometido un error que podría hacer que sucediera algo horrible o perjudicial. <br />
                - Pensar que pueda haber ocurrido un accidente, desastre o daño físico terrible u otra desgracia y que
                usted no fue lo suficientemente precavido para evitarlo. <br />
                - Pensar que usted podía evitar algún daño o desgracia haciendo las cosas de una determinada
                manera, contando hasta cierto número o evitando determinados números o palabras "negativos". <br />
                - Pensar que podía perder algo importante que es poco probable que pierda (por ejemplo, la cartera,
                papeles, documentos personales...). <br />
                - Comprobar cosas como cerraduras, enchufes, la cartera, etc. más de lo necesario. <br />
                - Comprobar repetidamente o preguntar a otras personas para asegurarse de que no ha pasado (o no
                va a pasar) algo malo. <br />
                - Repasar mentalmente cosas del pasado para asegurarse de que no hizo nada malo. <br />
                - Necesitar hacer las cosas en una secuencia determinada para evitar que ocurran cosas dañinas o
                desastres. <br />
                - Necesitar contar hasta cierto número o evitar ciertos números negativos por miedo a que ocurra algo
                malo. <br />
                Las siguientes preguntas se refieren a sus experiencias con los pensamientos y conductas relacionados
                con causar daño o desastres durante el último mes. Recuerde que sus experiencias pueden ser
                ligeramente diferentes de los ejemplos mencionados anteriormente. Por favor, seleccione una respuesta.
            </p>
        </div>
    }

    const Instr3 = () => {
        return <div>
            <p><strong>Pensamientos inaceptables/prohibidos</strong></p>
            <p style={{ textAlign: 'justify' }}>
                Ejemplos... <br />
                - Tener pensamientos desagradables sobre sexo, cosas inmorales o violencia que le vienen a la mente en
                contra de su voluntad. <br />
                - Pensar que podría hacer algo horrible, indecente o que le avergüence que en realidad usted no quiere
                hacer. <br />
                - Repetir una acción o hacer las cosas en una secuencia determinada debido a un mal pensamiento. <br />
                - Realizar mentalmente alguna acción o rezar para deshacerse de un pensamiento no deseado o
                desagradable. <br />
                - Evitar ciertas personas, lugares o situaciones que le provocan pensamientos no deseados o
                desagradables. <br />
                Las siguientes preguntas se refieren a sus experiencias con pensamientos no deseados que vienen a su
                mente en contra de su voluntad y a comportamientos dirigidos a afrontar este tipo de pensamientos
                durante el último mes. Recuerde que sus experiencias pueden ser ligeramente diferentes de los ejemplos
                mencionados anteriormente. Por favor, seleccione respuesta.
            </p>
        </div>
    }

    const Instr4 = () => {
        return <div>
            <p><strong>Preocupaciones sobre simetría y la necesidad de que las cosas estén “bien” o “como tienen que estar".</strong></p>
            <p style={{ textAlign: 'justify' }}>
                Ejemplos... <br /> 
                - Necesitar que las cosas sean/estén simétricas, uniformes, equilibradas o exactas.<br />
                - Sentir que algo no está "del todo bien".<br />
                - Repetir algo del día a día hasta que tiene la sensación de que lo ha hecho "bien" o
                "equilibradamente".<br />
                - Contar cosas absurdas (por ejemplo, azulejos del techo, el número de palabras en una frase, etc.).<br />
                - Poner las cosas en un orden determinado cuando no es necesario.<br />
                - Tener que repetir algo de una manera determinada hasta que está "bien".<br />
                Las siguientes preguntas se refieren a sus sensaciones de que algo no está "bien" y sus conductas
                dirigidas a conseguir una sensación de orden, simetría o equilibrio durante el último mes. Recuerde que
                sus experiencias pueden ser ligeramente diferentes a los ejemplos mencionados anteriormente. Por favor, seleccione una respuesta.
            </p>
        </div>
    }


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


                <InitialInstr />
                <Divider>Categoria 1</Divider>
                <Instr1 />
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
                <Instr2 />
                {docs_catalog_2.map((pregunta, ind) => (
                    <Form.Item key={pregunta.n} name={ind + 5} label={pregunta.pregunta} rules={[{
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
                <Instr3 />
                {docs_catalog_3.map((pregunta, i) => (
                    <Form.Item key={pregunta.n} name={i + 10} label={pregunta.pregunta} rules={[{
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
                <Instr4/>
                {docs_catalog_4.map((pregunta, i) => (
                    <Form.Item key={pregunta.n} name={i + 15} label={pregunta.pregunta} rules={[{
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
                    Enviar respuestas
                    </Button>
                </Form.Item>


            </Form>
        </div>
    )
}
