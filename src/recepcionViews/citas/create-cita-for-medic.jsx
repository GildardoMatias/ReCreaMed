import React, { useState, useEffect } from 'react'
import { Modal, Form, Select, Input, Button, message, Switch } from 'antd'
import { getData, usuario, sendDataBody } from '../../resources';


export default function CreateCita(props) {

    const [medicosData, setMedicosData] = useState([])
    // Select patient for cerate cita
    const [misPacientes, setMisPacientes] = useState([])
    // Handle Modal Visibility
    const handCreateleOk = () => { props.setIsModalOpen(false) }
    const handCreateleCancel = () => { props.setIsModalOpen(false) }
    // Body of cita
    const [isOnline, setIsOnline] = useState(false)
    const [medico, setMedico] = useState(null)

    useEffect(() => {
        getDoctorsData()
    }, [])

    const getDoctorsData = () => { //Para el caso que la sesion sea de Administrador
        const body = { ids: usuario.medicos_asignados }
        sendDataBody(`users/getMany`, body).then(rs => {
            rs.forEach(m => { m.value = m._id; m.label = m.name })
            setMedicosData(rs);
            console.log('medicosData: ', rs);
        })
    }

    // Get patients of specific doctor to populate the select
    const getPacientesOfDoctor = (_id) => { //Para el caso que la sesion sea de Medico
        getData(`mispacientes/${_id}`).then(rs => {
            rs.forEach(p => { p.label = p.name; p.value = p._id })
            setMisPacientes(rs);
            console.log(`patients of ${_id}`, rs);
        })
    }
    // Form Methods
    const onFinish = (values) => {
        values.fecha_hora = props.fecha_hora;
        values.sucursal = props.hospital;

        const { configuracion } = medicosData.find((m) => m._id === medico)
        const { costo_cita } = configuracion;

        sendDataBody('citas/add', values).then((response) => {
            message.success(response.message || response.error);
            createBalance(response.id_nueva_cita, costo_cita ? costo_cita : 0)
            props.setIsModalOpen(false)
        }).finally(() => props.getCitasData())

    };
    // Create the respective balance for cita
    const createBalance = (_cita, monto) => {
        const balanceBody = {
            medico: medico,
            cita: _cita,
            monto: monto,
            forma_de_pago: 'efectivo',
            estado: 'pendiente',
        }
        console.log('Balance ready to send: ', balanceBody)
        sendDataBody('balances/add', balanceBody).then((rs) => console.log(rs))
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleDoctorChange = (value) => { setMedico(value); getPacientesOfDoctor(value); };

    const onSwitch = (checked) => {
        console.log(`switch to ${checked}`);
        setIsOnline(checked)
    };

    return (
        <Modal title="Nueva Cita" open={props.isOpenModal} onOk={handCreateleOk} onCancel={handCreateleCancel} destroyOnClose
            footer={[
                <Button onClick={handCreateleCancel}>Cancelar</Button>,
                <Button type="primary" htmlType="submit" form='nueva_cita_admin'>
                    Guardar
                </Button>
            ]}
        >

            <Form name="nueva_cita_admin" labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off"
                initialValues={{ isOnline: false }}>

                <Form.Item label="Medico" name="medico" rules={[{ required: true, message: 'Selecciona Medico' }]} >
                    <Select options={medicosData} onChange={handleDoctorChange} />
                </Form.Item>

                <Form.Item label="Paciente" name="usuario" rules={[{ required: true, message: 'Selecciona Usuario' }]} >
                    <Select options={misPacientes} />
                </Form.Item>

                <Form.Item label="VideoLlada" name="isOnline" >
                    <Switch onChange={onSwitch} />
                </Form.Item>

                <Form.Item label="Comentarios" name="comentarios" rules={[{ required: false, message: 'Ingresa RFC' }]} >
                    <Input />
                </Form.Item>


            </Form>
        </Modal>
    )
}
