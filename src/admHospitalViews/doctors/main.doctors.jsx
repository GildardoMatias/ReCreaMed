import React from 'react'
import { Tabs } from 'antd'
import { TeamOutlined, UserAddOutlined } from '@ant-design/icons';
import Register from './register.doctor';
import Dash from './dash.doctors.main';

const items = [
    { key: '1', label: <><TeamOutlined /> Médicos</>, children: <Dash /> },
    { key: '2', label: <><UserAddOutlined /> Registrar Medico</>, children: <Register /> },
];
const onChange = (key) => { console.log(key) }

export default function Doctors() {
    return (
        <div>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} tabPosition='left' />
        </div>
    )
}
