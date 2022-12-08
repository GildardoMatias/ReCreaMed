import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button } from 'antd';
import { getData, usuario } from '../resources';


export default function Balances() {
    const [balancesData, setBalancesData] = useState([])
    
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
        {
            title: 'Cita',
            key: 'Cita',
            render: (_, record) => <a href='#'>Ir a la cita</a>
        },
        {
            title: 'Editar',
            key: 'Editar',
            render: (_, record) => <Button onClick={() => console.log(record)}>Editar</Button>
        },
    ];

    const editBalance = () => {
        
    }

    return (
        <div className='mainContainer'>
            <Table columns={columns} dataSource={balancesData} />
            <div style={{ height: 200 }}></div>
        </div>
    )
}
