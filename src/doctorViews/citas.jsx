import React, { useState, useEffect } from 'react'
import { Table, Space, Row, Col, Button, Modal, Form, Input, message, DatePicker } from 'antd';
import { Calendar, Badge } from 'antd';
import { API } from '../resources';
import { usuario } from '../resources';
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
        fetch(API + `citas/medico/${usuario._id}`)
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
        values.id_medico = usuario._id;
        console.log('Valores:', values);
        fetch(API + 'citas/add', {
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

    // DatePicker
    function onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
    function onOk(value) {
        console.log('onOk: ', value);
    }

    //Calendar Functions
    const getMonthData = (value) => {
        if (value.month() === 8) {
            return 1394;
        }
    };
    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value) => {
        // const hoy = value.format('L');
        let hoy = value.format();
        hoy = hoy.substring(0,10)
        return (
            <ul className="events">
                {citasData.map((cita) => {
                    cita.fecha_hora = cita.fecha_hora.substring(0,10);
                    return <div>
                        {
                            cita.fecha_hora === hoy ?
                                <li key={cita._id}>
                                    <Badge status='success' text={cita.id_usuario} />
                                </li>
                                : <></>
                        }
                    </div>
                })
                }
            </ul >
        );
    };

    return (
        <div className='mainContainer'>
            <Row>
                <Col span={8}><h4>CALENDARIO DE CITAS</h4></Col>
                <Col>
                    <Button type="primary" onClick={showModal}>
                        Nueva Cita
                    </Button>
                </Col>
            </Row>

            {/* {isLoading ? <Loading /> : <Table columns={columns} dataSource={citasData} />} */}

            <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />



            <Modal title="Nuevo expediente" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form name="expediente" labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >

                    <Form.Item label="Paciente" name="id_usuario" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Sucursal" name="id_sucursal" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Fecha y Hora" name="fecha_hora" rules={[{ required: true, message: 'Selecciona Fecha y Hora' }]} >
                        <DatePicker showTime onChange={onChange} onOk={onOk} placeholder='Selecciona Fecha y Hora' />
                    </Form.Item>
                    <Form.Item label="Enlace a la reunion" name="id_reunion" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Contraseña" name="password_reunion" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                        <Input placeholder='Opcional' />
                    </Form.Item>
                    <Form.Item label="Comentarios" name="comentarios" rules={[{ required: true, message: 'Ingresa RFC' }]} >
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
