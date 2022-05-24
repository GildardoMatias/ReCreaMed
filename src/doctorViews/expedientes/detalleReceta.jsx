import React, { useState, useEffect } from 'react'
import { Card } from 'antd';
import { getData } from '../../resources';

export default function DetalleReceta(props) {

    const [recetaData, setRecetaData] = useState("")
    const [recetaLoading, setRecetaLoading] = useState(true)

    useEffect(() => {
        console.log("Props IDReceta: ", props.receta)
        props.receta ?
            getData(`receta/${props.receta}`).then(rs => { setRecetaData(rs); setRecetaLoading(false) })
            :
            setRecetaData([]);
    }, [props.receta])

    const gridStyle = {
        width: '50%',
        height: '40',
        textAlign: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return <div>
        <Card bordered={false}>
            <h5>Receta </h5>
            {
                recetaLoading ? <h5>Cargando Receta...</h5> :
                    recetaData.length > 0 ?
                        Object.keys(recetaData[0]).map(k => {
                            return <><Card.Grid key={k} style={gridStyle}>{k}</Card.Grid><Card.Grid style={gridStyle} size='small'>{recetaData[0][k]}</Card.Grid></>
                        })
                        :
                        <h6>No hay una nota asignada</h6>
            }
        </Card>
    </div>
}
