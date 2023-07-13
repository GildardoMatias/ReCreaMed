import React, { useState, useEffect } from 'react';
import { Modal, Button, Popconfirm } from "antd";
import { deleteData, getData, sendDataBody, ids_hospitales } from '../../resources';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import CreateCita, { CreateCitaForm } from './create-cita-for-medic';
import dayjs from 'dayjs';

const localizer = dayjsLocalizer(dayjs)

export default function HospitalTab(props) {
    const [citaForEdit, setCitaForEdit] = useState({})
    const [citasData, setCitasData] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) }
    const handleOk = () => { setIsModalOpen(false); setEditingCita(false) }
    const handleCancel = () => { setIsModalOpen(false); setEditingCita(false) }
    const [editingCita, setEditingCita] = useState(false)

    // Tools for createCita Modal
    const [fecha_hora, setFecha_hora] = useState('')
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    // for pass to create cita model
    const [pacientesData, setPacientesData] = useState([])
    const [medicosData, setMedicosData] = useState([])

    const findPatientsOfMyMedicos = (pacientesData) => {
        let dl = [];
        // Check on each horario of each medico of medicos asignados of patient to see if share sucursal with my horarios as admin
        pacientesData.forEach(paciente => {
            paciente.medicos_asignados.forEach(med => {
                med.horarios.forEach(h => {
                    if (h.sucursal === props.id_hospital && !dl.includes(paciente)) { paciente.label = paciente.name; paciente.value = paciente._id; dl.push(paciente) }
                })
            });
        });
        return dl;
    }

    const getPacientesData = () => {
        // First of all, get pacientes data for pass to the create cita component
        getData('users_by_rol/Paciente').then((rs) => {
            setPacientesData(findPatientsOfMyMedicos(rs))
        })
    }

    useEffect(() => {  getPacientesData(); getCitasData() }, [])

    const getCitasData = () => {
        getData(`citas/sucursal/${props.id_hospital}`).then((rs) => {
            rs.forEach(cita => {
                cita.start = new Date(Date.parse(cita.fecha_hora));
                const endDate = new Date(Date.parse(cita.fecha_hora));
                endDate.setTime(endDate.getTime() + 1 * (cita.duracion ?? 60) * 60 * 1000)
                cita.end = new Date(Date.parse(endDate));
                cita.title = cita.usuario?.name;
                cita.key = cita._id;
            });
            setCitasData(rs)
        }).finally(() => setLoading(false))
    }

    // Select cita to show details and show confirm button
    const selectEvent = (e) => {
        if (!e.doctor) e.doctor = e.medico; // For details
        if (!e.paciente) e.paciente = e.usuario; // For details
        if (e.medico && e.medico._id) e.medico = e.medico._id;  // For edit
        if (e.usuario && e.usuario._id) e.usuario = e.usuario._id;  // For edit
        e.fecha_hora = dayjs(e.fecha_hora) //For edit
        console.log('Fecha al editar: ', e.fecha_hora)
        setCitaForEdit(e)
        if (citaForEdit) showModal()
    }

    const handleSlotSelection = ({ start, end, action }) => {
        // setFecha_hora(new Date(start).toISOString())
        setFecha_hora(dayjs(start))
        console.log('Fecha al crear: ', dayjs(start))
        setIsCreateModalOpen(true)
        return { style: { backgroundColor: 'red' } };
    };
    // Delete button
    const confirm = (e) => {
        deleteData(`citas/remove/${citaForEdit._id}`).then((rs) => { getCitasData(); handleCancel() })
        deleteData(`balances/remove/cita/${citaForEdit._id}`)
    };

    const cancel = (e) => { };

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
                // <Popconfirm
                //     title="Eliminar Cita"
                //     description="Seguro que quiere eliminar la cita?"
                //     onConfirm={confirm}
                //     onCancel={cancel}
                //     okText="Si"
                //     cancelText="No"
                // >
                //     <Button danger>Eliminar</Button>
                // </Popconfirm>
                //,

                <Button onClick={() => setEditingCita(!editingCita)}>{editingCita ? "Cancelar" : "Modificar"}</Button>,
                <Button onClick={handleCancel}>Cerrar</Button>
            ]}>

            {
                editingCita ?
                    <CreateCitaForm cita={citaForEdit} setIsModalOpen={setIsModalOpen} getCitasData={getCitasData} setEditingCita={setEditingCita} hospital={props.id_hospital} pacientesData={pacientesData} />
                    : <div>{citaForEdit && <div>
                        <p><strong>Medico </strong>{citaForEdit.doctor ? citaForEdit.doctor.name : 'Sin medico'}</p>
                        <p><strong>Paciente </strong>{citaForEdit.paciente ? citaForEdit.paciente.name : 'Sin paciente'}</p>
                        <p><strong>Fecha </strong>{new Date(citaForEdit.fecha_hora).toLocaleDateString()}</p>
                        <p><strong>Hora </strong>{new Date(citaForEdit.fecha_hora).toLocaleTimeString()}</p>
                        <p><strong>Servicio </strong>{citaForEdit.servicio}</p>
                        <p><strong>Comentarios </strong>{citaForEdit.comentarios}</p>
                        {/* <Button type='primary' onClick={confirmService}>Confirmar Servicio</Button>, */}
                    </div>
                    }
                    </div>
            }
        </Modal>

        <CreateCita setIsModalOpen={setIsCreateModalOpen} isOpenModal={isCreateModalOpen} hospital={props.id_hospital} fecha_hora={fecha_hora} getCitasData={getCitasData} pacientesData={pacientesData} setEditingCita={setEditingCita}/>
    </div>
}