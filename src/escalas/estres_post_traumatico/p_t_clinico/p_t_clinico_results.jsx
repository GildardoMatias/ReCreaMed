import React, { useState } from 'react'
import { Button, Modal } from 'antd';
// import PTClinicoEncuesta from './p_t_clinico_encuesta'
import EscalasCreateGeneralLink from '../../escalasCreateGeneralLink';

// Hoja Verde
export default function PostTraumaticoClinicoResults() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => { setIsModalOpen(true) };
  const handleOk = () => { setIsModalOpen(false) };
  const handleCancel = () => { setIsModalOpen(false) };
  return (
    <div>
      <h4>Resultados de la Escala para el Trastorno por Estrés Postraumático Administrada por el Clínico (Clinician Administered PTSD Scale, CAPS)</h4>
      <Button type="primary" onClick={showModal}>
        Crear Enlace EPT 2
      </Button>
      <br />

      <Modal title="Crear Encuesta de TEPT 2" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <EscalasCreateGeneralLink tipo='post_traumatico_clinico' />
      </Modal>
    </div>
  )
}
