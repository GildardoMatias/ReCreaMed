import React, { useState } from 'react'
import { Button } from 'antd'
import { CloudDownloadOutlined, AccountBookOutlined, BookOutlined } from '@ant-design/icons'

import DetallesPaciente from '../pacientes/detalles.paciente'
import DetalleHistoria from './historia';
import NotaFisio from './nota';
import Exoneracion from './exoneracion';
import ExpedienteDocument from './expedienteDocument';
import { usuario } from '../../resources';

export default function ExpedienteFisio({ paciente, setIsEditModalOpen }) {

    const { _id: id_paciente } = paciente;

    const [isExoModalOpen, setIsExoModalOpen] = useState(false);
    const [isExpedientModalOpen, setIsExpedientModalOpen] = useState(false);

    const mobile = window.matchMedia("(max-width: 500px)").matches;

    return paciente ? (
        <div>
            <div style={mobile ? { display: 'flex', flexDirection: 'column' } : { display: 'flex', flexDirection: 'row', gap: 15 }}>

                <DetallesPaciente paciente={paciente} setIsEditModalOpen={setIsEditModalOpen} />

                <DetalleHistoria paciente={paciente} />

            </div>

            <NotaFisio id_paciente={id_paciente} pacienteData={paciente} />

            <Button icon={<CloudDownloadOutlined />} onClick={() => setIsExoModalOpen(true)} style={{ alignSelf: 'flex-end', marginTop: 6 }}>Carta de exoneración</Button>
            <Button icon={<BookOutlined />} onClick={() => setIsExpedientModalOpen(true)} style={ { alignSelf: 'flex-end', marginTop: 6, marginLeft: 6 }}>Expediente</Button>

            <Exoneracion namePaciente={paciente.name} idHospital={usuario.horarios[0].sucursal._id} isModalOpen={isExoModalOpen} setIsModalOpen={setIsExoModalOpen} />

            <ExpedienteDocument pacienteData={paciente} id_paciente={paciente._id} idHospital={usuario.horarios[0].sucursal._id} isModalOpen={isExpedientModalOpen} setIsModalOpen={setIsExpedientModalOpen} />

        </div>
    )
        :
        <div>Sin Paciente</div>
}
