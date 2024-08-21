import React, { useEffect, useState } from 'react'
import { getData, ids_hospitales, sendDataBody } from '../../resources'

export default function StatisticCard({ left_color, label, id, idmeds }) {

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
        
    }, [idmeds])

    const getPacientesData = async () => {
        sendDataBody('pacientes/medicos/dates/count', { medicos: idmeds, date: new Date() }).then(rs => setCounterData(rs))
    }

    const getIngresosToday = async () => {
        sendDataBody('balances/today', { medico: idmeds, tipo: "ingreso", }).then(rs => {
            console.log('bal hoy ', rs)
            let ammount = 0;
            rs.forEach(ing => {
                ammount += ing['abono'];
            });
            setCounterData(ammount)
        })
    }

    const getIngresosYesterday = async () => {
        sendDataBody('balances/yesterday', { medico: idmeds, tipo: "ingreso", }).then(rs => {
           
            let ammount = 0;
            rs.forEach(ing => {
                ammount += ing['abono'];
            });
            setCounterData(ammount)
        })
    }

    const getCitasToday = () => {
        getData(`citas/sucursal/today/${ids_hospitales[0]}`).then(rs => { console.log('citas ', rs); setCounterData(rs.length) })
    }

    return <div style={{ width: 240, height: 90, borderRadius: 12, marginTop: 12, display: 'flex', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)' }}>
        <div style={{ width: 12, backgroundColor: left_color, borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}></div>
        <div style={{ padding: 12, width: 228 }}>
            <div style={{fontFamily: 'Poppins'}}>
                {label}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' , fontFamily: 'Poppins', fontSize: 18, fontWeight: 500}}>{counterData}</div>
        </div>
    </div>
}