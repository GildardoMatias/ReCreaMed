import React, { useState, useEffect } from 'react'
import { Modal, Form, Select, Input, Button, message, Switch, DatePicker } from 'antd'
import { getData, myHospitals, sendDataBody, updateData, usuario } from '../../resources';
import { createEvent } from './auth.button';


export function CreateCitaForm(props) {

    const { configuracion: { costo_cita = 0 } = {} } = usuario;
    // const = configuracion;

    myHospitals.forEach(h => { h.value = h._id; h.label = h.nombre; });


    // Select patient for cerate cita
    const [misPacientes, setMisPacientes] = useState([])


    // Body of cita
    // const [isOnline, setIsOnline] = useState(false)
    // const [hospital, setHospital] = useState(null)
    const [usesCostoBase, setUsesCostoBase] = useState(false)

    const [costo, setCosto] = useState(0)

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

        values.medico = usuario._id;
        values.id_servicio = values.servicio.key;
        values.servicio = values.servicio.label;
        // values.servicio = values.servicio.title +" - " + values.servicio.;
        delete values.tratamiento;

        console.log(values)

        // Handle if its updating or creating cita
        if (props.cita) {
            updateData(`citas/update/${props.cita._id}`, values).then((response) => {
                console.log(response)
            }).finally(() => { props.getCitasData(); props.setIsModalOpen(false); props.setEditingCita(false) })
        } else {

            props.isGoogleSincronized && createEvent(values.fecha_hora, values.duracion, values.servicio.title || values.servicio) // Create cita google W

            sendDataBody('citas/add', values).then((response) => {
                message.success(response.message || response.error);
                response.message && response.message === 'Cita creada correctamente' ? createBalance(response.id_nueva_cita, values.fecha_hora) : message.error('No se pudo crear registro de ingreso')
                console.log(response)
            }).finally(() => { props.getCitasData(); props.setIsModalOpen(false) })
        }


    };
    // Create the respective balance for cita
    const createBalance = (_cita, _fecha_hora) => {
        const balanceBody = {
            tipo: 'ingreso',
            medico: usuario._id,
            cita: _cita,
            monto: usesCostoBase ? (costo + costo_cita) : costo,
            forma_de_pago: 'efectivo',
            fecha_hora: _fecha_hora,
            estado: 'pendiente'
        }
        console.log('Balance ready to send: ', balanceBody)
        sendDataBody('balances/add', balanceBody).then((rs) => { message.success(rs.message || rs.error); console.log(rs) })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleHospitalChange = (value) => { console.log('Selected Hospital: ', value); };
    const handlePacienteChange = (value) => { console.log('Selected Hospital: ', value); };

    // Select tratamiento old
    // const handleChange = (value) => {
    //     setCosto(value)
    //     console.log(`selected ${value}`);
    // };
    // Select tratamiento new
    const handleChange = (selected) => {
        setCosto(selected.value)
        console.log(`selected service`, selected);
    };

    const onSwitch = (checked) => {
        console.log(`switch to ${checked}`);
        // setIsOnline(checked)
    };
    const onSwitchCosoBase = (checked) => {
        // if(checked)se
        console.log(`switch to ${checked}`);
        setUsesCostoBase(checked)
    };

    const timeOptions = [
        { label: 'Media Hora', value: 30 },
        { label: 'Una Hora', value: 60 },
        { label: 'Una Hora y Media', value: 90 },
        { label: 'Dos Horas', value: 120 },
        { label: 'Dos Horas Y Media', value: 150 },
        { label: 'Tres Horas', value: 180 },
    ]

    return <Form name="nueva_cita_admin" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off"
        initialValues={props.cita ? props.cita : { isOnline: false, tratamiento: 'Sin servicio', fecha_hora: props.fecha_hora, duracion: 60 }}
    >
        {
            myHospitals.length < 1 && <span style={{ color: 'red' }}>Debes tener horarios registrados para poder registrar citas, puedes configurarlos en 'Mi perfil'</span>
        }

        {usuario && usuario.configuracion && usuario.configuracion.tratamientos_ofrecidos ? (
            <></>
        ) : (
            <span style={{ color: 'red' }}>Debes tener servicios registrados para poder registrar citas, puedes configurarlos en 'Mi perfil' y después 'configuracion'</span>
        )}

        <Form.Item label="Hospital" name="sucursal" rules={[{ required: true, message: 'Selecciona Sucursal' }]} >
            <Select options={myHospitals} onChange={handleHospitalChange} />
        </Form.Item>

        <Form.Item label="Paciente" name="usuario" rules={[{ required: true, message: 'Selecciona Usuario' }]} >
            <Select options={misPacientes} onChange={handlePacienteChange} />
        </Form.Item>

        <Form.Item label="VideoLlamada" name="isOnline" >
            <Switch onChange={onSwitch} />
        </Form.Item>

        <Form.Item label="Comentarios" name="comentarios" rules={[{ required: false, message: 'Ingresa RFC' }]} >
            <Input />
        </Form.Item>

        <Form.Item label="Fecha y Hora" name="fecha_hora" rules={[{ required: false, message: 'Selecciona Fecha y Hora' }]} >
            <DatePicker showTime format="DD/MM/YYYY HH:mm" use12Hours={true} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Duracion" name="duracion" rules={[{ required: true, message: 'Selecciona la duracion de la cita' }]} >
            <Select options={timeOptions} />
        </Form.Item>

        {/* {
            usuario.configuracion.tratamientos_ofrecidos.map((t) => { return <p> `${t.tratamiento} $${t.costo} ${t._id}` </p> })

        } */}

        {
            usuario.configuracion && usuario.configuracion.tratamientos_ofrecidos &&
            <Form.Item label="Servicio" name="servicio" rules={[{ required: true, message: 'Selecciona un servicio' }]} >
                <Select
                    onChange={handleChange}
                    options={
                        usuario.configuracion.tratamientos_ofrecidos.map((t) => { return { key: t._id, value: t.costo, label: `${t.tratamiento} - $${t.costo} - ${t.observaciones ?? ""}`, title: t.tratamiento } })
                    }
                    labelInValue
                />
            </Form.Item>
        }




        <Form.Item label={`costo de la cita $${costo_cita}`} >
            <Switch onChange={onSwitchCosoBase} />
        </Form.Item>

        <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
        >
            <div className='fila'>
                <h6>Costo Total: ${usesCostoBase ? (costo + costo_cita) : costo} </h6>
            </div>
        </Form.Item>

        {
            // Only if updating cita
            props.cita && <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
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
        <Modal title={props.cita ? "Editar Cita" : "Nueva Cita"} open={props.isOpenModal} onOk={handCreateleOk} onCancel={handCreateleCancel} destroyOnClose width={600}
            footer={[
                <Button onClick={handCreateleCancel}>Cancelar</Button>,
                <Button type="primary" htmlType="submit" form='nueva_cita_admin'>
                    Guardar
                </Button>
            ]}
        >

            <CreateCitaForm setIsModalOpen={props.setIsModalOpen} isOpenModal={props.isCreateModalOpen} fecha_hora={props.fecha_hora} getCitasData={props.getCitasData} />
        </Modal>
    )
}
