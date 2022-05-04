import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Button, Modal, Form, Input, message } from 'antd';
import { API } from '../resources';
import Loading from '../loading';


export default function Expedientes() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setILoading] = useState(true);
    const [expedientesData, setExpedientesData] = useState([]);

    useEffect(() => {
        getExpedientesData()
    }, [])

    const getExpedientesData = () => {
        fetch(API + 'expedientes')
            .then(response => response.json())
            .then(data => {
                console.log(data); setExpedientesData(data);
            })
            .finally(() => setILoading(false))
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const columns = [
        {
            title: 'Paciente',
            dataIndex: 'id_usuario',
            key: 'Paciente',
        },
        {
            title: 'Historia Clinica',
            dataIndex: 'id_historia',
            key: 'historiaClinica',
            render: text => <a href='/historial_clinico'>{text}</a>,
        },
        {
            title: 'Notas Medicas',
            dataIndex: 'id_nota',
            key: 'notasMedicas',
            render: text => <a href='/notas'>{text}</a>,

        },
        {
            title: 'Receta',
            dataIndex: 'id_receta',
            key: 'receta',
        }
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
            .finally(() => { getExpedientesData(); setIsModalVisible(false) })
        // getExpedientesData() 
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return <div className="mainContainer">
        <Row>
            <Col span={16}><h4>Expedientes</h4></Col>
            <Col>
                <Button type="primary" onClick={showModal}>
                    Nuevo expediente
                </Button>
            </Col>
        </Row>
        <br />

        {isLoading ? <Loading /> :
            <Table dataSource={expedientesData} columns={columns} />
        }
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
    </div>;
}
