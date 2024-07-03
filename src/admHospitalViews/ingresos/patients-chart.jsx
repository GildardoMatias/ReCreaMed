import React, { useEffect, useState } from 'react'
import { Statistic, Card } from 'antd'
import { getData, sendDataBody } from '../../resources'
import Loading from '../../loading'

export default function PatientsChart({ ids_medicos }) {


  const MedicCard = ({ id_medico, name }) => {
    const [counter, setCounter] = useState(0)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      getData(`pacientes/count/${id_medico}`).then(rs => { setCounter(rs); setLoading(false) })
    }, [])
    if (loading) return <Loading />
    return <Card>
      <Statistic title={<span style={{ color: 'black' }}>{name}</span>} value={counter} />
    </Card>
  }


  return (
    <div >
      <h5>Pacientes de los diferentes médicos</h5>


      <div className='fila'>
        {
          ids_medicos.map(med => (
            <MedicCard id_medico={med._id} name={med.name} />
          ))
        }
      </div>
      <br />
    </div>
  )
}