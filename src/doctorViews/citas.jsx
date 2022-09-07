import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Modal, Form, Input, DatePicker, message, Popconfirm } from 'antd';
import { Calendar, Badge, Switch } from 'antd';
import { deleteData, getData, sendDataBody } from '../resources';
import { usuario } from '../resources';
import { Select } from 'antd';
import { CitaGoogleP, CitaGoogle } from './cita_google'
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
    const [password, setPassword] = useState('');
    const [fecha_cita, setFecha_cita] = useState(null)

    useEffect(() => {
        console.log('Yo : ', usuario);
        getData(`mispacientes/${usuario._id}`).then(rs => { setMisPacientes(rs) })
        getCitasData()
    }, [])

    const getCitasData = () => {
        getData(`citas/medico/${usuario._id}`).then(rs => { console.log('GetCitas: ', rs); setCitasData(rs); setCitasLoading(false) })
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
        values.sucursal = usuario.horarios[0].sucursal;
        values.password_reunion = '';

        values.id_reunion = isOnline ? CitaGoogleP({ usuario: usuario.name, param2: 'param2' }) : '';
        console.log('Valores:', values);
        console.log('Cita Google: ')
        CitaGoogle({ fecha: fecha_cita })

        sendDataBody('citas/add', values).then((response) => {
            console.log('Success:', response); message.success(response.message || response.error);
            getCitasData(); setIsModalVisible(false)
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // DatePicker
    function onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        setFecha_cita(value)
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
    // Switch For online or Presencial
    const onSwitch = (checked) => {
        console.log(`switch to ${checked}`);
        setIsOnline(checked)
    };
    // Confirmar Borrar
    const confirm = (e) => { deleteData('citas/remove/' + cita._id).then((rs) => { setIsDetailVisible(false); getCitasData() }) }
    const cancel = (e) => { console.log(e); };
    // End of Confirmar Borrar

    return (
        <div className='mainContainer'>
            <Row>
                <h4 style={{ marginRight: 20 }}>CALENDARIO DE CITAS</h4>
                <Button type="primary" onClick={showModal}>
                    Nueva Cita
                </Button>
            </Row>

            {/* {isLoading ? <Loading /> : <Table columns={columns} dataSource={citasData} />} */}

            <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />

            <Modal title="Nueva Cita" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose
                footer={[
                    <Button onClick={handleCancel}>Cancelar</Button>,
                    <Button type="primary" htmlType="submit" form='nueva_cita_medic'>
                        Guardar
                    </Button>
                ]}
            >
                <Form name="nueva_cita_medic" labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off"
                    initialValues={{ id_reunion: 'https://www.google.com/calendar/event?eid=dXN2dG01NG9oY3E0bzhvczJzZXI5cjhxZDhfMjAyMjA4MDNUMTYwMDAwWiBhbWF0aWFzQHJlYWxpZGFkY3JlYXRpdmEuY29t' }}>

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

                    <Form.Item label="Fecha y Hora" name="fecha_hora" rules={[{ required: true, message: 'Selecciona Fecha y Hora' }]} >
                        <DatePicker showTime onChange={onChange} onOk={onOk} placeholder='Selecciona Fecha y Hora' />
                    </Form.Item>
                    <Col style={{ marginLeft: 64, marginBottom: 12 }}>
                        Cita en Linea: <Switch style={{ marginLeft: 8 }} defaultChecked={false} onChange={onSwitch} />
                    </Col>
                    {/*
                        isOnline ?
                            <>
                                <Form.Item label="Contraseña" name="password_reunion" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                                    <Input placeholder='Opcional' onChange={e => setPassword(e.target.value)} />
                                </Form.Item>
                            </>
                            :
                            <></>

                    */}
                    <Form.Item label="Comentarios" name="comentarios" rules={[{ required: false, message: 'Ingresa RFC' }]} >
                        <Input />
                    </Form.Item>


                </Form>
            </Modal>

            <Modal title="Detalles de la cita" visible={isDetailVisible} onOk={handleDetailOk} onCancel={handleDetailCancel} destroyOnClose
                footer={[
                    <Popconfirm
                        title="Esta seguro de que quiere borrar esta cita?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Si"
                        cancelText="No"
                    >
                        <Button danger>Borrar Cita</Button>
                    </Popconfirm>,
                    <Button type='primary' onClick={handleDetailOk}>Aceptar</Button>
                ]}
            >
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
