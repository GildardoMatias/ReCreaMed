import React from 'react'
import { Card } from 'antd'

export default function DetalleHistoria({ historiaTomadaDeLosDatos }) {
    return <Card style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
        <p>Historia</p>
        {
            JSON.stringify(historiaTomadaDeLosDatos)
        }
    </Card>
}
