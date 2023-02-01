import React from 'react'
import { Tabs } from 'antd'
import Register from './register.user';
import Dash from './dash.users'
import AssignPatients from './assign.patients';

export default function Users() {
    const items = [
        { label: 'Pacientes', key: 'item-1', children: <Dash /> },
        { label: 'Registrar', key: 'item-2', children: <Register /> },
        // { label: 'Asignar', key: 'item-3', children: <AssignPatients /> }, Non used since medico on register is required
    ];
    return (
        <div >
            <Tabs items={items} tabPosition='left' />
        </div>
    )
}


// Dash doctors, dash users, register user and assign user uses findMyDoctors