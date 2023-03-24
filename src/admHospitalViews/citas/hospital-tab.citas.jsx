import React, { useState, useEffect } from 'react';
import { Modal, Button, Popconfirm, message } from "antd";
import { getData, updateData, deleteData } from '../../resources';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import CreateCita, { CreateCitaForm } from './create-cita-for-medic';
require('moment/locale/es.js');

const localizer = momentLocalizer(moment)

export default function HospitalTab(props) {
    const [editingCita, setEditingCita] = useState(false)
    const [citaForEdit, setCitaForEdit] = useState({})
    const [citasData, setCitasData] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) }
    const handleOk = () => { setIsModalOpen(false); setEditingCita(false) }
    const handleCancel = () => { setIsModalOpen(false); setEditingCita(false) }

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
                cita.title = cita.usuario.name;
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
        e.doctor = e.medico; // For details
        e.paciente = e.usuario; // For details
        e.medico = e.medico._id;  // For edit
        e.usuario = e.usuario._id;  // For edit
        e.fecha_hora = moment(e.fecha_hora) //For edit
        setCitaForEdit(e)
        if (citaForEdit) showModal()
    }
    // Confirm servicio
    const confirmService = () => {
        console.log('To confirm service', citaForEdit)
        updateData(`balances/update/cita/${citaForEdit._id}`, { estado: 'pagado' })
    }

    const handleSlotSelection = ({ start, end, action }) => {
        console.log('Create cita on ', new Date(start).toISOString())
        console.log('Action ', action)
        setFecha_hora(new Date(start).toISOString())
        setIsCreateModalOpen(true)
        return { style: { backgroundColor: 'red' } };
    };
    // Delete button
    const confirm = (e) => {
        console.log(e);
        console.log('To delete: ', citaForEdit._id)
        deleteData(`citas/remove/${citaForEdit._id}`).then((rs) => { console.log(rs); getCitasData(); handleCancel() })

    };

    const cancel = (e) => {
        console.log(e);
    };

    return loading ? <p>Cargando...</p> : <div>
        <br />
        <h6>Citas del hospital {props.hospital}</h6>
        <br />
        <Calendar
            scrollToTime={new Date(Date.now())}
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


        <Modal title="Detalles Cita" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose
            footer={[
                <Popconfirm
                    title="Eliminar Cita"
                    description="Seguro que quiere eliminar la cita?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Si"
                    cancelText="No"
                >
                    <Button danger>Eliminar</Button>
                </Popconfirm>,
                <Button onClick={() => setEditingCita(!editingCita)}>{editingCita ? "Cancelar" : "Modificar"}</Button>,
                <Button onClick={handleCancel}>Cerrar</Button>
            ]}>


            {editingCita ?
                <CreateCitaForm cita={citaForEdit} setIsModalOpen={setIsModalOpen} getCitasData={getCitasData} setEditingCita={setEditingCita} />
                : <div>{citaForEdit && <div>
                    <p><strong>Medico </strong>{citaForEdit.doctor ? citaForEdit.doctor.name : 'Sin medico'}</p>
                    <p><strong>Paciente </strong>{citaForEdit.paciente ? citaForEdit.paciente.name : 'Sin paciente'}</p>
                    <p><strong>Fecha </strong>{new Date(citaForEdit.fecha_hora).toLocaleDateString()}</p>
                    <p><strong>Hora </strong>{new Date(citaForEdit.fecha_hora).toLocaleTimeString()}</p>
                    <p><strong>Servicio </strong>{citaForEdit.servicio}</p>
                    <p><strong>Comentarios </strong>{citaForEdit.comentarios}</p>
                    <Button type='primary' onClick={confirmService}>Confirmar Servicio</Button>,
                </div>
                }
                </div>
            }
        </Modal>

        <CreateCita setIsModalOpen={setIsCreateModalOpen} isOpenModal={isCreateModalOpen} hospital={props.id_hospital} fecha_hora={fecha_hora} getCitasData={getCitasData} />
    </div>
}