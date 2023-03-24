import React, { useState, useEffect } from 'react'
import { Modal, Form, Select, Input, Button, message, Switch } from 'antd'
import { getData, usuario, sendDataBody, ids_hospitales, myHospitals } from '../../resources';

export function CreateCitaForm(props) {



    const [medicosData, setMedicosData] = useState([])
    // Select patient for cerate cita
    const [misPacientes, setMisPacientes] = useState([])
    const [servicios, setServicios] = useState({})
    const [serviciosLoaded, setServiciosLoaded] = useState(false)
    const [newCita, setNewCita] = useState({}) // For form

    // Body of cita
    const [isOnline, setIsOnline] = useState(false)
    const [medico, setMedico] = useState(null)

    useEffect(() => {
        getDoctorsData()
    }, [])

    // Get patients of specific doctor to populate the select
    const getPacientesOfDoctor = (_id) => { //Para el caso que la sesion sea de Medico
        getData(`mispacientes/${_id}`).then(rs => {
            rs.forEach(p => { p.label = p.name; p.value = p._id })
            setMisPacientes(rs);
            console.log(`patients of ${_id}`, rs);
        })

        getData(`getuser/${_id}`).then((rs) => {
            rs.configuracion.tratamientos_ofrecidos.forEach(t => {
                t.value = t.costo; t.label = t.tratamiento;
            });
            setServicios(rs.configuracion.tratamientos_ofrecidos)
            setServicios(rs.configuracion.tratamientos_ofrecidos.map((t) => {
                return { value: t.costo, label: t.tratamiento }
            }))
        }).finally(() => { setServiciosLoaded(true) })
    }

    useEffect(() => {
        if (props.cita) {
            newCita = { ...props.cita }
            newCita.sucursal = newCita.sucursal._id;
            newCita.usuario = newCita.usuario._id;
            newCita.medico = newCita.medico._id;
            getPacientesOfDoctor(newCita.medico)
            if (!newCita.tratamiento) newCita.tratamiento = 'Sin servicio'
            console.log('Received For Edit: ', newCita)
        }
    }, [])



    const getDoctorsData = () => { //Para el caso que la sesion sea de Administrador
        console.log('Get For Hospitals: ', ids_hospitales)
        sendDataBody('users/getMany/hospitals', { ids_hospitales: ids_hospitales }).then(rs => {
            rs.forEach(m => { m.value = m._id; m.label = m.name })
            setMedicosData(rs)
        })
    }


    // Form Methods
    const onFinish = (values) => {
        values.fecha_hora = props.fecha_hora;
        values.sucursal = props.hospital;



        if (values.tratamiento === 'Sin servicio') values.tratamiento = 0;
        values.fecha_hora = props.fecha_hora;
        // values.medico = usuario._id;
        // const { configuracion } = usuario;
        // const { costo_cita } = configuracion;

        const { configuracion } = medicosData.find((m) => m._id === medico)
        const { costo_cita } = configuracion;
        const monto = costo_cita ? costo_cita + values.tratamiento : values.tratamiento

        delete values.tratamiento;

        sendDataBody('citas/add', values).then((response) => {
            message.success(response.message || response.error);
            createBalance(response.id_nueva_cita, monto)
            props.setIsModalOpen(false)
        }).finally(() => props.getCitasData())

    };
    // Create the respective balance for cita
    const createBalance = (_cita, monto) => {
        const balanceBody = {
            tipo: 'ingreso',
            fecha_hora: props.fecha_hora,
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
    // Select tratamiento
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return < Form name="nueva_cita_admin" labelCol={{ span: 8 }
    } wrapperCol={{ span: 12 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off"
        initialValues={props.cita ? newCita : { tratamiento: 'Sin servicio' }}>
        <Form.Item label="Medico" name="medico" rules={[{ required: true, message: 'Selecciona Medico' }]} >
            <Select options={medicosData} onChange={handleDoctorChange} />
        </Form.Item>

        <Form.Item label="Paciente" name="usuario" rules={[{ required: true, message: 'Selecciona Usuario' }]} >
            <Select options={misPacientes} />
        </Form.Item>

        <Form.Item label="Servicio" name="tratamiento" rules={[{ required: true, message: 'Selecciona un servicio' }]} >
            {
                serviciosLoaded ?

                    <Select
                        onChange={handleChange}
                        options={servicios}
                    /> : <p>Selecciona un medico para ver sus servicios</p>
            }
        </Form.Item>

        <Form.Item label="VideoLlada" name="isOnline" >
            <Switch onChange={onSwitch} />
        </Form.Item>

        <Form.Item label="Comentarios" name="comentarios" rules={[{ required: false, message: 'Ingresa RFC' }]} >
            <Input />
        </Form.Item>

        {
            // Only if updating cita
            props.cita && <Form.Item
                wrapperCol={{ offset: 8, span: 16 }}
            >
                <Button type="primary" htmlType="submit" form='nueva_cita_admin'>
                    Guardar
                </Button>
            </Form.Item>
        }


    </Form >
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
