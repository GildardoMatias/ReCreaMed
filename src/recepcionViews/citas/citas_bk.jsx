import React, { useState, useEffect } from 'react'
import { Calendar, Space,  Button, Modal, Form, Input, message, DatePicker, Badge, Select, Switch } from 'antd';
import { getData, usuario, sendDataBody } from '../../resources';
// import Loading from '../../loading'
import moment from "moment";
const { Option } = Select;

export default function Citas() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [citasData, setCitasData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [cita, setCita] = useState({})
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [medicosData, setMedicosData] = useState([])
    // Select patient for cerate cita
    const [misPacientes, setMisPacientes] = useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)
    // Body of cita
    const [isOnline, setIsOnline] = useState(false)
    const [medico, setMedico] = useState(null)

    useEffect(() => {
        getDoctorsData()
    }, [])

    const getDoctorsData = () => { //Para el caso que la sesion sea de Administrador
        const body = { ids: usuario.medicos_asignados }
        sendDataBody(`users/getMany`, body).then(rs => { setMedicosData(rs); console.log('medicosData: ', rs); })
    }

    // Get patients for populate select
    const getPacientesOfDoctor = (_id) => { //Para el caso que la sesion sea de Medico
        getData(`mispacientes/${_id}`).then(rs => { setSelectedPatient(null); setMisPacientes(rs); console.log(`patients of ${_id}`, rs); })
    }
    const handleChange = (value) => { setSelectedPatient(value) };


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values) => {
        values.medico = medico;
        const hospital = medicosData.find((m) => m._id === medico)
        values.sucursal = hospital.horarios[0].sucursal._id;
        // console.log('Found', hospital.horarios[0].sucursal._id);
        console.log('ready to send: ', values);

        sendDataBody('citas/add', values).then((response) => {
            console.log('Success:', response); message.success(response.message || response.error);
            getCitasData(medico); setIsModalVisible(false)
        })

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // Get citas on select medico Change
    const getCitasData = (medico) => {
        getData(`citas/medico/${medico}`).then((rs) => {
            console.log(rs);
            setCitasData(rs);
            setIsLoading(false)
        })
    }

    const handleDoctorChange = (value) => { setMedico(value); getCitasData(value); getPacientesOfDoctor(value) };

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
    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };
    const onSwitch = (checked) => {
        console.log(`switch to ${checked}`);
        setIsOnline(checked)
    };
    return (
        <div className='mainContainer'>
            <h4>Citas de todos los pacientes</h4>

            <br />
            <Space size='large'>
                <Select
                    bordered
                    style={{ width: 260, }}
                    onChange={handleDoctorChange}
                    placeholder='Selecciona un medico'
                >
                    {
                        medicosData.map((p) => {
                            return <Option key={p._id} value={p._id}>{p.name}</Option>
                        })
                    }
                </Select>

                <Button type="primary" onClick={showModal} disabled={!medico}>
                    Crear cita para este medico
                </Button>
            </Space>


            {
                isLoading ?
                    // <Loading />
                    <div style={{ width: '100%', marginTop: 46, textAlign: 'center' }}><h5>Elije un medico para ver sus citas</h5></div>
                    :
                    <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
            }


            {/* Create Cita */}
            <Modal title="Nueva Cita" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose
                footer={[
                    <Button onClick={handleCancel}>Cancelar</Button>,
                    <Button type="primary" htmlType="submit" form='nueva_cita_admin'>
                        Guardar
                    </Button>
                ]}
            >
                <Form name="nueva_cita_admin" labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off"
                    initialValues={{ isOnline: false }}>

                    <Form.Item label="Paciente" name="usuario" rules={[{ required: true, message: 'Selecciona Usuario' }]} >
                        <Select onChange={handleChange}>
                            {
                                misPacientes.map((p) => {
                                    return <Option value={p._id}>{p.name}</Option>
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

                    <Form.Item label="VideoLlada" name="isOnline" >
                        <Switch onChange={onSwitch} />
                    </Form.Item>

                    <Form.Item label="Comentarios" name="comentarios" rules={[{ required: false, message: 'Ingresa RFC' }]} >
                        <Input />
                    </Form.Item>


                </Form>
            </Modal>

        </div>
    )
}
