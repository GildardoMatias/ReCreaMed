import React, { useState } from 'react'
import { Button } from 'antd'
import { CloudDownloadOutlined, AccountBookOutlined, BookOutlined } from '@ant-design/icons'

import DetallesPaciente from '../pacientes/detalles.paciente'
import DetalleHistoria from './historia';
import NotaFisio from './nota';
import Exoneracion from './exoneracion';
import ExpedienteDocument from './expedienteDocument';

export default function ExpedienteFisio({ paciente, setIsEditModalOpen }) {

    const { _id: id_paciente } = paciente;

    const [isExoModalOpen, setIsExoModalOpen] = useState(false);
    const [isExpedientModalOpen, setIsExpedientModalOpen] = useState(false);

    return paciente ? (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>

                <DetallesPaciente paciente={paciente} setIsEditModalOpen={setIsEditModalOpen} />

                <DetalleHistoria paciente={paciente} />

            </div>

            <NotaFisio id_paciente={id_paciente} pacienteData={paciente} />

            <Button icon={<CloudDownloadOutlined />} onClick={() => setIsExoModalOpen(true)} style={{ alignSelf: 'flex-end', marginTop: 6 }}>Carta de exoneración</Button>
            <Button icon={<BookOutlined />} onClick={() => setIsExpedientModalOpen(true)} style={{ alignSelf: 'flex-end', marginTop: 6,marginLeft: 6 }}>Expediente</Button>

            <Exoneracion namePaciente={paciente.name} isModalOpen={isExoModalOpen} setIsModalOpen={setIsExoModalOpen} />

            <ExpedienteDocument namePaciente={paciente.name} id_paciente={paciente._id} isModalOpen={isExpedientModalOpen} setIsModalOpen={setIsExpedientModalOpen} />

        </div>
    )
        :
        <div>Sin Paciente</div>
}
