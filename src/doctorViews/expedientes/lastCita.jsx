import React, { useEffect, useState } from 'react'
import { getData, updateData } from '../../resources'
import { Card, Typography } from 'antd'
import { CalendarOutlined, ClockCircleOutlined, DollarOutlined } from '@ant-design/icons'
import HistorialCitas from './historialCitas';
const { Paragraph } = Typography;


export default function LastCita(props) {

    const [cita, setCita] = useState({})
    const [citasData, setCitasData] = useState({})
    const [lastBalance, setLastBalance] = useState([])
    // const [editableStr, setEditableStr] = useState('Sin costo registrado');
    const [loading, setLoading] = useState(true)

    useEffect(() => { getCitasData() }, [])

    const updateLastBalance = (newMonto) => {

        let newLastBalance = lastBalance;
        newLastBalance.monto = newMonto;
        updateData(`balances/update/${lastBalance._id}`, newLastBalance).then(getCitasData)
    }

    const getLastCta = (eventos) => {
        var fechaActual = new Date();

        // Filtrar los eventos que tienen una fecha menor o igual a la fecha actual
        var eventosPasados = eventos.filter(function (evento) {
            var fechaEvento = new Date(evento.fecha_hora);
            return fechaEvento <= fechaActual;
        });

        // Ordenar los eventos pasados por fecha de forma descendente
        eventosPasados.sort(function (a, b) {
            var fechaA = new Date(a.fecha_hora);
            var fechaB = new Date(b.fecha_hora);
            return fechaB - fechaA;
        });

        // Obtener el evento más reciente
        return eventosPasados[0]
    }

    const getCitasData = () => {
        getData(`citas/${props.paciente}`).then((rs) => {
            const ultimaCita = getLastCta(rs);
            // console.log('lsat cita', ultimaCita)
            setCita(ultimaCita)
            setCitasData(rs.reverse())
            return ultimaCita
        }).then((last) => {
            return getData('balances/cita/' + last?._id)
        }).then((bl) => {
            // console.log('balance', bl)
            setLastBalance(bl[0])
        }).finally(() => setLoading(false))
    }

    const LastBalance = () => {
        return <div>
            {
                lastBalance && lastBalance.monto ?
                    (
                        <div >

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

                            {/* <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: '10px' }}>
                             <CalendarOutlined /> {new Date(lastBalance.createdAt).toLocaleDateString()}
                         </div> */}
                        </div>
                    ) : (
                        <p className='desc' style={{marginTop: 6}}>Sin Último Balance</p>
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
                        <h6>Cita más reciente</h6>
                        <ul>
                            <li className='btnIconCentered'><CalendarOutlined style={{ marginRight: 8 }} /> Fecha: {new Date(cita.fecha_hora).toLocaleDateString()}</li><br />

                            <li className='btnIconCentered'><ClockCircleOutlined style={{ marginRight: 8 }} /> Hora: {cita.fecha_hora.substring(11, 16)}</li>

                            <HistorialCitas historial={citasData} />

                            <LastBalance />

                        </ul>
                    </div> : <h6>Sin cita recente registrada</h6>
                }

            </Card>
        </div>
    )
}