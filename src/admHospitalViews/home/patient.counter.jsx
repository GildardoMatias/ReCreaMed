import React from 'react'

export default function PatientCounter() {
    return <div>
        <span className='desc'>Pacientes por médico</span>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
            <div style={{ backgroundColor: '#f5f5f5', width: 160, height: 80, borderRadius: 12, marginTop: 12, padding: 16 }}>
                <div style={{ color: '#515a6e', fontSize: 16 }}>Médico 1</div>
                <div style={{ color: '#515a6e', fontWeight: 600, fontSize: 20, fontFamily: 'Poppins' }}>32</div>
            </div>
            <div style={{ backgroundColor: '#f5f5f5', width: 160, height: 80, borderRadius: 12, marginTop: 12, padding: 16 }}>
                <div style={{ color: '#515a6e', fontSize: 16 }}>Médico 20</div>
                <div style={{ color: '#515a6e', fontWeight: 600, fontSize: 20, fontFamily: 'Poppins' }}>22</div>
            </div>
            <div style={{ backgroundColor: '#f5f5f5', width: 160, height: 80, borderRadius: 12, marginTop: 12, padding: 16 }}>
                <div style={{ color: '#515a6e', fontSize: 16 }}>Médico 3</div>
                <div style={{ color: '#515a6e', fontWeight: 600, fontSize: 20, fontFamily: 'Poppins' }}>17</div>
            </div>
        </div>
    </div>

}