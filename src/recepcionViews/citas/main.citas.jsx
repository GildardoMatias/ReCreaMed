import React from 'react'
import { Tabs } from 'antd'
import { myHospitals } from '../../resources'
import HospitalTab from './hospital-tab.citas';

export default function Citas() {

    // Create items for TABS
    myHospitals.forEach(h => {
        h.label = h.nombre;
        h.key = h._id;
        h.children = <HospitalTab hospital={h.nombre} id_hospital={h._id} />
    });

    return (
        <div className='mainContainer'>
            <h5>Citas</h5>
            <Tabs defaultActiveKey="1" items={myHospitals} />
        </div>
    )
}
