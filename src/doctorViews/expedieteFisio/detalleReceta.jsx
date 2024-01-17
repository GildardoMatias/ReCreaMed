import { Card } from 'antd'
import React, { useState } from 'react'

export default function FDetalleReceta({ id_nota }) {
    const [recetasData, setRecetasData] = useState(null)
    return <Card>
        <h6>Recetas</h6>
        {
            recetasData ? JSON.stringify(recetasData) : <h6>Sin recetas</h6>
        }
    </Card>
}
