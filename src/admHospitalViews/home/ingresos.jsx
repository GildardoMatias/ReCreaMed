import React from 'react'

export default function Ingresos() {
    return <div>
        <span className='desc'>Ingresos</span>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
            <div style={{ backgroundColor: '#f5f5f5', width: 120, height: 120, borderRadius: 12, marginTop: 12, padding: 16 }}>
                <div style={{ color: '#515a6e', fontWeight: 600, fontSize: 20, fontFamily: 'Poppins' }}>$1200</div>
                <div style={{ color: '#515a6e', fontSize: 12 }}>Ésta semana</div>
            </div>
            <div style={{ backgroundColor: '#f5f5f5', width: 120, height: 120, borderRadius: 12, marginTop: 12, padding: 16 }}>
                <div style={{ color: '#515a6e', fontWeight: 600, fontSize: 20, fontFamily: 'Poppins' }}>$1500</div>
                <div style={{ color: '#515a6e', fontSize: 12 }}>Éste més</div>
            </div>
        </div>
    </div>

}