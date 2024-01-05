import React from 'react'
import DetallesPaciente from '../pacientes/detalles.paciente'
import DetalleHistoria from './historia';
import NotaFisio from './nota';

export default function ExpedienteFisio({ paciente, setIsEditModalOpen }) {

    const { _id: id_paciente } = paciente;

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>

                <DetallesPaciente paciente={paciente} setIsEditModalOpen={setIsEditModalOpen} />

                <DetalleHistoria historiaTomadaDeLosDatos={{motivo: 'Motivo de visita', referido: 'referido por otro medico'}}/>

            </div>

            <NotaFisio /> 

        </div>
    )
}
