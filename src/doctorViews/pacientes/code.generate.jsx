import React, { useState, useRef } from 'react'
import { Button, Modal, message } from 'antd'
import { QrcodeOutlined } from '@ant-design/icons';
import QRCode from "react-qr-code";
import { toBlob, toPng } from 'html-to-image';
import { usuario } from '../../resources';

export default function CodeGenerate() {

    const imageRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const url = `https://sistema.recreamed.com/register/${usuario._id}/patient`
    // const url = `localhost:3000/register/${usuario._id}/patient`

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(url)
        message.success('Enlace Copiado al Portapapeles!')
    }

    const handleDownload = async () => {
        const dataUrl = await toPng(imageRef.current, { width: 288 });

        // download image
        const link = document.createElement('a');
        link.download = "codigo-de-registro.png";
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

    return <div>
        <Button className='btnIconCentered' style={{ height: 30, marginLeft: 6 }} onClick={showModal} size='small' icon={<QrcodeOutlined />} shape='round' type="primary" ghost >Registrar con QR</Button>

        <Modal title="Registro por QR" open={isModalOpen} onCancel={handleCancel} footer={[<Button type='primary' onClick={handleOk}>Cerrar</Button>]}        >

            <p>Comparta el siguiente {<Button title='Haga click para copiar el enlace' type='link' onClick={copyLink} style={{ marginRight: 0, marginLeft: 0, padding: 0 }}>enlace</Button>} para registrar un nuevo paciente:</p>
            {/* <a href={url} target='_blank' rel='noreferrer'>Ir al enlace</a> */}
            {/* <Button onClick={copyLink}>Copiar enlace</Button> */}


            <div className='columna'>
                <div ref={imageRef} style={{ background: 'white', padding: '16px' }}> <QRCode value={url} /> </div>
                <div>
                    <Button onClick={handleDownload}>Descargar Codigo</Button>
                    <Button onClick={handleCopy} style={{ marginLeft: 12 }}>Copiar Codigo</Button>
                </div>
            </div>

        </Modal>
    </div>

}
