import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Input, Select, message, DatePicker, InputNumber } from 'antd';
import { getData, sendDataBody, updateData } from '../../resources';
// ADMIN CREATE INGRESO
export default function CreateBalance(props) {

    const isCreating = !props.balanceForEdit;

    const [pacientesData, setPacientesData] = useState([])
  

    const handleOk = () => { props.setIsModalOpen(false) };
    const handleCancel = () => { props.setIsModalOpen(false); props.setBalanceForEdit(null) };

    useEffect(() => {
        // console.log('receivd for edit nm', props.balanceForEdit)
        // console.log('receivd for edit nm', nombreDoctor)
        if (props.balanceForEdit && props.balanceForEdit.medico) {
            getPacientesData(props.balanceForEdit.medico)
        }

    }, [props.balanceForEdit])


    // Start of filtering patients to show in select
    const getPacientesData = (medico) => {
        // if (props.balanceForEdi) {
        getData(`mispacientes/${medico}`).then((rs) => {
            if (rs) {
                rs.forEach(patient => {
                    patient.value = patient._id; patient.label = patient.name;
                });
                console.log('Pacientes: ', rs)
                setPacientesData(rs)
            }
        })
        // }
    }
    // End of filtering patients to show in select

    // Form methods
    const onFinish = (values) => {
        // if (Object.keys(props.balanceForEdit).length === 0 || !props.balanceForEdit) {
        //     values.medico = props.medico;
        //     values.tipo = 'ingreso';
        //     values.fecha_hora = new Date();
        // }

        values.estado = 'pendiente';
        values.tipo = props.tipo;
        console.log('Ready to send:', values);
        console.log('For Edit: ', props.balanceForEdit);
        if (!props.balanceForEdit || Object.keys(props.balanceForEdit).length === 0) {
            sendDataBody(`balances/add`, values).then((rs) => { console.log(rs); message.success(rs.message || rs.error) }).finally(() => { props.getIngresos(); props.setIsModalOpen(false) })
        } else {
            updateData(`/balances/update/${props.balanceForEdit._id}`, values).then((rs) => {
                console.log(rs); props.setBalanceForEdit({}); props.getIngresos(); props.setIsModalOpen(false);
            })
        }
        
    };

    const onFinishFailed = (errorInfo) => { console.log('Failed:', errorInfo) };

    const handleDoctorChange = (value) => { getPacientesData(value) };

    // const EditingForm = () => {
    //     const { doctor: { name: nombreDoctor }, monto, forma_de_pago, fecha_hora, concepto } = props.balanceForEdit;

    // }

    return (
        <Modal title={props.balanceForEdit ? "Editar Estado" : 'Agregar Ingreso'} open={props.isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose
            footer={[
                <Button type="primary" htmlType="submit" form='edit_balance'>
                    Guardar
                </Button>,
                <Button onClick={handleCancel}>
                    Cancelar
                </Button>
            ]}>

            <Form
                name="edit_balance"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={props.balanceForEdit}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {
                    isCreating ? <div> <Form.Item label="Monto" name="monto" rules={[{ required: true, message: 'Ingresa el monto' }]} >
                        <Input />
                    </Form.Item>

                        <Form.Item label="Concepto" name="concepto" rules={[{ required: true, message: 'Ingresa el concepto' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Medico" name="medico" >
                            <Select options={props.medicosData} onChange={handleDoctorChange} />
                        </Form.Item>

                        <Form.Item label="Paciente" name="paciente" >
                            <Select options={pacientesData} />
                        </Form.Item>




                        <Form.Item
                            label="Fecha y Hora"
                            name="fecha_hora"
                            rules={[{ required: true, message: 'Selecciona Fecha y Hora' }]}
                        >
                            <DatePicker showTime format="DD-MM-YYYY HH:mm" />
                        </Form.Item></div> : <div></div>
                }

                <Form.Item label="abono" name="abono" rules={[{ required: true, message: 'Ingresa el abobo' }]} >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Forma de Pago" name="forma_de_pago" >
                    <Select
                        options={[
                            {
                                value: 'efectivo',
                                label: 'Efectivo',
                            },
                            {
                                value: 'tarjeta',
                                label: 'Tarjeta',
                            },
                            {
                                value: 'transferencia',
                                label: 'Transferencia',
                            },
                        ]}
                    />
                </Form.Item>



                {/* <Form.Item
                    label="Estado"
                    name="estado"
                    rules={[{ required: true, message: 'Selecciona el estado' }]}
                >
                    <Select
                        // onChange={handleDoctorChange}
                        options={[
                            {
                                value: 'pendiente',
                                label: 'Pendiente',
                            },
                            {
                                value: 'pagado',
                                label: 'Pagado',
                            },
                            {
                                value: 'pago parcial',
                                label: 'Pago parcial',
                            },
                        ]}
                    />
                </Form.Item> */}

            </Form>

        </Modal>
    )
}
