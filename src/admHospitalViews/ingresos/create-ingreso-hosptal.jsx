import React from 'react'
import { Button, Modal, Form, Input, Select, message, DatePicker, InputNumber } from 'antd';
import { sendDataBody, updateData } from '../../resources';
// ADMIN CREATE INGRESO
export default function CreateBalanceHosptal({id_hospital, tipo, balanceForEdit, setBalanceForEdit, setIsModalOpen, isModalOpen, getIngresos}) {

    const isCreating = !balanceForEdit || Object.keys(balanceForEdit).length === 0;


    const handleOk = () => { setIsModalOpen(false) };
    const handleCancel = () => {
        setIsModalOpen(false);
        // setBalanceForEdit(null) 
    };



    // Form methods
    const onFinish = (values) => {

        values.tipo = tipo;
        values.sucursal = id_hospital;
        values.estado = 'pendiente'
        console.log('Ready to send:', values);
        console.log('For Edit: ', balanceForEdit);
        if (isCreating) {
            sendDataBody(`balances/add`, values).then((rs) => { console.log(rs); message.success(rs.message || rs.error) }).finally(() => { getIngresos(); setIsModalOpen(false) })
        } else {
            updateData(`/balances/update/${balanceForEdit._id}`, values).then((rs) => {
                getIngresos();
                // setBalanceForEdit({}); 
                setIsModalOpen(false);
            })
        }
    };

    const onFinishFailed = (errorInfo) => { console.log('Failed:', errorInfo) };

    return (
        <Modal title={`Agergar ${tipo} del hospital`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose
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
                initialValues={balanceForEdit}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item label="Monto" name="monto" rules={[{ required: true, message: 'Ingresa el monto' }]} >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="abono" name="abono" rules={[{ required: true, message: 'Ingresa el abobo' }]} >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Forma de Pago" name="forma_de_pago" >
                    <Select
                        // onChange={handleDoctorChange}
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
                    rules={[{ required: true, message: 'Ingresa el monto' }]}
                >
                    <Select options={[
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


                <Form.Item
                    label="Concepto"
                    name="concepto"
                    rules={[{ required: true, message: 'Ingresa el concepto' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="Fecha y Hora"
                    name="fecha_hora"
                    rules={[{ required: true, message: 'Selecciona Fecha y Hora' }]}
                >
                    <DatePicker showTime format="DD-MM-YYYY HH:mm" />
                </Form.Item>

            </Form>
        </Modal>
    )
}
