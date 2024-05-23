import React, { useEffect, useState } from 'react'
import { Modal, Table } from 'antd';
import Loading from '../../loading';
import { dateOptions, sendData } from '../../resources';

export default function ReportsDoctors({ id_medico, isModalOpen, handleOk }) {

    const [loading, setLoading] = useState(true)
    const [citasData, setCitasData] = useState(null)

    useEffect(() => { getCitasData() }, [isModalOpen])




    const getCitasData = () => {
        setLoading(true)
        if (id_medico) {
            sendData(`citas/medico/dates/${id_medico}`).then(rs => {
                setCitasData(rs)
                setLoading(false)
            })
        }
    }

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
        <Modal title="Reporte mensual de citas " open={isModalOpen} onOk={handleOk} onCancel={handleOk} width={800} destroyOnClose>
            {
                loading ? <Loading /> :
                    <div>



                        {/* <p>Id medico {id_medico}</p> */}
                        {/* { // GO TO BACKEND AND MAKE A QUERY TO FILTER CITAS BY DATE
                            JSON.stringify(citasData)
                        } */}

                        <Table dataSource={citasData} columns={columns} />


                    </div>
            }
        </Modal>
    )
}