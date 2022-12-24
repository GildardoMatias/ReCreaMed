import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, Modal, Form, Input, Select } from 'antd';
import { getData, updateData, usuario } from '../../resources';


export default function Balances() {
    const [balancesData, setBalancesData] = useState([])
    const [balanceForEdit, setBalanceForEdit] = useState({})

    // Modal For Edit Balance
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true) };
    const handleOk = () => { setIsModalOpen(false) };
    const handleCancel = () => { setIsModalOpen(false) };

    useEffect(() => { getBalancesData() }, [])

    const getBalancesData = () => { getData(`balances/${usuario._id}`).then((rs) => setBalancesData(rs)) }

    const columns = [
        {
            title: 'Monto',
            dataIndex: 'monto',
            key: 'monto',
        },
        {
            title: 'Forma de pago',
            key: 'forma_de_pago',
            dataIndex: 'forma_de_pago',
            render: (_, { forma_de_pago }) => {
                let color = forma_de_pago === 'efectivo' ? 'geekblue' : 'green';
                return <Tag color={color} >{forma_de_pago.toUpperCase()}</Tag>
            },
        },
        {
            title: 'Estado',
            key: 'Estado',
            dataIndex: 'estado',
            render: (_, { estado }) => {

                let color = estado === 'pagado' ? 'geekblue' : 'green';
                if (estado === 'pendiente' || estado === 'sin pagar') color = 'volcano';

                return <Tag color={color}> {estado.toUpperCase()} </Tag>
            }

        },
        // {
        //     title: 'Cita',
        //     key: 'Cita',
        //     render: (_, record) => <a href='#'>Ir a la cita</a>
        // },
        {
            title: 'Editar',
            key: 'Editar',
            render: (_, record) => <Button onClick={() => { setBalanceForEdit(record); showModal() }}>Editar</Button>
        },
    ];

    // Form methods
    const onFinish = (values) => {
        console.log('Success:', values);
        console.log('For Edit: ', balanceForEdit);
        updateData(`/balances/update/${balanceForEdit._id}`, values).then((rs) => {
            console.log(rs); setBalanceForEdit({}); setIsModalOpen(false); getBalancesData()
        })
    };

    const onFinishFailed = (errorInfo) => { console.log('Failed:', errorInfo) };

    const handleChange = (value) => { console.log(`selected ${value}`) };

    return (
        <div className='mainContainer'>
            <Table columns={columns} dataSource={balancesData} />
            <div style={{ height: 200 }}></div>

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose
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
        </div >
    )
}
