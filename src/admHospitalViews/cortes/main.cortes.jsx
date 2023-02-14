import React from 'react'
import { Table, Button } from 'antd'

const columns = [
    {
        title: 'Fecha Inicio',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Fecha Finalizacion',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Total Movimientos',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Total Ingresos',
        dataIndex: 'addresss',
        key: 'address',
    }
];

const data = [
    {
        key: '1',
        name: '2022-10-21T00:00:00.00',
        age: '2022-10-21T00:00:00.00',
        address: '0',
        addresss: '$0',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: '2022-10-21T00:00:00.00',
        age: '2022-10-21T00:00:00.00',
        address: '0',
        addresss: '$0',
        tags: ['loser'],
    },
    {
        key: '3',
        name: '2022-10-21T00:00:00.00',
        age: '2022-10-21T00:00:00.00',
        address: '2',
        addresss: '$3200',
        tags: ['cool', 'teacher'],
    },
];

export default function Cortes() {
    return (
        <div className='mainContainer' >
            <h4>Cortes</h4>
            <Table columns={columns} dataSource={data} />
            <Button style={{ alignSelf: 'flex-end' }} type='primary'>Generar Corte</Button>
        </div>
    )
}