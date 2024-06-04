import React, { useEffect, useState } from 'react'
import { Statistic, Card } from 'antd'
import { sendDataBody } from '../../resources'
import Loading from '../../loading'

export default function PatientsChart({ ids_medicos }) {

  const [percentsData, setPercentsData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPercentsData()
  }, [])

  const getPercentsData = async () => {
    await sendDataBody('pacientes/percents', { medicos: ids_medicos }).then(rs => {
      setPercentsData(rs)
    }).finally(() => setLoading(false))
  }

  const PieChart = () => {
    const totalPorcentaje = percentsData.reduce((sum, item) => sum + item.porcentaje, 0);

    return (
      <div className="pie-chart">
        {percentsData.map((item, index) => (
          <div
            key={index}
            className="pie-segment"
            style={{
              backgroundColor: index % 2 === 0 ? '#1677FF' : '#FA8C16', // Colores alternados
              transform: `rotate(${(item.porcentaje / totalPorcentaje) * 360}deg)`, // Calcula el ángulo proporcional al porcentaje
            }}
          ></div>
        ))}
      </div>)
  }


  if (loading) return <Loading />

  return (
    <div >
      <h5>Pacientes de los diferentes médicos</h5>

      {JSON.stringify(ids_medicos)}
      {JSON.stringify(percentsData)}

      <div className='fila'>
        <Card>
          <Statistic title={<span style={{ color: 'black' }}>Gildardo Matias (40%)</span>} value={32} />
        </Card>
        <Card>
          <Statistic title={<span style={{ color: 'black' }}>Medico 2 (60%)</span>} value={28} />
        </Card>
      </div>
      <br />
    </div>
  )
}