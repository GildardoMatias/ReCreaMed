import React, { Component } from 'react'
import { Tabs } from 'antd'
import Register from './register.user';
import Dash from './dash.users'
import AssignPatients from './assign.patients';
export default function Users() {
    const items = [
        { label: 'Pacientes', key: 'item-1', children: <Dash /> },
        { label: 'Registrar', key: 'item-2', children: <Register /> },
        { label: 'Asignar', key: 'item-3', children: <AssignPatients/> },
    ];
    return (
        <div >
            <Tabs items={items} tabPosition='left' />
        </div>
    )
}
