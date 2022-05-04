import React, { useState } from 'react'
import { Table, Tag, Space, Button, Modal, Row, Col, Form, Input } from 'antd';

export default function MisCitas() {

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
            title: 'Medico',
            dataIndex: 'medico',
            key: 'medico',
        },
        {
            title: 'Sucursal',
            dataIndex: 'sucursal',
            key: 'sucursal',
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
            medico: "Jhon Doe",
            sucursal: 'Loma Alta #112',
            observaciones: ['ocio', 'colesterol'],
        },
        {
            key: '2',
            fecha: '08/01/2022',
            medico: "Jane Doe",
            sucursal: 'Torreon #23',
            observaciones: ['diabetes'],
        },
        {
            key: '3',
            fecha: '14/12/2021',
            medico: "Bob Stanley",
            sucursal: 'Avenida Madero',
            observaciones: ['vacio'],
        },
    ];

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className='mainContainer'>



            <Row>
                <Col span={8}><h4>Mis Citas </h4><h4>Paciente ID: 0012N</h4></Col>
                <Col>
                    <Button type="primary" onClick={showModal}>
                        Nueva Cita
                    </Button>
                </Col>
            </Row>

            <Table columns={columns} dataSource={data} />

            <Modal title="Registrar Cita" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
                    <Form.Item label="Fecha" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Comentarios" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item label="Talla" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Peso" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="IMC" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Temperatura" name="id_paciente" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                        <Input />
                    </Form.Item> */}

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Guardar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
