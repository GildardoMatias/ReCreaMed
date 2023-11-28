import React, { useState, useEffect } from 'react';
import { Modal, Button, Popconfirm, message } from "antd";
import { getData, deleteData, pre_colors, sendDataBody } from '../../resources';
import Loading from '../../loading';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import CreateCita, { CreateCitaForm } from './create-cita-for-medic';
import dayjs from 'dayjs';

const localizer = dayjsLocalizer(dayjs)
// admin and receipt shares citas and create citas
// RECEIPT CANT DELETE, SO, FIRST EDIT RECEIPT
export default function HospitalTab(props) {
    const [citaForEdit, setCitaForEdit] = useState({})
    const [citasData, setCitasData] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) }
    const handleOk = () => { setIsModalOpen(false); setEditingCita(false) }
    const handleCancel = () => { setIsModalOpen(false); setEditingCita(false) }
    const [editingCita, setEditingCita] = useState(false)
    const [serviceList, setserviceList] = useState([])

    // Tools for createCita Modal
    const [fecha_hora, setFecha_hora] = useState('')
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    // for pass to create cita model
    const [pacientesData, setPacientesData] = useState([])



    // First of all, get pacientes data for pass to the create cita component
    const getPacientes = async () => { // Willl be the next working

        let allServices = []

        const meds = await getData(`users/hospital/${props.id_hospital}`)

        const idmeds = meds.map(doc => {
            allServices = allServices.concat(doc.configuracion.tratamientos_ofrecidos) // Extract tratamientos ofrecdos to create an unique list
            return doc._id
        })
        setserviceList(allServices) // Set unique list

        await sendDataBody('pacientes/medicos', { medicos: idmeds }).then((rs) => {

            rs.forEach(paciente => {
                paciente.label = paciente.name; paciente.value = paciente._id;
            });

            setPacientesData(rs)
        }).finally(() => {
            const fechaActual = new Date();

            // Calcular la fecha de hace una semana
            const fechaHaceUnaSemana = new Date();
            fechaHaceUnaSemana.setDate(fechaActual.getDate() - 7);

            // Calcular la fecha dentro de una semana
            const fechaDentroDeUnaSemana = new Date();
            fechaDentroDeUnaSemana.setDate(fechaActual.getDate() + 7);
            getCitasData(fechaHaceUnaSemana, fechaDentroDeUnaSemana)
        })
    }

    useEffect(() => { getPacientes() }, [])


    const getCitasData = async (_start_date, _end_date) => {
        const body = { start_date: _start_date, end_date: _end_date }
        await sendDataBody(`citas/sucursal/${props.id_hospital}`, body).then((rs) => {
            // console.log('resp ', rs)
            rs.forEach((cita) => {
                const servicio = cita.id_servicio; // Colorze cita
                const servicioInfo = serviceList.find(servicioItem => servicioItem._id === servicio);
                if (servicioInfo) {
                    cita.color = servicioInfo.color;
                }

                cita.start = new Date(Date.parse(cita.fecha_hora));
                const endDate = new Date(Date.parse(cita.fecha_hora));
                endDate.setTime(endDate.getTime() + 1 * (cita.duracion ?? 60) * 60 * 1000)
                cita.end = new Date(Date.parse(endDate));
                cita.title = cita.usuario?.name;
                cita.key = cita._id;
            });
            setCitasData(rs)
            console.log('Citas data at end ', citasData)
            setLoading(false)
        })
    }


    // Select cita to show details and show confirm button
    const selectEvent = (e) => {
        console.log('For eedit', e)
        if (!e.doctor) e.doctor = e.medico; // For details
        if (!e.paciente) e.paciente = e.usuario; // For details
        if (e.medico && e.medico._id) e.medico = e.medico._id;  // For edit
        if (e.usuario && e.usuario._id) e.usuario = e.usuario._id;  // For edit
        e.fecha_hora = dayjs(e.fecha_hora) //For edit
        setCitaForEdit(e)
        if (citaForEdit) showModal()
    }


    const handleSlotSelection = ({ start, end, action }) => {
        setFecha_hora(dayjs(start))
        setIsCreateModalOpen(true)
        return { style: { backgroundColor: 'red' } };
    };
    // Delete button
    const confirm = (e) => {
        deleteData(`citas/remove/${citaForEdit._id}`).then((rs) => { console.log(rs); getCitasData(); handleCancel() })
        deleteData(`balances/remove/cita/${citaForEdit._id}`)

    };

    const cancel = (e) => { console.log(e) }

    const eventStyleGetter = (event, start, end, isSelected) => {

        var style = {
            backgroundColor: event.color,
            borderRadius: '4px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    }

    return loading ? <Loading /> : <div>
        <br />
        <h6>Citas del hospital {props.hospital}</h6>
        <br />
        {/* <p>{JSON.stringify(serviceList)}</p> */}
        {/* <p>{JSON.stringify(citasData)}</p> */}
        <br />
        <Calendar
            scrollToTime={new Date(Date.now())}
            selectable='true'
            localizer={localizer}
            events={citasData}
            eventPropGetter={eventStyleGetter}
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
            onRangeChange={(range) => {

                console.log('Start ', range)
                console.log('End ', range.end)

            }}
        />


        <Modal title="Detalles Cita" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose width={900}
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
                <CreateCitaForm cita={citaForEdit} setIsModalOpen={setIsModalOpen} getCitasData={getCitasData} setEditingCita={setEditingCita} hospital={props.id_hospital} pacientesData={pacientesData} />
                : <div>{citaForEdit && <div>
                    <p><strong>Medico </strong>{citaForEdit.doctor ? citaForEdit.doctor.name : 'Sin medico'}</p>
                    <p><strong>Paciente </strong>{citaForEdit.paciente ? citaForEdit.paciente.name : 'Sin paciente'}</p>
                    <p><strong>Fecha </strong>{new Date(citaForEdit.fecha_hora).toLocaleDateString()}</p>
                    <p><strong>Hora </strong>{new Date(citaForEdit.fecha_hora).toLocaleTimeString()}</p>
                    <p><strong>Servicio </strong>{citaForEdit.servicio}</p>
                    <p><strong>Comentarios </strong>{citaForEdit.comentarios}</p>
                    {/* <p><strong>Servicio ID </strong>{citaForEdit.id_servicio}</p> */}
                    <p><strong>Color </strong> <div style={{ width: 18, height: 8, backgroundColor: citaForEdit.color }}></div> </p>
                    {/* <Button type='primary' onClick={confirmService}>Confirmar Servicio</Button>, */}
                </div>
                }
                </div>
            }
        </Modal>

        <CreateCita setIsModalOpen={setIsCreateModalOpen} isOpenModal={isCreateModalOpen} hospital={props.id_hospital} fecha_hora={fecha_hora} getCitasData={getCitasData} pacientesData={pacientesData} />
    </div>
}