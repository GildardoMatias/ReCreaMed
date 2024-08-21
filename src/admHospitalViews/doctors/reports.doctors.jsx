import React, { useEffect, useState } from 'react'
import { Modal, Table } from 'antd';
import Loading from '../../loading';
import { dateOptions, sendData, sendDataBody } from '../../resources';

export default function ReportsDoctors({ id_medico, isModalOpen, handleOk }) {

    const [loading, setLoading] = useState(true)
    const [citasData, setCitasData] = useState(null)
    // const [weekCitas, setWeekCitas] = useState([])

    useEffect(() => { getCitasData() }, [isModalOpen])

    // function getCurrentWeek() {
    //     const now = new Date();
    //     const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)

    //     // Adjust to get Monday (0 if today is Monday, -6 if today is Sunday)
    //     const diffToMonday = (dayOfWeek + 6) % 7;

    //     const monday = new Date(now);
    //     monday.setDate(now.getDate() - diffToMonday);
    //     monday.setHours(0, 0, 0, 0); // Set to start of the day

    //     const sunday = new Date(monday);
    //     sunday.setDate(monday.getDate() + 6);
    //     sunday.setHours(23, 59, 59, 999); // Set to end of the day

    //     return { start_date: monday, end_date: sunday };
    // }


    const getCitasData = () => {
        setLoading(true)
        if (id_medico) {
            sendData(`citas/medico/dates/${id_medico}`).then(rs => {
                setCitasData(rs)
                setLoading(false)
            })
        }
    }

    // const getWeekCitas = () => {
    //     const body = getCurrentWeek();
    //     console.log('Semana: ',body)
    //     if (id_medico) {
    //         sendDataBody(`citas/medico/dates/${id_medico}`, body).then(rs => {
    //             setWeekCitas(rs)
    //         })
    //     }
    // }

    const columns = [
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

    return (
        <Modal title="Reporte de citas " open={isModalOpen} onOk={handleOk} onCancel={handleOk} width={800} destroyOnClose>
            {
                loading ? <Loading /> :
                    <div>



                        {/* <p>Id medico {id_medico}</p> */}
                        {/* { // GO TO BACKEND AND MAKE A QUERY TO FILTER CITAS BY DATE
                            JSON.stringify(citasData)
                        } */}

                       
                        <h4>Citas este mes</h4>
                        <Table dataSource={citasData} columns={columns} />



                    </div>
            }
        </Modal>
    )
}