import React, { useEffect, useState } from 'react'
import { getData } from '../../resources'
import { Card } from 'antd'
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons'

export default function LastCita(props) {

    const [cita, setCita] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => { getCitasData() }, [])

    const getCitasData = () => {
        getData(`citas/${props.paciente}`).then((rs) => {
            console.log('lsat cita', rs.at(-1))
            setCita(rs.at(-1))
        }).finally(() => setLoading(false))
    }

    if (loading) return <p>Cargando...</p>
    return (
        <div style={{marginTop: 8}}>
            <Card>


                {
                    cita ? <div>
                        <h6>Ultima cita</h6>
                        <ul>
                            <li className='btnIconCentered'><CalendarOutlined style={{ marginRight: 8 }} /> {cita.fecha_hora.substring(0, 10)}</li><br />
                            <li className='btnIconCentered'><ClockCircleOutlined style={{ marginRight: 8 }} /> Hora: {cita.fecha_hora.substring(11, 16)}</li>
                        </ul>
                    </div> : <h6>Sin citas registradas</h6>
                }

            </Card>
        </div>
    )
}