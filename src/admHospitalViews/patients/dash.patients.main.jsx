import React, { useEffect, useState } from 'react'
import { myHospitals, getData, deleteData, ids_hospitales } from '../../resources'
import { Table, Tabs, Avatar, Space, Button, Popconfirm, Modal, Card } from 'antd'
import { UserOutlined, EditOutlined } from '@ant-design/icons'
import Register from './register.user'
import HospitalTab from './dash.patients.hospitalTab'


const onChange = (key) => { console.log(key) }

export default function Dash() {

    // Create items for TABS
    myHospitals.forEach(h => {
        h.label = h.nombre;
        h.key = h._id;
        h.children = <HospitalTab hospital={h.nombre} id_hospital={h._id} />
    });

    return (
        <div className='mainContainer'>

            <Tabs defaultActiveKey="1" items={myHospitals} onChange={onChange} />

        </div>
    )
}
