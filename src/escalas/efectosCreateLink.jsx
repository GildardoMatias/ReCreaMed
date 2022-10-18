import React, { useEffect, useState, useRef } from 'react'
import { getData, sendDataBody } from '../resources';
import { Form, Button, Space, Select, message } from 'antd'
import { usuario } from '../resources';
import QRCode from "react-qr-code";
import { toBlob, toPng } from 'html-to-image';
const { Option } = Select;


export default function EfectosCreateLink() {

    const [misPacientes, setMisPacientes] = useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [link, setLink] = useState('')

    const imageRef = useRef(null);

    useEffect(() => {
        getData(`mispacientes/${usuario._id}`).then(rs => { setMisPacientes(rs); console.log(rs); })
    }, [])

    const handleChange = (value) => { setSelectedPatient(value) };

    const generateLink = () => {
        let l = `https://sistema.recreamed.com/escalas_public/${usuario._id}/${selectedPatient}/${Date.now()}`
        // let l = `http://localhost:3000/escalas_public/${usuario._id}/${selectedPatient}/${Date.now()}`
        setLink(l)
    }
    const copyLink = () => {
        navigator.clipboard.writeText(link)
        message.success('Enlace Copiado al Portapapeles!')
    }

    const handleShare = async () => {
        console.log('trying to share')
        const newFile = await toBlob(imageRef.current);
        const data = {
            files: [
                new File([newFile], 'image.png', {
                    type: newFile.type,
                }),
            ],
            title: 'Image',
            text: 'image',
        };

        try {
            if (!navigator.canShare(data)) {
                console.error("Can't share");
            }
            await navigator.share(data);
        } catch (err) {
            console.error(err);
        }
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
            <h5>Generar enlace para encuesta</h5>
            <br />
            <Space >
                <Form.Item label="Paciente" name="usuario" rules={[{ required: true, message: 'Selecciona el paciente' }]}
                    style={{ alignItems: 'center', paddingTop: 20 }}>
                    <Select
                        style={{ width: 260, }}
                        onChange={handleChange}
                        placeholder='Selecciona un paciente'
                    >
                        {
                            misPacientes.map((p) => {
                                return <Option value={p._id}>{p.name}</Option>
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
                        <p style={{ paddingTop: 16, color: '#1890ff' }} >{link}</p>
                        <Button onClick={copyLink}>Copiar Link</Button>
                    </Space>
                    <br />
                    <div ref={imageRef} style={{ background: 'white', padding: '16px' }}> <QRCode value={link} /> </div>
                    <Button onClick={handleDownload}>Descargar Codigo</Button>
                    <Button onClick={handleCopy} style={{ marginLeft: 12 }}>Copiar Codigo</Button>
                </div> : <></>
            }


            <div style={{ height: 350 }}></div>

        </div >
    )
}
