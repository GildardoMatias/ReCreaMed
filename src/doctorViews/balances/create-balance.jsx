import { useState, useEffect } from 'react'
import { Button, Modal, Form, Input, Select, InputNumber, message } from 'antd';
import { getData, sendDataBody, updateData, usuario } from '../../resources';
// DOCTOR CREATE BALANCE
export default function CreateBalance(props) {

    const [pacientesData, setPacientesData] = useState({})
    const handleOk = () => { props.setIsModalOpen(false) };
    const handleCancel = () => { props.setIsModalOpen(false); props.setBalanceForEdit(null) };

    useEffect(() => {
        console.log('received for edit ', props.balanceForEdit)
        return getPacientesData()
    }, [])
    useEffect(() => {
        console.log('received for edit ', props.balanceForEdit)
    }, [props.balanceForEdit])

    const getPacientesData = () => {
        getData(`mispacientes/${usuario._id}`).then((rs) => {
            rs.forEach(p => { p.label = p.name; p.value = p._id; });
            setPacientesData(rs);
        })
    }

    // Form methods
    const onFinish = (values) => {

        if (!props.balanceForEdit || Object.keys(props.balanceForEdit).length === 0) {
            values.medico = usuario._id
            values.fecha_hora = new Date();
            values.tipo = props.tipo;
            values.estado = 'pendiente'
        }


        console.log('Ready to send:', values);
        console.log('For Edit: ', props.balanceForEdit);

        (props.balanceForEdit && Object.keys(props.balanceForEdit).length > 0) ?
            updateData(`/balances/update/${props.balanceForEdit._id}`, values).then((rs) => {
                console.log(rs); props.setBalanceForEdit({}); props.setIsModalOpen(false); props.getBalancesData()
            })
            :
            sendDataBody(`balances/add`, values)
                .then((rs) => { console.log(rs); message.success(rs.message || rs.error) })
                .finally(() => {
                    props.setBalanceForEdit({}); props.setIsModalOpen(false); props.getBalancesData()
                })
    };

    const onFinishFailed = (errorInfo) => { console.log('Failed:', errorInfo) };

    const handleChange = (value) => { console.log(`selected ${value}`) };

    return (
        <Modal title={props.balanceForEdit ? `Editar ${props.tipo}` : `Agregar ${props.tipo}`} open={props.isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose
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
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Abono"
                     name="abono"
                    rules={[{ required: true, message: 'Ingresa el abono' }]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                {
                    // Para el caso que sea un ingreso sin cita
                    (!props.balanceForEdit || Object.keys(props.balanceForEdit).length === 0) && <div>
                        <Form.Item
                            label="Concepto"
                            name="concepto"
                            rules={[{ required: true, message: 'Ingresa el concepto' }]}
                        >
                            <Input />
                        </Form.Item>

                        {
                            props.tipo === 'ingreso' && <Form.Item
                                label="Paciente"
                                name="paciente"
                            >
                                <Select
                                    onChange={handleChange}
                                    options={pacientesData}
                                />
                            </Form.Item>
                        }

                    </div>
                }

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

                {/* <Form.Item
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
                </Form.Item> */}

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
