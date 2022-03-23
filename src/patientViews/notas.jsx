import React, { useState } from 'react'
import { Table, Tag, Space, Button, Modal } from 'antd';


export function Notas() {

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
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Medico',
            dataIndex: 'medico',
            key: 'medico',
        },
        {
            title: 'Estudios',
            dataIndex: 'estudios',
            key: 'estudios',
        },
        {
            title: 'Observaciones',
            key: 'Observaciones',
            dataIndex: 'observaciones',
            render: observaciones => (
                <>
                    {observaciones.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'diabetes') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Detalles',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={showModal}>Detalles</Button>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            fecha: '10/1/2022',
            medico: "Jhon Doe",
            estudios: 'Analisis de sangre',
            observaciones: ['ocio', 'colesterol'],
        },
        {
            key: '2',
            fecha: '08/01/2022',
            medico: "Jane Doe",
            estudios: 'Prueba de glucosa',
            observaciones: ['diabetes'],
        },
        {
            key: '3',
            fecha: '14/12/2021',
            medico: "Bob Stanley",
            estudios: 'Revision',
            observaciones: ['vacio'],
        },
    ];
    return (
        <div className='mainContainer'>
            <h4>Notas del paciente</h4>
            <h4>Paciente ID: 0012N</h4>
            <Table columns={columns} dataSource={data} />

            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
               
                <p>medico:	</p>
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
