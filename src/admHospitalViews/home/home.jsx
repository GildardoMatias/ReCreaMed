import React from 'react'
import { Row } from 'antd'
import RoleCard from './role.card'
import StatisticCard from './statistic.card'
import PatientCounter from './patient.counter'
import Services from './services'
import Ingresos from './ingresos'
import Gastos from './gastos'

export default function Home() {
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: 20 }}>


            <div style={{ width: '50%' }}>
                <br />
                <span className='nombre'>Administrador</span>
                <br />
                <span className='datos'>Hospital</span>

                <br />
                <br />

                <Row style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <RoleCard color='#71357b' rol='medicos' />

                    <RoleCard color='#95d0d4' rol='pacientes' />

                    <RoleCard color='#fe7e51' rol='enfermeros' />

                </Row>


                <br />
                <br />


                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <div style={{ width: '38%' }}>
                        <span className='desc'>Estadisticas de hoy</span>

                        <StatisticCard id='pt' label='Pacientes registrados hoy' left_color='#FF6B6B' />

                        <StatisticCard id='it' label='Ingresos hoy' left_color='#6a3873' />

                        <StatisticCard id='iy' label='Ingresos ayer' left_color='#91cdcd' />

                        <StatisticCard id='ct' label='Citas hoy' left_color='#0d6efd' />

                    </div>


                    <div style={{ width: '58%' }}>

                        <PatientCounter />

                        <Services />

                        <Ingresos />

                        <Gastos />


                    </div>

                </div>
            </div>
        </div >
    )
}