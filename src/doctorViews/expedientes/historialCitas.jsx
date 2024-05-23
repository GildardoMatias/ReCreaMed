import React, { useState } from 'react'
import { Button, Modal, Table } from 'antd';
import { dateOptions } from '../../resources';

export default function HistorialCitas({ historial }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
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
        {
            title: 'Medico',
            dataIndex: 'medico',
            key: 'medico',
            render: (_, { medico }) => <div>{medico.name}</div>
        },
    ];

    return (
        <div>

            <Button size='small' type="link" onClick={showModal}>
                Ver historial completo
            </Button>

            <Modal title="Historial de citas" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                {/* {JSON.stringify(historial)} */}

                <Table dataSource={historial} columns={columns} />;

            </Modal>

        </div>
    )
}
