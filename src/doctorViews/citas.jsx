import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Modal, Form, Input, DatePicker, message } from 'antd';
import { Calendar, Badge, Switch } from 'antd';
import { getData } from '../resources';
import { API, usuario } from '../resources';
import { Select } from 'antd';
const { Option } = Select;
// import { API } from '../resources'

export function Citas() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [citasData, setCitasData] = useState([])
    const [citasLoading, setCitasLoading] = useState(true)
    const [cita, setCita] = useState({})
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [misPacientes, setMisPacientes] = useState([])
    const [isOnline, setIsOnline] = useState(false)

    useEffect(() => {
        console.log('Yo : ', usuario);
        getData(`mispacientes/${usuario._id}`).then(rs => { setMisPacientes(rs) })
        getCitasData()
    }, [])

    const getCitasData = () => {
        getData(`citas/medico/${usuario._id}`).then(rs => { setCitasData(rs); setCitasLoading(false) })
    }


    // Add Modal
    const showModal = () => { setIsModalVisible(true) };
    const handleOk = () => { setIsModalVisible(false); };
    const handleCancel = () => { setIsModalVisible(false); };
    // Details Modal
    const handleDetailOk = () => { setIsDetailVisible(false); };
    const handleDetailCancel = () => { setIsDetailVisible(false); };

    const onFinish = (values) => {
        values.medico = usuario._id;
        values.sucursal = usuario.horarios[0].id_sucursal;
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
        hoy = hoy.substring(0, 10)
        return (
            <ul className="events">
                {citasData.map((cita) => {

                    cita.fecha_hora = cita.fecha_hora.substring(0, 10);
                    return cita.fecha_hora === hoy ?
                        <li style={{ listStyleType: 'none' }} key={cita._id}>
                            <Badge status='success' text={cita.usuario.name} onClick={() => { setCita(cita); setIsDetailVisible(true); }} />
                        </li>
                        : <></>

                })
                }
            </ul >
        );
    };
    // Select 
    const handleChange = (value) => {
        // console.log(`selected ${value}`);
    };
    // Switch
    const onSwitch = (checked) => {
        console.log(`switch to ${checked}`);
        setIsOnline(checked)
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
                <Form name="expediente" labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off"
                    initialValues={{ id_reunion: 'https://recreamed.zoom.us/my/gildardo/' }}>

                    <Form.Item label="Paciente" name="usuario" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                        <Select
                            onChange={handleChange}
                        >
                            {
                                misPacientes.map((p) => {
                                    return <Option value={p._id}>{p.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    {/* <Form.Item label="Sucursal" name="sucursal" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                        <Input />
                    </Form.Item> */}

                    <Switch defaultChecked={false} onChange={onSwitch} />

                    <Form.Item label="Fecha y Hora" name="fecha_hora" rules={[{ required: true, message: 'Selecciona Fecha y Hora' }]} >
                        <DatePicker showTime onChange={onChange} onOk={onOk} placeholder='Selecciona Fecha y Hora' />
                    </Form.Item>
                    {
                        isOnline ?
                            <>
                                <Form.Item label="Enlace a la reunion" name="id_reunion" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Contraseña" name="password_reunion" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                                    <Input placeholder='Opcional' />
                                </Form.Item>
                            </>
                            :
                            <></>

                    }
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

            <Modal title="Detalles de la cita" visible={isDetailVisible} onOk={handleDetailOk} onCancel={handleDetailCancel}>
                {
                    cita ?
                        <>
                            <p>Paciente: {cita.usuario?.name}</p>
                            <p>fecha y hora: {cita.fecha_hora}</p>
                            <p>Sucursal: {cita.sucursal?.nombre}</p>
                            <p>Comentarios: {cita.comentarios}</p>
                            <p> <a href={cita.id_reunion} target='_blank' rel='noreferrer'>ir a la cita </a> </p>
                        </>
                        :
                        <p>Sin cita seleccionada</p>
                }
            </Modal>
        </div>
    )
}
