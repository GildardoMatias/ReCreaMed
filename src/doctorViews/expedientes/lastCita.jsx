import React, { useEffect, useState } from 'react'
import { getData, updateData } from '../../resources'
import { Card, Typography } from 'antd'
import { CalendarOutlined, ClockCircleOutlined, DollarOutlined } from '@ant-design/icons'
const { Paragraph } = Typography;


export default function LastCita(props) {

    const [cita, setCita] = useState({})
    const [lastBalance, setLastBalance] = useState([])
    // const [editableStr, setEditableStr] = useState('Sin costo registrado');
    const [loading, setLoading] = useState(true)

    useEffect(() => { getCitasData() }, [])

    const updateLastBalance = (newMonto) => {

        let newLastBalance = lastBalance;
        newLastBalance.monto = newMonto;
        updateData(`balances/update/${lastBalance._id}`, newLastBalance).then(getCitasData)
    }

    const getCitasData = () => {
        getData(`citas/${props.paciente}`).then((rs) => {
            console.log('lsat cita', rs.at(-1))
            setCita(rs.at(-1))
            return rs.at(-1)
        }).then((last) => {
            return getData('balances/cita/' + last._id)
        }).then((bl) => {
            console.log('balance', bl)
            setLastBalance(bl[0])
        }).finally(() => setLoading(false))
    }

    const LastBalance = () => {
        return <div>
            {
                lastBalance.monto ?
                    (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: '10px' }}>
                            <DollarOutlined style={{}} />
                            Costo:
                            <Paragraph
                                style={{ marginTop: 14 }}
                                editable={{
                                    onChange: updateLastBalance,
                                }}
                            >
                                {lastBalance.monto}
                            </Paragraph>
                        </div>
                    ) : (
                        <p>Sin Ultimo Balance</p>
                    )
            }

        </div>
    }


    if (loading) return <p>Cargando...</p>
    return (
        <div style={{ marginTop: 8 }}>
            <Card>
                {
                    cita ? <div>
                        <h6>Ultima cita</h6>
                        <ul>
                            <li className='btnIconCentered'><CalendarOutlined style={{ marginRight: 8 }} /> Fecha: {new Date(cita.fecha_hora).toLocaleDateString()}</li><br />

                            <li className='btnIconCentered'><ClockCircleOutlined style={{ marginRight: 8 }} /> Hora: {cita.fecha_hora.substring(11, 16)}</li>

                            <LastBalance />

                        </ul>
                    </div> : <h6>Sin citas registradas</h6>
                }

            </Card>
        </div>
    )
}