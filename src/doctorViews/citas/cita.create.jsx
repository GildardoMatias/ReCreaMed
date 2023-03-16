import React, { useState, useEffect } from 'react'
import { Modal, Form, Select, Input, Button, message, Switch } from 'antd'
import { getData, myHospitals, sendDataBody, usuario } from '../../resources';


export default function CreateCita(props) {
    myHospitals.forEach(h => { h.value = h._id; h.label = h.nombre; });

    const [medicosData, setMedicosData] = useState([])
    // Select patient for cerate cita
    const [misPacientes, setMisPacientes] = useState([])
    // Handle Modal Visibility
    const handCreateleOk = () => { props.setIsModalOpen(false) }
    const handCreateleCancel = () => { props.setIsModalOpen(false) }
    // Body of cita
    const [isOnline, setIsOnline] = useState(false)
    const [hospital, setHospital] = useState(null)

    useEffect(() => {
        getPacientesOfDoctor()
    }, [])


    // Get patients of specific doctor to populate the select
    const getPacientesOfDoctor = () => { //Para el caso que la sesion sea de Medico
        getData(`mispacientes/${usuario._id}`).then(rs => {
            rs.forEach(p => { p.label = p.name; p.value = p._id })
            setMisPacientes(rs);
        })
    }
    // Form Methods
    const onFinish = (values) => {
        // let monto;
        if (values.tratamiento === 'Sin servicio') values.tratamiento = 0;
        values.fecha_hora = props.fecha_hora;
        values.medico = usuario._id;
        const { configuracion } = usuario;
        const { costo_cita } = configuracion;

        const monto = costo_cita ? costo_cita + values.tratamiento : values.tratamiento
        
        delete values.tratamiento;
        console.log(values)
        console.log('Monto: ', monto)
        sendDataBody('citas/add', values).then((response) => {
            message.success(response.message || response.error);
            createBalance(response.id_nueva_cita, monto)
            props.setIsModalOpen(false)
            console.log(response)
        }).finally(() => props.getCitasData())

    };
    // Create the respective balance for cita
    const createBalance = (_cita, monto) => {
        const balanceBody = {
            tipo: 'ingreso',
            medico: usuario._id,
            cita: _cita,
            monto: monto,
            forma_de_pago: 'efectivo',
            fecha_hora: props.fecha_hora,
            estado: 'pendiente',
        }
        console.log('Balance ready to send: ', balanceBody)
        sendDataBody('balances/add', balanceBody).then((rs) => console.log(rs))
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleHospitalChange = (value) => { setHospital(value) };

    // Select tratamiento
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
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
                initialValues={{ tratamiento: 'Sin servicio' }}>

                <Form.Item label="Hospital" name="sucursal" rules={[{ required: true, message: 'Selecciona Sucursal' }]} >
                    <Select options={myHospitals} onChange={handleHospitalChange} />
                </Form.Item>

                <Form.Item label="Paciente" name="usuario" rules={[{ required: true, message: 'Selecciona Usuario' }]} >
                    <Select options={misPacientes} />
                </Form.Item>

                <Form.Item label="Servicio" name="tratamiento" rules={[{ required: false, message: 'Selecciona un servicio' }]} >
                    <Select

                        onChange={handleChange}
                        options={
                            usuario.configuracion.tratamientos_ofrecidos.map((t) => { return { value: t.costo, label: t.tratamiento } })
                        }
                    />
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
