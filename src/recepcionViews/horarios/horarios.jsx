import { Table } from 'antd';
import React from 'react'

const dataSource = [
    {
        key: '1',
        name: '25/04/2023',
        age: '8:00',
        address: '16:00',
    },
    {
        key: '1',
        name: '25/04/2023',
        age: '8:00',
        address: '16:00',
    },
    {
        key: '1',
        name: '25/04/2023',
        age: '8:00',
        address: '16:00',
    }
];

const columns = [
    {
        title: 'Fecha',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Hora de entrada',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Hora de salida',
        dataIndex: 'address',
        key: 'address',
    },
];

export default function Horarios() {
    return (
        <div className='mainContainer'>
            <h4>Horarios de: 6334b651YNSDFN739FJNKSJD </h4>

            <Table dataSource={dataSource} columns={columns} />
            <div style={{height: 200}}></div>
        </div>

    )
}
