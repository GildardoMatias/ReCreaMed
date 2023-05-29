import React, { useState, useEffect } from 'react'
import { Modal, Form, Select, Input, Button, message, Switch, DatePicker } from 'antd'
import { sendDataBody, updateData, ids_hospitales } from '../../resources';

export function CreateCitaForm(props) {
    // const [medicosLoading, setMedicosLoading] = useState(true)
    const [medicos, setMedicos] = useState([])//Set Medicos for select
    const [medicosData, setMedicosData] = useState([]) // List of all Medicos
    const [servicios, setServicios] = useState([])

    const [errorMessage, setErrorMessage] = useState("")
    const [enableCreateCita, setEnableCreateCita] = useState(true)
    // Body of cita
    const [isOnline, setIsOnline] = useState(false)
    const [costo, setCosto] = useState(0)

    useEffect(() => {
        getDoctorsData()
        console.log('Received Cita', props.cita)
        if (props.cita && props.cita.usuario) handlePatientChange(props.cita.usuario)
    }, [])

    const getDoctorsData = () => { // First of all, get medicos
        sendDataBody('users/getMany/hospitals', { ids_hospitales: ids_hospitales }).then(rs => {
            // rs.forEach(m => { m.value = m._id; m.label = m.name })

            // if (props.cita) {
            //     const { configuracion } = rs.find((m) => m._id === props.cita.medico)
            //     console.log('Found on getDctsDt: ', configuracion)
            //     let { tratamientos_ofrecidos } = configuracion;
            //     tratamientos_ofrecidos.forEach(t => {
            //         t.label = t.tratamiento; t.value = t.tratamiento;
            //     });
            //     setServicios(tratamientos_ofrecidos)
            // }

            setMedicosData(rs)
        })
    }

    // Form Methods
    const onFinish = (values) => {
        values.sucursal = props.hospital;
        delete values.tratamiento;
        delete values.servicio;

        // Handle if its updating or creating cita
        console.log('cita ready', values)
        if (props.cita) {
            updateData(`citas/update/${props.cita._id}`, values).then((response) => {
                // message.success(response.message || response.error);
                props.setIsModalOpen(false);
                props.setEditingCita(false);
            }).finally(() => { props.getCitasData(); })
        } else {
            sendDataBody('citas/add', values).then((response) => {
                message.success(response.message || response.error);
                createBalance(response.id_nueva_cita, values.medico)
            }).finally(() => { props.getCitasData(); props.setIsModalOpen(false) })
        }
    }

    const createBalance = (_cita, medico) => {
        const balanceBody = {
            tipo: 'ingreso',
            medico: medico,
            cita: _cita,
            monto: costo,
            forma_de_pago: 'efectivo',
            fecha_hora: props.fecha_hora,
            estado: 'pendiente'
        }
        console.log('Balance ready to send: ', balanceBody)
        sendDataBody('balances/add', balanceBody).then((rs) => { message.success(rs.message || rs.error); console.log(rs) })
    }


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handlePatientChange = (value) => {
        console.log('Entering search', value)
        console.log('PatsAta', props.pacientesData)
        const found = props.pacientesData.find((p) => p._id === value);
        if (found) {
            setEnableCreateCita(true)
            let { medicos_asignados } = found
            medicos_asignados.forEach((m) => {
                if (medicosData.includes)
                    m.label = m.name; m.value = m._id
            });
            console.log('Found', found)
            console.log('meds', medicos_asignados)
            setMedicos(medicos_asignados);
            // setMedicosLoading(false)
        } else {
            setEnableCreateCita(false)
            setErrorMessage("Usuario no encontrado")
        }
    };
    const onSearchPatient = (value) => { };

    const handleMedicochange = (_id) => {
        console.log('selected', _id)
        console.log('all medics', medicosData)
        // Populate the "servicio" select
        if (medicos.length > 0) {
            let found = medicosData.find((m) => m._id === _id)
            if (found && found.configuracion.tratamientos_ofrecidos) {
                setErrorMessage("")
                setEnableCreateCita(true)
                if (props.enableCreateCita) props.setEditingCita(false)
                let { configuracion: { tratamientos_ofrecidos } } = found;
                // console.log("found tr", found)
                tratamientos_ofrecidos.forEach(t => {
                    t.label = `${t.tratamiento} - $${t.costo}`; t.value = t.costo;
                });
                setServicios(tratamientos_ofrecidos)
            }
            else {
                setEnableCreateCita(false);
                setErrorMessage("No se puede crear la cita para este médico")
                if (props.enableCreateCita) props.enableCreateCita(false)
            }
            //   

        }
    }

    const onSwitch = (checked) => {
        setIsOnline(checked)
    };

    // Handle change for select servicio
    const handleChange = (value) => {

        setCosto(value)
        console.log(`selected ${value}`);
    };

    const timeOptions = [
        { label: 'Media Hora', value: 30 },
        { label: 'Una Hora', value: 60 },
        { label: 'Una Hora y Media', value: 90 },
        { label: 'Dos Horas', value: 120 },
        { label: 'Dos Horas Y Media', value: 150 },
        { label: 'Tres Horas', value: 180 },
        { label: 'Cuatro Horas', value: 210 },
        { label: 'Cuatro Horas y Media', value: 240 },
        { label: 'Cinco Horas', value: 270 },
        { label: 'Cinco Horas y Media', value: 300 },
    ]

    return <Form name="nueva_cita_admin" labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off"
        initialValues={props.cita ? props.cita : { isOnline: false, tratamiento: 'Sin servicio', fecha_hora: props.fecha_hora, duracion: 60 }}>

        <div>{errorMessage}</div>

        <Form.Item label="Paciente" name="usuario" rules={[{ required: true, message: 'Selecciona Usuario' }]} >
            <Select options={props.pacientesData} onChange={handlePatientChange} optionFilterProp="children" onSearch={onSearchPatient} showSearch
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())} />
        </Form.Item>

        <Form.Item label="Medico" name="medico" rules={[{ required: true, message: 'Selecciona Medico' }]} >
            <Select options={medicos} onChange={handleMedicochange} />
        </Form.Item>


        <Form.Item label="Servicio" name="servicio" rules={[{ required: true, message: 'Selecciona Medico' }]} >
            <Select options={servicios} onChange={handleChange} />
        </Form.Item>



        <Form.Item label="VideoLlamada" name="isOnline" >
            <Switch onChange={onSwitch} />
        </Form.Item>

        <Form.Item label="Comentarios" name="comentarios" rules={[{ required: false, message: 'Ingresa Comentarios' }]} >
            <Input />
        </Form.Item>

        <Form.Item label="Fecha y Hora" name="fecha_hora" rules={[{ required: false, message: 'Selecciona Fecha y Hora' }]} >
            <DatePicker showTime format="DD/MM/YYYY HH:mm" use12Hours={true} />
        </Form.Item>

        <Form.Item label="Duracion" name="duracion" rules={[{ required: true, message: 'Selecciona la duracion de la cita' }]} >
            <Select options={timeOptions} />
        </Form.Item>

        {
            // Only if updating cita
            props.cita && <div>


                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" form='nueva_cita_admin' disabled={!enableCreateCita}>
                        Guardar
                    </Button>
                </Form.Item>
            </div>
        }

    </Form>
}

export default function CreateCita(props) {

    const [enableCreate, setEnableCreate] = useState(true)
    // Handle Modal Visibility
    const handCreateleOk = () => { props.setIsModalOpen(false) }
    const handCreateleCancel = () => { props.setIsModalOpen(false) }


    return (
        <Modal title="Nueva Cita" open={props.isOpenModal} onOk={handCreateleOk} onCancel={handCreateleCancel} destroyOnClose
            footer={[
                <Button onClick={handCreateleCancel}>Cancelar</Button>,
                <Button type="primary" htmlType="submit" form='nueva_cita_admin' disabled={!enableCreate}>
                    Guardar
                </Button>
            ]}
        >
            <CreateCitaForm setIsModalOpen={props.setIsModalOpen} hospital={props.hospital} fecha_hora={props.fecha_hora} getCitasData={props.getCitasData} pacientesData={props.pacientesData} setEnableCreateCita={setEnableCreate} />

        </Modal>
    )
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