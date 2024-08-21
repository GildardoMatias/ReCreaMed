import React, { useEffect, useState } from 'react'
import { sendDataBody } from '../../resources'

export default function Ingresos({ idmeds }) {
    const [monthData, setMonthData] = useState(0)
    const [weekData, setweekData] = useState(0)

    useEffect(() => {
        getIngresosMonth()
        getIngresosWeek()
    }, [idmeds])

    const getIngresosMonth = () => {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

        const body = {
            medico: idmeds,
            tipo: 'ingreso',
            fecha_inicio: firstDayOfMonth,
            fecha_final: lastDayOfMonth
        }
        console.log(body)
        // Actually will get the balances of medicos of hospital instead of balances of hospital
        sendDataBody('balances/dates', body).then(rs => {
            console.log('BALS', rs)
            let ammount = 0;
            if (rs.length > 0) {
                rs.forEach(ing => {
                    ammount += ing['abono']
                });
            }
            setMonthData(ammount);
        })
    }
    const getIngresosWeek = () => {
        const now = new Date();
        const firstDayOfWeek = new Date(now);
        firstDayOfWeek.setDate(now.getDate() - now.getDay());
        firstDayOfWeek.setHours(0, 0, 0, 0);
        const lastDayOfWeek = new Date(now);
        lastDayOfWeek.setDate(now.getDate() + (6 - now.getDay()));
        lastDayOfWeek.setHours(23, 59, 59, 999);

        const body = {
            medico: idmeds,
            tipo: 'ingreso',
            fecha_inicio: firstDayOfWeek,
            fecha_final: lastDayOfWeek
        }
        console.log(body)
        // Actually will get the balances of medicos of hospital instead of balances of hospital
        sendDataBody('balances/dates', body).then(rs => {
            console.log('BALS', rs)
            let ammount = 0;
            if (rs.length > 0) {
                rs.forEach(ing => {
                    ammount += ing['abono']
                });
            }
            setweekData(ammount);
        })
    }

    return <div>
        <div className='desc' style={{marginTop: 12}}>Ingresos</div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
            <div style={{ backgroundColor: '#f5f5f5', width: 120, height: 120, borderRadius: 12, marginTop: 12, padding: 16 }}>
                <div style={{ color: '#515a6e', fontWeight: 600, fontSize: 20, fontFamily: 'Poppins' }}>${weekData}</div>
                <div style={{ color: '#515a6e', fontSize: 12 }}>Ésta semana</div>
            </div>
            <div style={{ backgroundColor: '#f5f5f5', width: 120, height: 120, borderRadius: 12, marginTop: 12, padding: 16 }}>
                <div style={{ color: '#515a6e', fontWeight: 600, fontSize: 20, fontFamily: 'Poppins' }}>${monthData}</div>
                <div style={{ color: '#515a6e', fontSize: 12 }}>Éste més</div>
            </div>
        </div>
    </div>

}