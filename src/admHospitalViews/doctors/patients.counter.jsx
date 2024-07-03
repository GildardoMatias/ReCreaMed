import { Card, Statistic } from 'antd'
import React, { useState, useEffect } from 'react'
import Loading from '../../loading'
import { getData } from '../../resources'


export default function PatientsCounter  ({ id_medico, name })  {
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