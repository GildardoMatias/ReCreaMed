import React, { useEffect, useState } from 'react'
import { Col } from 'antd'
import { getData, ids_hospitales, sendDataBody } from '../../resources'

const cardStyle = { color: 'white', fontFamily: 'Poppins', width: 145, height: 130, padding: 16, borderRadius: 8 }

export default function RoleCard({ color, rol }) {

  const [counterData, setCounterData] = useState(0)

  useEffect(() => {
    switch (rol) {
      case 'medicos':
        getData(`medics/count/hospital/${ids_hospitales[0]}`).then(rs => setCounterData(rs))
        break;
      case 'pacientes':
        getPacientes();
        break;
      case 'enfermeros':
        getData(`users_by_rol/count/${ids_hospitales[0]}/Enfermero`).then(rs => setCounterData(rs))
        break;
      case 'recepcionistas':
        getData(`users_by_rol/count/${ids_hospitales[0]}/Recepcion`).then(rs => setCounterData(rs))
        break;
      default:
        break;
    }
  }, [])

  const getPacientes = async () => {

    const meds = await getData(`users/hospital/${ids_hospitales[0]}`)

    const idmeds = meds.map(doc => { return doc._id })

    sendDataBody('pacientes/medicos/count', { medicos: idmeds }).then(rs => setCounterData(rs))
  }


  return (
    <Col>
      <div style={{ ...cardStyle, backgroundColor: color }}>
        <div style={{ fontSize: 16, fontWeight: '400' }}>Total {rol}</div>
        <div style={{ fontSize: 22, fontWeight: '500', display: 'flex', justifyContent: 'flex-end' }}>{counterData}</div>
      </div>
    </Col>
  )
}