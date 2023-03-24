import React, { useState, useEffect } from 'react'
import { Modal, Form, Select, Input, Button, message, Switch } from 'antd'
import { getData, myHospitals, sendDataBody, updateData, usuario } from '../../resources';

export function CreateCitaForm(props) {




    myHospitals.forEach(h => { h.value = h._id; h.label = h.nombre; });

    const [medicosData, setMedicosData] = useState([])
    // Select patient for cerate cita
    const [misPacientes, setMisPacientes] = useState([])
   

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
        // if (values.tratamiento === 'Sin servicio') values.tratamiento = 0;
        values.fecha_hora = props.fecha_hora;
        values.medico = usuario._id;
        const { configuracion } = usuario;
        const { costo_cita } = configuracion;

        const monto = costo_cita ? costo_cita + values.tratamiento : values.tratamiento

        delete values.tratamiento;
        console.log(values)
        console.log('Monto: ', monto)

        // Handle if its updating or creating cita
        // if (props.cita) {
        //     updateData(`citas/update/${props.cita._id}`, values).then((response) => {
        //         console.log(response)
        //     }).finally(() => { props.getCitasData(); props.setIsModalOpen(false) })
        // } else {
        //     sendDataBody('citas/add', values).then((response) => {
        //         message.success(response.message || response.error);
        //         // createBalance(response.id_nueva_cita, monto)
        //         console.log(response)
        //     }).finally(() => { props.getCitasData(); props.setIsModalOpen(false) })
        // }


    };
    // Create the respective balance for cita
    // const createBalance = (_cita, monto) => {
    //     const balanceBody = {
    //         tipo: 'ingreso',
    //         medico: usuario._id,
    //         cita: _cita,
    //         monto: monto,
    //         forma_de_pago: 'efectivo',
    //         fecha_hora: props.fecha_hora,
    //         estado: 'pendiente',
    //     }
    //     console.log('Balance ready to send: ', balanceBody)
    //     sendDataBody('balances/add', balanceBody).then((rs) => console.log(rs))
    // }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleHospitalChange = (value) => { console.log('Selected Hospital: ', value); setHospital(value) };
    const handlePacienteChange = (value) => { console.log('Selected Hospital: ', value); };

    // Select tratamiento
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSwitch = (checked) => {
        console.log(`switch to ${checked}`);
        setIsOnline(checked)
    };
    return <Form name="nueva_cita_admin" labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off"
        initialValues={props.cita ? props.cita : { tratamiento: 'Sin servicio' }}
    >
        <Form.Item label="Hospital" name="sucursal" rules={[{ required: true, message: 'Selecciona Sucursal' }]} >
            <Select options={myHospitals} onChange={handleHospitalChange} />
        </Form.Item>

        <Form.Item label="Paciente" name="usuario" rules={[{ required: true, message: 'Selecciona Usuario' }]} >
            <Select options={misPacientes} onChange={handlePacienteChange} />
        </Form.Item>

        <Form.Item label="Servicio" name="tratamiento" rules={[{ required: false, message: 'Selecciona un servicio' }]} >
            <Select
                onChange={handleChange}
                options={
                    usuario.configuracion.tratamientos_ofrecidos.map((t) => { return { value: t.tratamiento, label: t.tratamiento } })
                }
            />
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
        <Modal title={props.cita ? "Editar Cita" : "Nueva Cita"} open={props.isOpenModal} onOk={handCreateleOk} onCancel={handCreateleCancel} destroyOnClose
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
