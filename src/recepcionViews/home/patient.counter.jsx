import React, { useEffect, useState } from 'react'
import { getData } from '../../resources'
import Loading from '../../loading'

export default function PatientCounter({medicsData}) {


    const MedicCard = ({ id_medico, name }) => {
        const [counter, setCounter] = useState(0)
        const [loading, setLoading] = useState(true)

        useEffect(() => {
            getData(`pacientes/count/${id_medico}`).then(rs => { setCounter(rs); setLoading(false) })
        }, [])

        if (loading) return <Loading />
        return <div style={{ backgroundColor: '#f5f5f5', width: 160, height: 120, borderRadius: 12, marginTop: 12, padding: 16 }}>
            <div style={{ color: '#515a6e', fontSize: 16 }}>{name}</div>
            <div style={{ color: '#515a6e', fontWeight: 600, fontSize: 20, fontFamily: 'Poppins' }}>{counter}</div>
        </div>

    }

    return <div>
        <span className='desc'>Pacientes por médico</span>
        
        <div style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
            {
                medicsData.map(({ _id, name }) => <MedicCard id_medico={_id} name={name} />)
            }
        </div>

    </div>

}