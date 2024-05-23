import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { RegisterModal } from '../pacientes/register.user';

export default function RegisterPatientReception({getPacientesData}) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div style={{marginBottom: 8}}>
            <Button onClick={showModal}>Registrar paciente</Button>

            <RegisterModal getPacientesData={getPacientesData} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

        </div>
    )
}
