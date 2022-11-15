import React, { useEffect, useState, useRef } from 'react'
import { getData, sendDataBody } from '../../resources';
import { Form, Button, Space, Select, message } from 'antd'
import { usuario } from '../../resources';
import QRCode from "react-qr-code";
import { toBlob, toPng } from 'html-to-image';
const { Option } = Select;


export default function EfectosCreateLink() {

    const [misPacientes, setMisPacientes] = useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [link, setLink] = useState('')
    // Used to add a medico _id when the user is admin
    const [medicosData, setMedicosData] = useState([])
    const [medico, setMedico] = useState(null)

    const imageRef = useRef(null);


    const getPacientesOfDoctor = (_id) => { //Para el caso que la sesion sea de Medico
        getData(`mispacientes/${_id}`).then(rs => { setSelectedPatient(null); setMisPacientes(rs); console.log(`patients of ${_id}`, rs); })
    }

    const getDoctorsData = () => { //Para el caso que la sesion sea de Administrador
        const body = { ids: usuario.medicos_asignados }
        sendDataBody(`users/getMany`, body).then(rs => { setMedicosData(rs); console.log('medicosData: ', rs); })
    }

    useEffect(() => {
        usuario.rol === 'Medico' ? getPacientesOfDoctor(usuario._id) : getDoctorsData()
    }, [])

    const handleDoctorChange = (value) => { setMedico(value); getPacientesOfDoctor(value) };
    const handleChange = (value) => { setLink(null); setSelectedPatient(value) };

    const generateLink = () => {
        let usr = usuario.rol === 'Administrador' ? medico : usuario._id;
        let l = `https://sistema.recreamed.com/ketamina_public/${usr}/${selectedPatient}/${Date.now()}`
        // let l = `http://localhost:3000/ketamina_public/${usr}/${selectedPatient}/${Date.now()}`
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


    return (
        <div>
            <h5>Generar enlace para encuesta de Ketamina</h5>
            <br />
            <Space >
                {
                    usuario.rol === 'Administrador' &&
                    <Form.Item label="Medico" name="usuario" rules={[{ required: true, message: 'Selecciona el paciente' }]}
                        style={{ alignItems: 'center', paddingTop: 20 }}>
                        <Select
                            style={{ width: 260, }}
                            onChange={handleDoctorChange}
                            placeholder='Selecciona un medico'
                        >
                            {
                                medicosData.map((p) => {
                                    return <Option key={p._id} value={p._id}>{p.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                }

                <Form.Item label="Paciente" name="usuario" rules={[{ required: true, message: 'Selecciona el paciente' }]}
                    style={{ alignItems: 'center', paddingTop: 20 }}>
                    <Select
                        style={{ width: 260, }}
                        onChange={handleChange}
                        placeholder='Selecciona un paciente'
                        value={selectedPatient}
                    >
                        {
                            misPacientes.map((p) => {
                                return <Option key={p._id} value={p._id}>{p.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Button onClick={generateLink} disabled={!selectedPatient} >Generar Enlace</Button>
            </Space>

            <br />

            {
                selectedPatient && link ? <div>
                    <Space align='center'>
                    </Space>
                    <p style={{ paddingTop: 16, color: '#1890ff' }} >{link}</p>
                    <Button onClick={copyLink}>Copiar Link</Button>
                    <br />
                    <div ref={imageRef} style={{ background: 'white', padding: '16px' }}> <QRCode value={link} /> </div>
                    <Button onClick={handleDownload}>Descargar Codigo</Button>
                    <Button onClick={handleCopy} style={{ marginLeft: 12 }}>Copiar Codigo</Button>
                </div> : <></>
            }

        </div >
    )
}
