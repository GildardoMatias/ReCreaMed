import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { getData, usuario, updateData } from '../../resources';
import Loading from '../../loading'
import CreateCita from './cita.create'
import { Button, Modal } from 'antd'

const localizer = momentLocalizer(moment)

export default function Citas() {
    const [citasData, setCitasData] = useState([])
    const [loading, setLoading] = useState(true)

    // Modal for details
    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = () => { setIsModalOpen(true) }
    const handleOk = () => { setIsModalOpen(false) }
    const handleCancel = () => { setIsModalOpen(false) }
    // Modal for edit and create
    const [citaForEdit, setCitaForEdit] = useState(null)
    const [fecha_hora, setFecha_hora] = useState(null)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)


    useEffect(() => { return getCitasData() }, [])

    const getCitasData = () => {
        getData(`citas/medico/${usuario._id}`).then((rs) => {
            rs.forEach(cita => {
                cita.start = new Date(Date.parse(cita.fecha_hora));
                const endDate = new Date(cita.fecha_hora);
                endDate.setTime(endDate.getTime() + 1 * 60 * 60 * 1000)
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
        await setCitaForEdit(e)
        showModal()
    }

    // Select time hour, where cita will be created 
    const handleSlotSelection = ({ start, end, action }) => {
        console.log('Create cita on ', new Date(start).toISOString())
        console.log('Action ', action)
        setFecha_hora(new Date(start).toISOString())
        setIsCreateModalOpen(true)
        return { style: { backgroundColor: 'red' } };
    };

    // Confirm servicio
    const confirmService = () => {
        console.log('To confirm service', citaForEdit)
        updateData(`balances/update/cita/${citaForEdit._id}`, { estado: 'pagado' })
    }

    if (loading) return <Loading />;

    return <div className='mainContainer'>
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
            onSelectEvent={selectEvent} // details cita
            onSelecting={(e) => console.log(e)}
            onSelectSlot={handleSlotSelection} // create cita
        />


        <Modal title="Detalles Cita" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose footer={[<Button onClick={handleCancel}>Cerrar</Button>]}>
            {
                citaForEdit && <div>
                    <p><strong>Paciente </strong>{citaForEdit.usuario ? citaForEdit.usuario.name : 'Sin paciente'}</p>
                    <p><strong>Fecha </strong>{new Date(citaForEdit.fecha_hora).toLocaleDateString()}</p>
                    <p><strong>Hora </strong>{new Date(citaForEdit.fecha_hora).toLocaleTimeString()}</p>
                    <p><strong>Comentarios </strong>{citaForEdit.comentarios}</p>
                    <Button type='primary' onClick={confirmService}>Confirmar Servicio</Button>
                </div>
            }
        </Modal>

        <CreateCita setIsModalOpen={setIsCreateModalOpen} isOpenModal={isCreateModalOpen} fecha_hora={fecha_hora} getCitasData={getCitasData} />

    </div>

}
