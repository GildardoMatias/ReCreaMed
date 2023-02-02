import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import { myHospitals, getData } from '../../resources'

export default function Citas() {

    // Create items for TABS
    myHospitals.forEach(h => {
        h.label = h.nombre;
        h.key = h._id;
        h.children = <HospitalTab hospital={h.nombre} id_hospital={h._id} />
    });

    // Create children item for each tab, inside tabs, goes the list of doctors
    function HospitalTab(props) {
        const [citasData, setCitasData] = useState([])
        const [loading, setLoading] = useState(true)

        useEffect(() => {
            getCitasData()
        }, [])

        const getCitasData = () => {
            getData(`citas/sucursal/${props.id_hospital}`).then((rs) => setCitasData(rs)).finally(() => setLoading(false))
        }
        return loading ? <p>Cargando...</p> : <div>
            <h6>Citas del hospital {props.hospital}</h6>
            {citasData.map((c)=><p key={c._id}>{c.comentarios} {c.sucursal.nombre} -</p>)}
        </div>
    }

    return (
        <div className='mainContainer'>
            <h5>Citas</h5>
            <Tabs defaultActiveKey="1" items={myHospitals} />
        </div>
    )
}
