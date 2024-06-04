import React, { useEffect, useState, useRef } from 'react'
import { getData, sendDataBody } from '../resources';
import { Form, Button, Space, Select, message } from 'antd'
import { usuario, ids_hospitales } from '../resources';
import QRCode from "react-qr-code";
import { toBlob, toPng } from 'html-to-image';
import Loading from '../loading';
const { Option } = Select;



export default function EscalasCreateGeneralLink(props) {

    const [loading, setLoading] = useState(true)

    const [link, setLink] = useState('')

    // New Mode of first patient after medic selecting
    const [medico, setMedico] = useState(null) // medico selected
    const [medicos, setMedicos] = useState([]) // List of medicos able to select
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [allPacientes, setAllPacientes] = useState([])

    // Added to determine the protocol and moment of application
    const [protocolo, setProtocolo] = useState('default')
    const [momento, setMomento] = useState('default')

    useEffect(() => {
        const getAllMedicos = async () => {
            await getData(`users/hospital/${ids_hospitales[0]}`).then(rs => { getAllPacientes(rs) })
        }

        usuario.rol === 'Medico' ? getPacientesOfDoctor(usuario._id) : getAllMedicos()

    }, [])

    const getAllPacientes = async (medicos) => {
        const medicosFormatted = medicos.map(m => m._id)
        await sendDataBody('pacientes/medicos', { medicos: medicosFormatted }).then(rs => { setAllPacientes(rs); setLoading(false) })
    }

    const handlePatientChange = (value) => {
        setLink(null);
        setSelectedPatient(value)
        const found = allPacientes.find((p) => p._id === value);
        if (found) {

            let { medicos_asignados } = found
            medicos_asignados.forEach((m) => {
                m.label = m.name; m.value = m._id
            });

            setMedicos(medicos_asignados);

        } else {
            message.error('Paciente no encontrado')
        }
    };

    const handleProtocolChange = value => setProtocolo(value)
    const handleMomentoChange = value => setMomento(value)

    const handleDoctorChange = (value) => { setMedico(value); setLink(null); };

    const getPacientesOfDoctor = (_id) => { //Para el caso que la sesion sea de Medico
        getData(`mispacientes/${_id}`).then(rs => { setSelectedPatient(null); setAllPacientes(rs); setLoading(false); console.log(`patients of ${_id}`, rs); })
    }
    // End New Mode of first patient after medic selecting

    const imageRef = useRef(null);

    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const generateLink = () => {
        let usr = (usuario.rol === 'Administrador' || usuario.rol === 'Recepcion' || usuario.rol === 'Enfermero') ? medico : usuario._id;

        // let l = `https://sistema.recreamed.com/${props.tipo}_public/${usr}/${selectedPatient}/${Date.now()}/${protocolo}/${momento}`
        let l = `http://localhost:3000/${props.tipo}_public/${usr}/${selectedPatient}/${Date.now()}/${protocolo}/${momento}`
        setLink(l)
    }
    const copyLink = () => {
        navigator.clipboard.writeText(link)
        message.success('Enlace Copiado al Portapapeles!')
    }

    const handleDownload = async () => {
        const dataUrl = await toPng(imageRef.current, { width: 288 });

        // download image
        const link = document.createElement('a');
        link.download = "codigo-de-enlace.png";
        link.href = dataUrl;
        link.click();
    }

    const handleCopy = async () => {
        message.info('Espere mientras se copia el codigo...')
        toBlob(imageRef.current, { width: 288 })
            .then(async function (blob) {
                try {
                    await navigator.clipboard.write([
                        // eslint-disable-next-line no-undef
                        new ClipboardItem({
                            [blob.type]: blob
                        })
                    ]);
                    console.log("Image copied");
                    message.success('Codigo Copiado al Portapapeles')
                } catch (error) {
                    console.error(error);
                }
            });
    }

    if (loading) return <Loading />

    return (
        <div>

            <Form.Item label="Paciente" name="usuario" rules={[{ required: true, message: 'Selecciona el paciente' }]}
                style={{ alignItems: 'center', paddingTop: 20 }}
                labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>

                <Select
                    showSearch
                    filterOption={filterOption}
                    onChange={handlePatientChange}
                    placeholder='Selecciona un paciente'
                    value={selectedPatient}
                    options={
                        allPacientes.map((p) => (
                            {
                                ...p,
                                key: p._id,
                                value: p._id,
                                label: p.name
                            }
                        ))
                    }
                />
            </Form.Item>


            {
                (usuario.rol === 'Administrador' || usuario.rol === 'Recepcion' || usuario.rol === 'Enfermero') &&
                <Form.Item label="Medico" name="usuario" rules={[{ required: true, message: 'Selecciona el paciente' }]}
                    style={{ alignItems: 'center', paddingTop: 20 }}
                    labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>

                    <Select
                        showSearch
                        filterOption={filterOption}
                        onChange={handleDoctorChange}
                        placeholder='Selecciona un medico'
                        options={
                            medicos.map((p) => (
                                {
                                    ...p,
                                    key: p._id,
                                    value: p._id,
                                    label: p.name
                                }
                            ))
                        }
                    />
                </Form.Item>
            }


            <Form.Item label="Protocolo" name="protocolo" rules={[{ required: true, message: 'Selecciona el paciente' }]}
                style={{ alignItems: 'center', paddingTop: 20 }}
                labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>

                <Select
                    showSearch
                    filterOption={filterOption}
                    onChange={handleProtocolChange}
                    placeholder='Selecciona protocolo'
                    value={selectedPatient}
                    options={[
                        {
                           
                            key: 'p1',
                            value: 'depreres',
                            label:"Depresón resistente al tratamiento"
                        },
                        {
                           
                            key: 'p2',
                            value: 'Tinnitus',
                            label:"Tinnitus"
                        },
                        {
                           
                            key: 'p3',
                            value: 'Toc',
                            label:"Trastorno obsesivo compulsivo (TOC)"
                        },
                         {
                           
                            key: 'p4',
                            value: 'Alcoholismo',
                            label:"Alcoholismo"
                        },
                        {
                           
                            key: 'p5',
                            value: 'Opioides',
                            label:"Opioides"
                        },
                        {
                           
                            key: 'p6',
                            value: 'Dolor',
                            label:"Dolor"
                        },
                        {
                           
                            key: 'p7',
                            value: 'estrespt',
                            label:"Estrés post traumatico"
                        },
                       
                    ]}
                />
            </Form.Item>


            <Form.Item label="Momento" name="momento" rules={[{ required: true, message: 'Selecciona el paciente' }]}
                style={{ alignItems: 'center', paddingTop: 20 }}
                labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>

                <Select
                    showSearch
                    filterOption={filterOption}
                    onChange={handleMomentoChange}
                    placeholder='Selecciona momento de la aplicación'
                    value={selectedPatient}
                    options={[
                        {
                           
                            key: 'm1',
                            value: 'inicial',
                            label:"Aplicación inicial"
                        },
                        {
                           
                            key: 'm2',
                            value: 'final',
                            label:"Aplicación final"
                        },
                        {
                           
                            key: 'm3',
                            value: 'mant1',
                            label:"Aplicación inicio mantenimiento"
                        },
                        {
                           
                            key: 'm4',
                            value: 'mant2',
                            label:"Aplicación final mantenimiento"
                        },
                    ]}
                />
            </Form.Item>


            <Button style={{alignSelf: 'flex-end'}} onClick={generateLink} disabled={usuario.rol === 'Medico' ? !selectedPatient : !medico} >Generar Enlace</Button>


            <br />

            {
                selectedPatient && link ? <div>

                    <p style={{ paddingTop: 16, color: '#1890ff' }} >{link}</p>
                    <Button onClick={copyLink}>Copiar Link</Button>

                    {
                        usuario.rol === 'Recepcion' && <Button type='primary' href={link} target='_blank' rel='noreferrer' style={{ marginLeft: 14 }}>Contestar Ahora</Button>
                    }

                    <br />
                    
                    <div className='columna'>
                        <div ref={imageRef} style={{ background: 'white', padding: '16px' }}> <QRCode value={link} /> </div>
                        <div>
                            <Button onClick={handleDownload}>Descargar Codigo</Button>
                            <Button onClick={handleCopy} style={{ marginLeft: 12 }}>Copiar Codigo</Button>
                        </div>
                    </div>

                </div> : <></>
            }

        </div >
    )
}