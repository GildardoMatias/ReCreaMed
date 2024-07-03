import React, { useState } from 'react';
import { Button } from 'antd';
import { RegisterModal } from '../patients/register.user';

export default function RegisterPatientReception({getPacientesData}) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div style={{marginBottom: 8}}>
            <Button onClick={showModal}>Registrar paciente</Button>

            <RegisterModal getPacientesData={getPacientesData} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

        </div>
    )
}
