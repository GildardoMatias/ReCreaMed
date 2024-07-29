import React, { useEffect, useState } from 'react'
import { Statistic, Card } from 'antd'
import { getData} from '../../resources'
import Loading from '../../loading'

export default function PatientsChart({  doctors_data }) {


  const MedicCard = ({ id_medico, name }) => {
    const [counter, setCounter] = useState(0)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
      getData(`pacientes/count/${id_medico}`).then(rs => { setCounter(rs); setLoading(false) })
    }, [])

    if (loading) return <Loading />
    return <Card>
      <Statistic title={<span style={{ color: 'black' }}>{name}</span>} value={counter} suffix={<span style={{fontSize: 12, }}>px asignados</span>} />
    </Card>
  }


  return (
    <div >
      <h5>Contador de pacientes por médico</h5>

      <div className='fila'>
        {
          doctors_data.map(med => (
            <MedicCard id_medico={med._id} name={med.name} />
          ))
        }
      </div>
      <br />
    </div>
  )
}