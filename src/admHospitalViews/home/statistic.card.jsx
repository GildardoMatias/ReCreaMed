import React, { useEffect, useState } from 'react'
import { getData, ids_hospitales, sendDataBody } from '../../resources'

export default function StatisticCard({ left_color, label, id }) {

    const [counterData, setCounterData] = useState(0)

    useEffect(() => {
        switch (id) {
            case 'pt':
                getPacientesData()
                break;
            case 'it':
                getIngresosToday()
                break;
            case 'iy':
                getIngresosYesterday()
                break;
            case 'ct':
                getCitasToday()
                break;
            default:
                break;
        }
    }, [])

    const getPacientesData = async () => {

        const meds = await getData(`users/hospital/${ids_hospitales[0]}`)

        const idmeds = meds.map(doc => { return doc._id })

        sendDataBody('pacientes/medicos/dates/count', { medicos: idmeds, date: new Date() }).then(rs => setCounterData(rs))
    }

    const getIngresosToday = async () => {
        const meds = await getData(`users/hospital/${ids_hospitales[0]}`)

        const idmeds = meds.map(doc => { return doc._id })

        sendDataBody('balances/today', { medico: idmeds, tipo: "ingreso", }).then(rs => {
            console.log('bal hoy ',rs)
            let ammount = 0;
            rs.forEach(ing => {
                ammount += ing['abono'];
            });
            setCounterData(ammount)
        })
    }

    const getIngresosYesterday = async () => {
        const meds = await getData(`users/hospital/${ids_hospitales[0]}`)

        const idmeds = meds.map(doc => { return doc._id })

        sendDataBody('balances/yesterday', { medico: idmeds, tipo: "ingreso", }).then(rs => {
            console.log('idmeds ayer ',idmeds)
            console.log('bal ayer ',rs)
            let ammount = 0;
            rs.forEach(ing => {
                ammount += ing['abono'];
            });
            setCounterData(ammount)
        })
    }

    const getCitasToday = () => {
        getData(`citas/sucursal/today/${ids_hospitales[0]}`).then(rs => { console.log('citas ',rs); setCounterData(rs.length) })
    }

    return <div style={{ width: 240, height: 80, borderRadius: 12, marginTop: 12, display: 'flex', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)' }}>
        <div style={{ width: 12, backgroundColor: left_color, borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}></div>
        <div style={{ padding: 12, width: 228 }}>
            <div>
                {label}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{counterData}</div>
        </div>
    </div>
}