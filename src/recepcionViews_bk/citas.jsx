import React, { useState, useEffect } from 'react'
import { Table, Space, Row, Col, Button, Modal, Form, Input, message } from 'antd';
import { API } from '../resources';
import Loading from '../loading'
// import { API } from '../resources'

export function Citas() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [citasData, setCitasData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getCitasData()
    }, [])

    const getCitasData = () => {
        fetch(API + 'citas')
            .then(response => response.json())
            .then(data => {
                console.log(data); setCitasData(data);
            })
            .finally(() => setIsLoading(false))
    }

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
            dataIndex: 'fecha_hora',
            key: 'fecha_hora',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Paciente',
            dataIndex: 'id_usuario',
            key: 'id_usuario',
        },
        {
            title: 'Sucursal',
            dataIndex: 'id_sucursal',
            key: 'v',
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

    const onFinish = (values) => {
        console.log('Valores:', values);
        fetch(API + 'expedientes/add', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => { console.log('Success:', response); message.success(response.message || response.error); })
            .catch(error => console.error('Error:', error))
            .finally(() => { getCitasData(); setIsModalVisible(false) })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className='mainContainer'>
            <h4>Citas de los pacientes</h4>
            <h4>ID Medico: 0012M</h4>

            { isLoading ? <Loading/> :  <Table columns={columns} dataSource={citasData} /> }

           

            <Modal title="Nuevo expediente" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form name="expediente" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
                    <Form.Item label="Paciente" name="id_usuario" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Historia Clinica" name="id_historia" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Notas Medicas" name="id_nota" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Receta" name="id_receta" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" form='expediente'>
                            Guardar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
