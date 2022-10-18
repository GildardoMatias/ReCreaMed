import { Space, Table, Tag } from 'antd';
import React from 'react';
const columns = [
    {
        title: 'Paciente',
        dataIndex: 'Paciente',
        key: 'Paciente',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Pago',
        dataIndex: 'Pago',
        key: 'Pago',
    },
    {
        title: 'Forma de pago',
        key: 'FormaDePago',
        dataIndex: 'FormaDePago',
        render: (_, { FormaDePago }) => (
            <>
                {FormaDePago.map((tag) => {
                    let color = tag === 'efectivo' ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Estado',
        key: 'Estado',
        dataIndex: 'Estado',
        render: (_, { Estado }) => (
            <>
                {Estado.map((tag) => {
                    let color = tag === 'pagado' ? 'geekblue' : 'green';
                    if (tag === 'sin pagar') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Cita',
        key: 'Cita',
        render: (_, record) => (
            <Space size="middle">
                {/* <a>Invite {record.name}</a> */}
                <a href='#'>Ir a la cita</a>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        Paciente: 'Jorge Suarez',
        Pago: 32,
        FormaDePago: ['efectivo'],
        Estado: ['pagado'],
    },
    {
        key: '2',
        Paciente: 'Jorge Suarez',
        Pago: 42,
        FormaDePago: ['tarjeta'],
        Estado: ['por liberar'],
    },
    {
        key: '3',
        Paciente: 'Ignacio Lopez',
        Pago: 32,
        FormaDePago: ['efectivo'],
        Estado: ['pagado'],
    },
    {
        key: '4',
        Paciente: 'Jorge Suarez',
        Pago: 32,
        FormaDePago: ['tarjeta'],
        Estado: ['sin pagar'],
    },
];
export default function Balances() {
    return (
        <div className='mainContainer'>
            <Table columns={columns} dataSource={data} />
            <div style={{ height: 200 }}></div>
        </div>
    )
}
