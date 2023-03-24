import React, { useState, useEffect } from 'react'
import { Modal, Form, Select, Input, Button, message, Switch, DatePicker } from 'antd'
import { getData, ids_hospitales, sendDataBody, updateData } from '../../resources';

export function CreateCitaForm(props) {
    const [medicosData, setMedicosData] = useState([])
    // Select patient for cerate cita
    const [misPacientes, setMisPacientes] = useState([])
    // Body of cita
    const [isOnline, setIsOnline] = useState(false)
    const [medico, setMedico] = useState(null)
    // For Fiel Servicio
    const [servicios, setServicios] = useState([])

    useEffect(() => {
        console.log('Received for edit fecg', props.fecha_hora)
        getDoctorsData()
        if (props.cita) getPacientesOfDoctor(props.cita.medico)
    }, [])
    
    // Get patients of specific doctor to populate the select
    const getPacientesOfDoctor = (_id) => {
        getData(`mispacientes/${_id}`).then(rs => {
            rs.forEach(p => { p.label = p.name; p.value = p._id })
            setMisPacientes(rs);
            console.log(`patients of ${_id}`, rs);
        })

        // Populate the "servicio" select
        if (medicosData.length > 0) {
            const { configuracion } = medicosData.find((m) => m._id === _id)
            console.log('Found: ', configuracion)
            let { tratamientos_ofrecidos } = configuracion;
            tratamientos_ofrecidos.forEach(t => {
                t.label = t.tratamiento; t.value = t.tratamiento;
            });
            setServicios(tratamientos_ofrecidos)
        }
    }

    const getDoctorsData = () => { //Para el caso que la sesion sea de Administrador
        sendDataBody('users/getMany/hospitals', { ids_hospitales: ids_hospitales }).then(rs => {
            rs.forEach(m => { m.value = m._id; m.label = m.name })

            if (props.cita) {
                const { configuracion } = rs.find((m) => m._id === props.cita.medico)
                console.log('Found on getDctsDt: ', configuracion)
                let { tratamientos_ofrecidos } = configuracion;
                tratamientos_ofrecidos.forEach(t => {
                    t.label = t.tratamiento; t.value = t.tratamiento;
                });
                setServicios(tratamientos_ofrecidos)
            }
            setMedicosData(rs)
        })
    }


    // Form Methods
    const onFinish = (values) => {
        if (!props.cita) values.fecha_hora = props.fecha_hora;
        values.sucursal = props.hospital;

        // const { configuracion } = medicosData.find((m) => m._id === medico)
        // const { costo_cita } = configuracion;

        // const monto = costo_cita ? costo_cita + values.tratamiento : values.tratamiento
        console.log('Ready to send', values)

        // Handle if its updating or creating cita
        if (props.cita) {
            updateData(`citas/update/${props.cita._id}`, values).then((response) => {
                // message.success(response.message || response.error);
                console.log(response);
                props.setIsModalOpen(false);
                props.setEditingCita(false);
            }).finally(() => { props.getCitasData(); })
        } else {
            sendDataBody('citas/add', values).then((response) => {
                message.success(response.message || response.error);
                // createBalance(response.id_nueva_cita, monto)
                console.log(response)
            }).finally(() => { props.getCitasData(); props.setIsModalOpen(false) })
        }
    }


    // Create the respective balance for cita
    // const createBalance = (_cita, monto) => {
    //     const balanceBody = {
    //         medico: medico,
    //         cita: _cita,
    //         monto: monto,
    //         forma_de_pago: 'efectivo',
    //         estado: 'pendiente',
    //     }
    //     console.log('Balance ready to send: ', balanceBody)
    //     sendDataBody('balances/add', balanceBody).then((rs) => console.log(rs))
    // }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleDoctorChange = (value) => { setMedico(value); getPacientesOfDoctor(value); };

    const onSwitch = (checked) => {
        console.log(`switch to ${checked}`);
        setIsOnline(checked)
    };
    return <Form name="nueva_cita_admin" labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off"
        initialValues={props.cita ? props.cita : { isOnline: false, tratamiento: 'Sin servicio' }}>

        <Form.Item label="Medico" name="medico" rules={[{ required: true, message: 'Selecciona Medico' }]} >
            <Select options={medicosData} onChange={handleDoctorChange} />
        </Form.Item>

        <Form.Item label="Paciente" name="usuario" rules={[{ required: true, message: 'Selecciona Usuario' }]} >
            <Select options={misPacientes} />
        </Form.Item>

        <Form.Item label="Servicio" name="servicio" rules={[{ required: true, message: 'Selecciona Servicio' }]} >
            <Select options={servicios} />
        </Form.Item>

        <Form.Item label="VideoLlada" name="isOnline" >
            <Switch onChange={onSwitch} />
        </Form.Item>

        <Form.Item label="Comentarios" name="comentarios" rules={[{ required: false, message: 'Ingresa Comentarios' }]} >
            <Input />
        </Form.Item>

        {
            // Only if updating cita
            props.cita && <div>
                <Form.Item label="Fecha y Hora" name="fecha_hora" rules={[{ required: false, message: 'Selecciona Fecha y Hora' }]} >

                    <DatePicker showTime />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" form='nueva_cita_admin'>
                        Guardar
                    </Button>
                </Form.Item>
            </div>
        }

    </Form>
}

export default function CreateCita(props) {

    // Handle Modal Visibility
    const handCreateleOk = () => { props.setIsModalOpen(false) }
    const handCreateleCancel = () => { props.setIsModalOpen(false) }


    return (
        <Modal title="Nueva Cita" open={props.isOpenModal} onOk={handCreateleOk} onCancel={handCreateleCancel} destroyOnClose
            footer={[
                <Button onClick={handCreateleCancel}>Cancelar</Button>,
                <Button type="primary" htmlType="submit" form='nueva_cita_admin'>
                    Guardar
                </Button>
            ]}
        >
            <CreateCitaForm setIsModalOpen={props.setIsModalOpen} hospital={props.hospital} fecha_hora={props.fecha_hora} getCitasData={props.getCitasData} />

        </Modal>
    )
}
