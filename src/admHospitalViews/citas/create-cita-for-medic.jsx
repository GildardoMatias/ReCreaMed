import React, { useState, useEffect } from 'react'
import { Modal, Form, Select, Input, Button, message, Switch, DatePicker } from 'antd'
import { sendDataBody, updateData } from '../../resources';



export function CreateCitaForm(props) {
    // const [medicosLoading, setMedicosLoading] = useState(true)
    const [medicos, setMedicos] = useState([])//Set Medicos for select
    // Body of cita
    const [isOnline, setIsOnline] = useState(false)

    useEffect(() => {
        console.log('Received Patas', props.pacientesData)
        if (props.cita && props.cita.usuario) handlePatientChange(props.cita.usuario)
    }, [])


    // Form Methods
    const onFinish = (values) => {
        values.sucursal = props.hospital;
        // Handle if its updating or creating cita
        if (props.cita) {
            updateData(`citas/update/${props.cita._id}`, values).then((response) => {
                // message.success(response.message || response.error);
                props.setIsModalOpen(false);
                props.setEditingCita(false);
            }).finally(() => { props.getCitasData(); })
        } else {
            sendDataBody('citas/add', values).then((response) => {
                message.success(response.message || response.error);
                // createBalance(response.id_nueva_cita, monto)
            }).finally(() => { props.getCitasData(); props.setIsModalOpen(false) })
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handlePatientChange = (value) => {
        console.log('Entering search', value)
        console.log('PatsAta', props.pacientesData)
        const found = props.pacientesData.find((p) => p._id === value);
        if (found) {
            let { medicos_asignados } = found
            medicos_asignados.forEach((m) => { m.label = m.name; m.value = m._id });
            console.log('Found', found)
            console.log('meds', medicos_asignados)
            setMedicos(medicos_asignados);
            // setMedicosLoading(false)
        } else {
            console.log('Paciente no encontrado')
        }
    };
    const onSearchPatient = (value) => { };

    const onSwitch = (checked) => {
        setIsOnline(checked)
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

        <Form.Item label="Paciente" name="usuario" rules={[{ required: true, message: 'Selecciona Usuario' }]} >
            <Select options={props.pacientesData} onChange={handlePatientChange} optionFilterProp="children" onSearch={onSearchPatient} showSearch
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())} />
        </Form.Item>

        <Form.Item label="Medico" name="medico" rules={[{ required: true, message: 'Selecciona Medico' }]} >
            <Select options={medicos} />
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
            <CreateCitaForm setIsModalOpen={props.setIsModalOpen} hospital={props.hospital} fecha_hora={props.fecha_hora} getCitasData={props.getCitasData} pacientesData={props.pacientesData} />

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