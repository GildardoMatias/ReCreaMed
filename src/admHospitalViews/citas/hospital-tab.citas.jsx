import React, { useState, useEffect } from 'react';
import { Modal, Button } from "antd";
import { getData, updateData } from '../../resources';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import CreateCita from './create-cita-for-medic';
require('moment/locale/es.js');

const localizer = momentLocalizer(moment)

export default function HospitalTab(props) {
    const [citaForEdit, setCitaForEdit] = useState({})
    const [citasData, setCitasData] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) }
    const handleOk = () => { setIsModalOpen(false) }
    const handleCancel = () => { setIsModalOpen(false) }

    // Tools for createCita Modal
    const [fecha_hora, setFecha_hora] = useState('')
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    useEffect(() => { getCitasData() }, [])

    const getCitasData = () => {
        getData(`citas/sucursal/${props.id_hospital}`).then((rs) => {
            rs.forEach(cita => {
                cita.start = new Date(Date.parse(cita.fecha_hora));
                const endDate = new Date(cita.fecha_hora);
                endDate.setTime(endDate.getTime() + 1 * 60 * 60 * 1000)
                cita.end = new Date(Date.parse(endDate));
                cita.title = cita.comentarios;
                cita.id = cita._id;
                cita.key = cita._id;
            });
            console.log('getCitasData hospital tab admin', rs)
            setCitasData(rs)
        }
        ).finally(() => setLoading(false))
    }

    // Select cita to show details and show confirm button
    const selectEvent = (e) => {
        console.log('For eedit', e)
        setCitaForEdit(e)
        if (citaForEdit) showModal()
    }
    // Confirm servicio
    const confirmService = () => {

    }

    const handleSlotSelection = ({ start, end, action }) => {
        console.log('Create cita on ', new Date(start).toISOString())
        console.log('Action ', action)
        setFecha_hora(new Date(start).toISOString())
        setIsCreateModalOpen(true)
        return { style: { backgroundColor: 'red' } };
    };

    return loading ? <p>Cargando...</p> : <div>
        <br />
        <h6>Citas del hospital {props.hospital}</h6>
        <br />
        <Calendar
            selectable='true'
            localizer={localizer}
            events={citasData}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            messages={{
                next: "Sig",
                previous: "Ant",
                today: "Hoy",
                month: "Mes",
                week: "Semana",
                day: "Día"
            }}
            defaultView="week"
            onDoubleClickEvent={(e) => console.log(e)}
            onSelectEvent={selectEvent}
            onSelecting={(e) => console.log(e)}
            // onSelectSlot={handleSlotSelection}
            onSelectSlot={handleSlotSelection}
        />


        <Modal title="Detalles Cita" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose footer={[<Button onClick={handleCancel}>Cerrar</Button>]}>
            {
                citaForEdit && <div>
                    <p><strong>Medico </strong>{citaForEdit.medico ? citaForEdit.medico.name : 'Sin medico'}</p>
                    <p><strong>Paciente </strong>{citaForEdit.usuario ? citaForEdit.usuario.name : 'Sin paciente'}</p>
                    <p><strong>Fecha </strong>{citaForEdit.fecha_hora}</p>
                    <p><strong>Comentarios </strong>{citaForEdit.comentarios}</p>
                    <Button type='primary' onClick={confirmService}>Confirmar Servicio</Button>
                </div>
            }
        </Modal>

        <CreateCita setIsModalOpen={setIsCreateModalOpen} isOpenModal={isCreateModalOpen} hospital={props.id_hospital} fecha_hora={fecha_hora} getCitasData={getCitasData} />
    </div>
}