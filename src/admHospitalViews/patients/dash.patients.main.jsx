import React from 'react'
import { myHospitals } from '../../resources'
import {  Tabs } from 'antd'
import HospitalTab from './dash.patients.hospital-tab'


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
