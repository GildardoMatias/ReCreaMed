import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Modal, Form, Input, Select, Typography, message } from 'antd';
import { getData, sendDataBody, updateData, usuario, ids_hospitales } from '../../resources';
// ADMIN CREATE INGRESO
export default function CreateBalance(props) {
    const [pacientesData, setPacientesData] = useState([])

    const handleOk = () => { props.setIsModalOpen(false) };
    const handleCancel = () => { props.setIsModalOpen(false); props.setBalanceForEdit(null) };
    useEffect(() => {
        getPacientesData()
    }, [props.medico])

    // Start of filtering patients to show in select
    const getPacientesData = () => {
        if (props.medico) {

            getData(`mispacientes/${props.medico}`).then((rs) => {
                rs.forEach(patient => {
                    patient.value = patient._id; patient.label = patient.name;
                });
                console.log('Pacientes: ', rs)
                setPacientesData(rs)
            })
        } else { setPacientesData([]) }

    }
    // End of filtering patients to show in select

    // Form methods
    const onFinish = (values) => {
        if (Object.keys(props.balanceForEdit).length === 0 || !props.balanceForEdit) {
            values.medico = props.medico;
            values.tipo = 'ingreso';
            values.fecha_hora = new Date();
        }
        console.log('Ready to send:', values);
        console.log('For Edit: ', props.balanceForEdit);
        if (Object.keys(props.balanceForEdit).length === 0 || !props.balanceForEdit) {
            sendDataBody(`balances/add`, values).then((rs) => { console.log(rs); message.success(rs.message || rs.error) }).finally(() => {props.getBalancesData(props.medico); props.setIsModalOpen(false)})
        } else {
            updateData(`/balances/update/${props.balanceForEdit._id}`, values).then((rs) => {
                console.log(rs); props.setBalanceForEdit({}); props.setIsModalOpen(false);
            })
        }


    };

    const onFinishFailed = (errorInfo) => { console.log('Failed:', errorInfo) };

    const handleChange = (value) => { console.log(`selected ${value}`) };

    return (
        <Modal title={props.balanceForEdit ? "Editar Ingreso" : 'Agregar Ingreso'} open={props.isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose
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
                <Form.Item
                    label="Monto"
                    name="monto"
                    rules={[{ required: true, message: 'Ingresa el monto' }]}
                >
                    <Input />
                </Form.Item>
                {/* Start of modifications for independent ingrso */}
                <Form.Item
                    label="Concepto"
                    name="concepto"
                    rules={[{ required: true, message: 'Ingresa el concepto' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Paciente"
                    name="paciente"
                >
                    <Select
                        onChange={handleChange}
                        options={pacientesData}
                    />
                </Form.Item>
                {/* End of modifications for independent ingrso */}


                <Form.Item
                    label="Forma de Pago"
                    name="forma_de_pago"
                >
                    <Select
                        onChange={handleChange}
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
                <Form.Item
                    label="Estado"
                    name="estado"
                    rules={[{ required: true, message: 'Ingresa el monto' }]}
                >
                    <Select
                        onChange={handleChange}
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
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >

                </Form.Item>
            </Form>
        </Modal>
    )
}
