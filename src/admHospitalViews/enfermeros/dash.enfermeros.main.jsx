import React from 'react'
import { Tabs } from 'antd'
import { myHospitals } from '../../resources'
import HospitalTab from './dash.enfermeros.hospitalTab';

export default function Dash() {

    // Create items for TABS
    myHospitals.forEach(h => {
        h.label = h.nombre;
        h.key = h._id;
        h.children = <HospitalTab hospital={h.nombre} id_hospital={h._id} />
    });

    return (
        <div>
            <h4 className='spacedTitle'>Enfermeros de los diferentes hospitales</h4>
            <Tabs defaultActiveKey="1" items={myHospitals} />
        </div>
    )
}