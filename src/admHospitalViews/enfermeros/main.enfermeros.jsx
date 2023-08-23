import React from 'react'
import { Tabs } from 'antd'
import { TeamOutlined, UserAddOutlined } from '@ant-design/icons';
import Register from './register.enfermero';
import Dash from './dash.enfermeros.main';
// import Horarios from "./horarios.receptionists";

const items = [
    { key: '1', label: <><TeamOutlined /> Enfermeros</>, children: <Dash /> },
    // { key: '2', label: <><TeamOutlined /> Horarios</>, children: <Horarios /> },
    { key: '3', label: <><UserAddOutlined /> Registrar</>, children: <Register /> },
];
const onChange = (key) => { console.log(key) }

export default function Enfermeros() {
    return (
        <div>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} tabPosition='left' />
        </div>
    )
}
