import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Modal, Form, Input, DatePicker, message, Popconfirm } from 'antd';
import { Calendar, Badge, Switch, Space } from 'antd';
import { deleteData, getData, sendDataBody } from '../resources';
import { usuario } from '../resources';
import { Select } from 'antd';
import { VideoCameraOutlined, NotificationOutlined, CalendarOutlined, UserOutlined, BankOutlined, ClockCircleOutlined } from '@ant-design/icons';
import moment from "moment";

const { Option } = Select;

const format = 'HH:mm';

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
        getData(`citas/medico/${usuario._id}`).then(rs => { console.log('GetCitas: ', rs); setCitasData(rs); setCitasLoading(false) })
    }


    // Add Modal
    const showModal = () => { setIsModalVisible(true) };
    const handleOk = () => { setIsModalVisible(false); };
    const handleCancel = () => { setIsModalVisible(false); };
    // Details Modal
    const handleDetailOk = () => { setIsDetailVisible(false); };
    const handleDetailCancel = () => { setIsDetailVisible(false); };

    // Create cita
    const onFinish = (values) => {
        values.medico = usuario._id;
        values.sucursal = usuario.horarios[0].sucursal._id;

        console.log('ready to send: ', values);
        sendDataBody('citas/add', values).then((response) => {
            console.log('Success:', response); message.success(response.message || response.error);
            createBalance(response.id_nueva_cita)
            getCitasData(); setIsModalVisible(false)
        })

    };
    // Create the respective balance for cita
    const createBalance = (_cita) => {
        const balanceBody = {
            medico: usuario._id,
            cita: _cita,
            monto: 0,
            forma_de_pago: 'efectivo',
            estado: 'pendiente',
        }
        sendDataBody('balances/add', balanceBody).then((rs) => console.log(rs))
    }

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
                    cita.fecha_cita = cita.fecha_hora.substring(0, 10);
                    cita.hora_cita = cita.fecha_hora.substring(11, 16);
                    return cita.fecha_cita === hoy ?
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
                    initialValues={{ isOnline: false }}>

                    <Form.Item label="Paciente" name="usuario" rules={[{ required: true, message: 'Selecciona Usuario' }]} >
                        <Select
                            onChange={handleChange}
                        >
                            {
                                misPacientes.map((p) => {
                                    return <Option value={p._id} key={p._id}>{p.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>


                    <Form.Item label="Fecha y Hora" name="fecha_hora" rules={[{ required: true, message: 'Selecciona Fecha y Hora' }]} >
                        <DatePicker onChange={onChange} onOk={onOk} placeholder='Selecciona Fecha y Hora'
                            format="YYYY-MM-DD HH:mm:ss"
                            showTime={{
                                defaultValue: moment("00:00:00", "HH:mm:ss"),
                                format: "HH:mm"
                            }} />
                    </Form.Item>

                    <Form.Item label="VideoLlamada" name="isOnline" >
                        <Switch onChange={onSwitch} />
                    </Form.Item>

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
                        <Space direction='vertical'>

                            <Space align='center'> <UserOutlined /> {cita.usuario?.name}</Space>
                            <Space align='center'> <CalendarOutlined /> {cita.fecha_cita} <ClockCircleOutlined style={{ marginBottom: 6 }} /> {cita.hora_cita}</Space>
                            <Space align='baseline'> <BankOutlined /> {cita.sucursal?.nombre}</Space>
                            <Space align='baseline'> <NotificationOutlined /> {cita.comentarios}</Space>
                            {cita.id_reunion && <Space align='center'> <VideoCameraOutlined style={{ marginBottom: 6 }} /> ID reunion: {cita.id_reunion.substring(26, 37)} </Space>}
                            {cita.id_reunion && <Space align='center'> <VideoCameraOutlined style={{ marginBottom: 6 }} /> Contraseña : {cita.password_reunion} </Space>}
                            {cita.id_reunion && <Space align='center'> <VideoCameraOutlined style={{ marginBottom: 6, color: '#1890ff' }} /> <a href={cita.id_reunion} target='_blank' rel='noreferrer'> Ir a la cita </a> </Space>}

                        </Space>
                        :
                        <p>Sin cita seleccionada</p>
                }
            </Modal>
        </div>
    )
}
