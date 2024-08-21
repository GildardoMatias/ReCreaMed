import React, { useState } from 'react'
import { Table,  Button, Modal } from 'antd'
import { dateOptions, sendDataBody } from '../../resources';
import Loading from '../../loading';

export default function WeekCitas({ medicos }) {

    const [loading, setLoading] = useState(true) // Used for details modal of each medic

    const columns = [
        // {
        //     title: 'Avatar',
        //     dataIndex: 'avatar',
        //     key: 'avatar',
        //     render: (_, { avatar }) => {
        //         return avatar.length > 9 ?
        //             <img width={64} src={'https://api.recreamed.com/images/' + avatar} alt='ProfilePic' style={{ borderRadius: 6 }} /> :
        //             <Avatar size={64} icon={<UserOutlined />} className='btnIconCentered' />
        //     }
        // },
        {
            title: 'Médico',
            dataIndex: 'name',
            key: 'name',
        },
        // {
        //     title: 'Correo',
        //     dataIndex: 'email',
        //     key: 'email',
        // },
        // {
        //     title: 'Telefono',
        //     dataIndex: 'telefono',
        //     key: 'telefono',
        // },
        {
            title: 'Reporte de citas',
            dataIndex: 'reporte',
            key: 'reporte',
            render: (_, { _id }) => {
                return <div>
                    <Button  onClick={() => { openModal(_id); }}>
                        Ver reporte
                    </Button>
                </div>
            }
        },

    ];


    // Modal Data and functions
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [citasData, setcitasData] = useState([])
    const [patientCounter, setPatientCounter] = useState(0)
    const modalColumns = [
        {
            title: 'Paciente',
            dataIndex: 'usuario',
            key: 'usuario',
            render: (_, { usuario }) => <div>{usuario.name}</div>
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha_hora',
            key: 'fecha',
            render: (_, { fecha_hora }) => <div>{new Date(fecha_hora).toLocaleDateString('es-MX', dateOptions)}</div>
        },
        {
            title: 'Hora',
            dataIndex: 'fecha_hora',
            key: 'hora',
            render: (_, { fecha_hora }) => <div>{new Date(fecha_hora).toLocaleTimeString('es-MX')}</div>
        },
        {
            title: 'Servicio',
            dataIndex: 'servicio',
            key: 'age',
        },

    ];

    function getCurrentWeek() {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)

        // Adjust to get Monday (0 if today is Monday, -6 if today is Sunday)
        const diffToMonday = (dayOfWeek + 6) % 7;

        const monday = new Date(now);
        monday.setDate(now.getDate() - diffToMonday);
        monday.setHours(0, 0, 0, 0); // Set to start of the day

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        sunday.setHours(23, 59, 59, 999); // Set to end of the day

        return { start_date: monday, end_date: sunday };
    }

    const openModal = (id) => {
        setPatientCounter(0)
        setLoading(true)
        setIsModalOpen(true)
        const usersArray = [];
        const dates = getCurrentWeek()
        sendDataBody(`citas/medico/dates/${id}`, dates).then(rs => {
            setcitasData(rs)
            rs.forEach(cita => {
                if (!usersArray.includes(cita.usuario._id)) {
                    usersArray.push(cita.usuario._id)
                }
            });
            setPatientCounter(usersArray.length)
        }).finally(() => setLoading(false))

    }

    return (
        <div>

            <h4>Pacientes atendidos ésta semana</h4>

            <Table dataSource={medicos} columns={columns} size='small' />

            <Modal open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)} width={800} destroyOnClose>
                {
                    loading ? <Loading /> :
                        <div>
                            {/* {
                                JSON.stringify(citasData)
                            } */}
                            <h4>Pacientes atendidos ésta semana: {patientCounter}</h4>  <br />
                            <h5>Citas de ésta semana </h5>
                            <Table dataSource={citasData} columns={modalColumns} />

                        </div>
                }
            </Modal>
        </div>
    )
}