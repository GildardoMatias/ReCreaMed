import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import EscalasCreateGeneralLink from '../../escalasCreateGeneralLink';

export default function PostTraumaticoResults() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) };
    const handleOk = () => { setIsModalOpen(false) };
    const handleCancel = () => { setIsModalOpen(false) };
    return (
        <div>
            <h4>Resultados de La Evaluación Del Trastorno Por Estrés Postraumático: Aproximación A Las Propiedades Psicométricas De La Escala De Trauma De Davidson</h4>
            <br />
            <Button type="primary" onClick={showModal}>
                Crear Enlace EPT 1
            </Button>
            <br />

            <Modal title="Crear Encuesta de Ketamina" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <EscalasCreateGeneralLink tipo='post_traumatico' />
            </Modal>
        </div>
    )
}
