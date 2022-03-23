import React, { useState } from 'react'
import { Table, Tag, Space, Button, Modal } from 'antd';

export function Citas() {
     const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const columns = [
        {
            title: 'Fecha y Hora',
            dataIndex: 'fecha',
            key: 'fecha',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Paciente',
            dataIndex: 'paciente',
            key: 'paciente',
        },
        {
            title: 'Sucursal',
            dataIndex: 'sucursal',
            key: 'sucursal',
        },
        {
            title: 'Comentarios',
            dataIndex: 'comentarios',
            key: 'comentarios',
        },
        {
            title: 'Detalles',
            key: 'detalles',
            render: (text, record) => (
                <Space size="middle">
                    {/* <a href>Enlace</a> */}
                    <Button>Enlace</Button>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            fecha: '10/1/2022',
            paciente: "Jhon Doe",
            sucursal: 'Loma Alta #112',
            comentarios: 'Medicamento necesario: Paraceamol, Ibuprofeno'        },
        {
            key: '2',
            fecha: '08/01/2022',
            paciente: "Jane Doe",
            sucursal: 'Torreon #23',
            comentarios: 'El paciente debe reposar'        },
        {
            key: '3',
            fecha: '14/12/2021',
            paciente: "Bob Stanley",
            sucursal: 'Avenida Madero',
            comentarios: 'Medicamento necesario: Paraceamol, Ibuprofeno'        },
    ];
    return (
        <div className='mainContainer'>
        <h4>Citas de los pacientes</h4>
        <h4>ID Medico: 0012M</h4>
        <Table columns={columns} dataSource={data} />

        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

            <p>paciente:	</p>
            <p>edad:</p>
            <p>talla:</p>
            <p>peso:</p>
            <p>imc:</p>
            <p>temperatura:</p>
            <p>presión arterial:</p>
            <p>frec cardiaca:</p>
            <p>frec respiratoria:</p>
            <p>Estudios:</p>
            <p>Observaciones:</p>
        </Modal>
    </div>
    )
}
