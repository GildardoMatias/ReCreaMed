import React, { useState } from 'react'
import { Table, Tag, Space, Button, Modal } from 'antd';


export default function Recetas() {

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
            title: 'ID Receta',
            dataIndex: 'key',
            key: '_id',
            render: text => <a>{text}</a>,
        },
        {
            title: 'ID Nota',
            dataIndex: 'id_nota',
            key: 'id_nota',
        },
        {
            title: 'Prescripcion',
            dataIndex: 'prescripcion',
            key: 'prescripcion',
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
            key: "62570ab89a6437369f835be7",
            id_nota: "62570a9a9a6437369f835be5",
            prescripcion: "Paracetamol cada 8 horas",
            createdAt: "2022-04-13T17:39:04.541Z",
            updatedAt: "2022-04-13T17:39:04.541Z",
            __v: 0
        },
        {
            key: "62570ab89a6437369f835be8",
            id_nota: "62570a9a9a6437369f835be5",
            prescripcion: "Paracetamol cada 8 horas",
            createdAt: "2022-04-13T17:39:04.541Z",
            updatedAt: "2022-04-13T17:39:04.541Z",
            __v: 0
        }
    ];
    return (
        <div className='mainContainer'>
            <h4>Recetas</h4>
            
            <Table columns={columns} dataSource={data} />

            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

                <p> _id": "62570ab89a6437369f835be7",</p>
                <p> id_nota": "62570a9a9a6437369f835be5",</p>
                <p> prescripcion": "Paracetamol cada 8 horas",</p>
                <p> createdAt": "2022-04-13T17:39:04.541Z",</p>
                <p> updatedAt": "2022-04-13T17:39:04.541Z",</p>
                <p> __v": 0</p>

            </Modal>
        </div>
    )
}
