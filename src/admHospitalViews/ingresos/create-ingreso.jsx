import React from 'react'
import { Table, Tag, Button, Modal, Form, Input, Select, Typography, message } from 'antd';
import { getData, sendDataBody, updateData, usuario } from '../../resources';

export default function CreateBalance(props) {
    const handleOk = () => { props.setIsModalOpen(false) };
    const handleCancel = () => { props.setIsModalOpen(false); props.setBalanceForEdit(null) };

    // Form methods
    const onFinish = (values) => {
        if (!props.balanceForEdit){
            values.medico = usuario._id
        } 
        console.log('Success:', values);
        console.log('For Edit: ', props.balanceForEdit);
        props.balanceForEdit ?
            updateData(`/balances/update/${props.balanceForEdit._id}`, values).then((rs) => {
                console.log(rs); props.setBalanceForEdit({}); props.setIsModalOpen(false);
            })
            :
            sendDataBody(`balances/add`, values).then((rs) => message.success(rs.message || rs.error)).finally(() => props.getBalancesData())
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
