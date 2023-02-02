import React from 'react'
import { Tabs } from 'antd'
import Register from './register.user';
import Dash from './dash.patients.main'

export default function Users() {
    const items = [
        { label: 'Pacientes', key: 'item-1', children: <Dash /> },
        { label: 'Registrar', key: 'item-2', children: <Register /> },
    ];
    return (
        <div >
            <Tabs items={items} tabPosition='left' />
        </div>
    )
}