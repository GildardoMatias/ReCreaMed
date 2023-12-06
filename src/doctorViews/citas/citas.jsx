import { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import { getData, usuario, deleteData } from '../../resources';
import Loading from '../../loading'
import CreateCita, { CreateCitaForm } from './cita.create'
import { Button, Modal, Popconfirm } from 'antd'
import dayjs from 'dayjs';
import { GoogleOutlined } from '@ant-design/icons'
import AuthButton from './auth.button';
// import CitaGoogle from './cita.google';
// import '@dayjs/locale/es-mx';
// require('@dayjs/locale/es-mx');

const localizer = dayjsLocalizer(dayjs)

const { configuracion: { tratamientos_ofrecidos } = {} } = usuario || {};

// const today = new Date();

// To set rage for calendar
// start time 8:00am
// const min = new Date(
//     today.getFullYear(),
//     today.getMonth(),
//     today.getDate(),
//     8
// )

// end time 5:00pm
// const max = new Date(
//     today.getFullYear(),
//     today.getMonth(),
//     today.getDate(),
//     21
// )


export default function Citas() {
    const [citasData, setCitasData] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingCita, setEditingCita] = useState(false)

    // Modal for details
    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = () => { setIsModalOpen(true) }
    const handleOk = () => { setIsModalOpen(false); setEditingCita(false); setEditingCita(false) }
    const handleCancel = () => { setIsModalOpen(false); setEditingCita(false); setEditingCita(false) }
    // Modal for edit and create
    const [citaForEdit, setCitaForEdit] = useState(null)
    const [fecha_hora, setFecha_hora] = useState(null)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    useEffect(() => { return getCitasData() }, [])

    const getCitasData = () => {
        if (usuario)

            getData(`citas/medico/${usuario._id}`).then((rs) => {
                rs.forEach(cita => {
                    const servicio = cita.id_servicio;
                    const servicioInfo = tratamientos_ofrecidos.find(servicioItem => servicioItem._id === servicio);
                    if (servicioInfo) {
                        cita.color = servicioInfo.color;
                    }

                    cita.start = new Date(Date.parse(cita.fecha_hora));
                    const endDate = new Date(cita.fecha_hora);
                    endDate.setTime(endDate.getTime() + 1 * (cita.duracion ?? 60) * 60 * 1000)
                    cita.end = new Date(Date.parse(endDate));
                    cita.title = cita.usuario.name;
                    cita.id = cita._id;
                    cita.key = cita._id;
                });
                console.log('getCitasData medico', rs)
                setCitasData(rs)
            }
            ).finally(() => setLoading(false))
    }

    // Select cita to show details and to confirm
    const selectEvent = async (e) => {
        if (!e.hospital) e.hospital = e.sucursal._id; // For Edit
        if (e.sucursa && e.sucursal._id) e.sucursal = e.sucursal._id; // For Edit
        if (!e.paciente) e.paciente = e.usuario; // For details
        if (e.usuario && e.usuario._id) e.usuario = e.usuario._id; // For Editing
        e.fecha_hora = dayjs(e.fecha_hora) //For edit
        setCitaForEdit(e)
        showModal()
    }

    // Select time hour, where cita will be created 
    const handleSlotSelection = ({ start, end, action }) => {
        setFecha_hora(dayjs(start))
        setIsCreateModalOpen(true)
        return { style: { backgroundColor: 'red' } };
    };

    // Confirm servicio
    // const confirmService = () => {
    //     console.log('To confirm service', citaForEdit)
    //     updateData(`balances/update/cita/${citaForEdit._id}`, { estado: 'pagado' })
    // }

    // Delete button
    const confirm = (e) => {
        deleteData(`citas/remove/${citaForEdit._id}`).then((rs) => { console.log(rs); getCitasData(); handleCancel() })
        deleteData(`balances/remove/cita/${citaForEdit._id}`)

    };

    const cancel = (e) => { console.log(e) }

    const eventStyleGetter = (event, start, end, isSelected) => {
        // const index = serviceList.indexOf(event.servicio);
        // var backgroundColor = '#' + pre_colors[index]; 
        // var backgroundColor = '##03fc8c';
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

    if (loading) return <Loading />;

    return <div className='mainContainer'>
        <br />
        {/* <CitaGoogle />
        <br /> */}

        <AuthButton />

        <Button icon={<GoogleOutlined />} >
            Sincronzar calendario
        </Button>

        <br />
        <br />

        <Calendar
            // min={min}
            // max={max}
            scrollToTime={new Date(Date.now())}
            defaultDate={new Date(Date.now())}
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
                day: "Día",
            }}
            defaultView="week"
            onDoubleClickEvent={(e) => console.log(e)}
            onSelectEvent={selectEvent} // details cita
            onSelecting={(e) => console.log(e)}
            onSelectSlot={handleSlotSelection} // create cita
        />
        <br />



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

        <CreateCita setIsModalOpen={setIsCreateModalOpen} isOpenModal={isCreateModalOpen} fecha_hora={fecha_hora} getCitasData={getCitasData} />

    </div>

}
