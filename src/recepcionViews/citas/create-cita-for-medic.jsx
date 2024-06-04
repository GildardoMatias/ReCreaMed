import React, { useState, useEffect } from 'react'
import { Modal, Form, Select, Input, Button, message, Switch, DatePicker } from 'antd'
import { sendDataBody, updateData, ids_hospitales } from '../../resources';

// admin and receipt shares create-cita, hospital-tab.citas and create-cita-for-medic
// ONLY RECEIPT CANT DELETE, SO, FIRST EDIT RECEIPTIONIST
// Last time, edited first admin

export function CreateCitaForm(props) {

    const isCreating = !props.cita || Object.keys(props.cita).length === 0;

    // const [medicosLoading, setMedicosLoading] = useState(true)
    const [medicos, setMedicos] = useState([])//Set Medicos for select
    // const [medicosData, setMedicosData] = useState([]) // List of all Medicos
    const [servicios, setServicios] = useState([])

    const [errorMessage, setErrorMessage] = useState("")
    const [enableCreateCita, setEnableCreateCita] = useState(true)
    // Body of cita
    const [isOnline, setIsOnline] = useState(false)
    const [costo, setCosto] = useState(0)

    const [costoBaseCita, setCostoBaseCita] = useState(0)
    const [usesCostoBase, setUsesCostoBase] = useState(false)


    useEffect(() => {
        // getDoctorsData()
        console.log('Received Cita for edit', props.cita)
        if (props.cita && props.cita.usuario) {
            handlePatientChange(props.cita.usuario)

            handleMedicochange(props.cita.medico)
        }
    }, [])

    useEffect(() => {
        if (props.cita && props.cita.medico) handleMedicochange(props.cita.medico)
    }, [medicos])




    // Form Methods
    const onFinish = (values) => {
        const tipo_pago = values.tipo_pago;
        values.sucursal = props.hospital;
        delete values.tratamiento;
        values.id_servicio = values.servicio.key;
        values.servicio = values.servicio.label;
        delete values.tipo_pago;

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
                // createBalance(response.id_nueva_cita, values.medico, values.fecha_hora, tipo_pago, values.servicio)
            }).finally(() => { props.getCitasData(); props.setIsModalOpen(false) })
        }
    }

    const createBalance = (_cita, medico, _fecha_hora, tipo_pago, _concepto) => {
        const balanceBody = {
            tipo: 'ingreso',
            medico: medico,
            cita: _cita,
            monto: costo,
            forma_de_pago: tipo_pago,
            fecha_hora: _fecha_hora,
            estado: 'pendiente',
            concepto: _concepto
        }
        console.log('Balance ready to send: ', balanceBody)
        sendDataBody('balances/add', balanceBody).then((rs) => { message.success(rs.message || rs.error); console.log(rs) })
    }


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handlePatientChange = (value) => {
        const found = props.pacientesData.find((p) => p._id === value);
        if (found) {
            setEnableCreateCita(true)
            let { medicos_asignados } = found
            medicos_asignados.forEach((m) => {
                m.label = m.name; m.value = m._id
            });

            console.log('Found', found)
            console.log('meds', medicos_asignados)
            setMedicos(medicos_asignados);

        } else {
            setEnableCreateCita(false)
            setErrorMessage("Usuario no encontrado")
        }
    };

    const onSearchPatient = (value) => { };

    const handleMedicochange = (_id) => {
        console.log('selected', _id)
        console.log('all medics handle med chang', medicos)
        // Populate the "servicio" select
        if (medicos.length > 0) {
            let found = medicos.find((m) => m._id === _id)
            if (found && found.configuracion.tratamientos_ofrecidos) {
                setErrorMessage("")
                setEnableCreateCita(true)
                if (props.enableCreateCita) props.setEditingCita(false)
                let { configuracion: { tratamientos_ofrecidos } } = found;
                console.log("found tr", tratamientos_ofrecidos)
                tratamientos_ofrecidos.forEach(t => {
                    t.key = t._id; t.label = `${t.tratamiento} - $${t.costo} - ${t.observaciones ?? ""}`; t.value = t.costo + "-" + t._id; t.title = t.tratamiento; 
                });
                const { configuracion: { costo_cita = 0 } } = found;
                setCostoBaseCita(costo_cita)
                setServicios(tratamientos_ofrecidos)
            }
            else {
                setEnableCreateCita(false);
                setErrorMessage("No se puede crear la cita para este médico, no cuenta con servicios")
                if (props.enableCreateCita) props.enableCreateCita(false)
            }
            //   

        }
    }

    const onSwitch = (checked) => {
        setIsOnline(checked)
    };

    // Handle change for select servicio
    const handleServicioChange = (selected) => {
        var cobro = selected.value.split("-")[0];
        setCosto(cobro)
        console.log(`selected service`, selected);
        console.log(`selected cobro`, cobro);
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
        { label: 'Cuatro Horas', value: 210 },
        { label: 'Cuatro Horas y Media', value: 240 },
        { label: 'Cinco Horas', value: 270 },
        { label: 'Cinco Horas y Media', value: 300 },
    ]

    const paymentOptions = [
        { value: 'efectivo', label: 'Efectivo' },
        { value: 'tarjeta', label: 'Tarjeta' },
        { value: 'transferencia', label: 'Transferencia' },
    ]

    return <Form name="nueva_cita_admin" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off"
        initialValues={props.cita ? props.cita : { isOnline: false, tratamiento: 'Sin servicio', fecha_hora: props.fecha_hora, duracion: 60 }}>

        <div>{errorMessage}</div>

        <Form.Item label="Paciente" name="usuario" rules={[{ required: true, message: 'Selecciona Usuario' }]} >
            <Select options={props.pacientesData} onChange={handlePatientChange} optionFilterProp="children" onSearch={onSearchPatient} showSearch
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())} />
        </Form.Item>

        <Form.Item label="Medico" name="medico" rules={[{ required: true, message: 'Selecciona Medico' }]} >
            <Select options={medicos} onChange={handleMedicochange} />
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

        <Form.Item label="Servicio" name="servicio" rules={[{ required: true, message: 'Selecciona Medico' }]} >
            <Select options={servicios} onChange={handleServicioChange} labelInValue />
        </Form.Item>

        {/* {
            isCreating && <div>

                <Form.Item label="Tipo de pago" name="tipo_pago" rules={[{ required: true, message: 'Selecciona tipo de pago' }]} >
                    <Select options={paymentOptions} />
                </Form.Item>

                <Form.Item label={`costo de la cita $${costoBaseCita}`} >
                    <Switch onChange={onSwitchCosoBase} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <div className='fila'>
                        <h6>Costo Total: ${usesCostoBase ? (costo + costoBaseCita) : costo} </h6>
                    </div>
                </Form.Item>

            </div>
        } */}

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
        <Modal title="Nueva Cita" open={props.isOpenModal} onOk={handCreateleOk} onCancel={handCreateleCancel} destroyOnClose width={600}
            footer={[
                <Button onClick={handCreateleCancel}>Cancelar</Button>,
                <Button type="primary" htmlType="submit" form='nueva_cita_admin' disabled={!enableCreate}>
                    Guardar
                </Button>
            ]}
        >
            {/* <CreateCitaForm setIsModalOpen={props.setIsModalOpen} hospital={props.hospital} fecha_hora={props.fecha_hora} getCitasData={props.getCitasData} pacientesData={props.pacientesData} setEnableCreateCita={setEnableCreate} /> */}
            <CreateCitaForm {...props} />

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