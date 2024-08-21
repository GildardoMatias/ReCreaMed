import React, { useEffect, useState } from 'react'
import { Row } from 'antd'
import RoleCard from './role.card'
import StatisticCard from './statistic.card'
import PatientCounter from './patient.counter'
import Services from './services'
import Ingresos from './ingresos'
import Gastos from './gastos'
import { getData, ids_hospitales, myHospitals, usuario } from '../../resources'

export default function Home() {

    const [medicsData, setMedicsData] = useState([])

    useEffect(() => {
        const getMedics = async () => {
            const meds = await getData(`users/hospital/${ids_hospitales[0]}`)
            setMedicsData(meds)
        }
        getMedics()
    }, [])

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: 20 }}>


            <div style={{ width: '70%' }}>


                <div style={{ display: 'flex' }}>
                    <img width={120} src={'https://api.recreamed.com/images/' + myHospitals[0]['logo']} alt="Logo" />
                    <div style={{ marginLeft: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <span className='nombre'>{myHospitals[0]['nombre']}</span>
                        <span className='datos'>{usuario.rol}</span>
                    </div>
                </div>
                <br />
                <br />

                <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* <Row style={{ display: 'flex', flexDirection: 'row', gap: 30 }}> */}

                    <RoleCard color='#71357b' rol='medicos' />

                    <RoleCard color='#95d0d4' rol='pacientes' />

                    <RoleCard color='#fe7e51' rol='enfermeros' />

                    <RoleCard color='#fe7e51' rol='recepcionistas' />

                </Row>


                <br />
                <br />


                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <div style={{ width: '28%' }}>
                        <span className='desc'>Estadisticas de hoy</span>

                        <StatisticCard id='ct' label='Citas hoy' left_color='#0d6efd' idmeds={medicsData} />

                        <StatisticCard id='pt' label='Pacientes registrados hoy' left_color='#FF6B6B' idmeds={medicsData} />

                        {/* <StatisticCard id='it' label='Ingresos hoy' left_color='#6a3873' idmeds={medicsData} /> */}

                        {/* <StatisticCard id='iy' label='Ingresos ayer' left_color='#91cdcd' idmeds={medicsData} /> */}

                    </div>


                    <div style={{ width: '70%' }}>

                        <PatientCounter medicsData={medicsData} />

                        <Services medicosData={medicsData} />

                        {/* <Ingresos idmeds={medicsData} /> */}

                        {/* <Gastos /> */}


                    </div>

                </div>
                <br />
            </div>
        </div >
    )
}