import React from 'react'
import { Table } from 'antd'

export default function SintomatologiaResults() {

    const dataSource = [
        {
            key: '1',
            name: '625706dc9a6437369f835bd5',
            score: 20,
        },
        {
            key: '1',
            name: '62fd9367578d2b4669e0e0aa',
            score: 7,
        },
        {
            key: '1',
            name: '62fd9982578d2b4669e0e18b',
            score: 14,
        },
        {
            key: '1',
            name: '630398a0bd637f93fb6fb0fe',
            score: 22,
        },
        {
            key: '1',
            name: '63039acabd637f93fb6fb11b',
            score: 18,
        },
    ];

    const columns = [
        {
            title: 'Paciente',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Puntaje',
            dataIndex: 'score',
            key: 'age',
        }
    ];

    return (
        <div className='mainContainer'>
            <h4>Resultados de encuestas de sintomatologia depresiva</h4>
            <br />
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}
