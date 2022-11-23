import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import EscalasCreateGeneralLink from '../../escalasCreateGeneralLink';
;
export default function PostTraumaticoMexicanaResults() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) };
    const handleOk = () => { setIsModalOpen(false) };
    const handleCancel = () => { setIsModalOpen(false) }

    return (
        <div>
            <h4>Resultados de la Validación mexicana de la Escala de Estrés Traumático Secundario</h4>

            <br />
            <Button type="primary" onClick={showModal}>
                Crear Enlace EPT 1
            </Button>
            <br />

            {/* Here Will Be rEsutlts */}

            
            <Modal title="Crear Encuesta de Estres Post Traumatico" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <EscalasCreateGeneralLink tipo='post_traumatico' />
            </Modal>
        </div>
    )
}
