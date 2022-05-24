import React, { useState, useEffect } from 'react'
import { Card } from 'antd';
import { getData } from '../../resources';

export default function DetalleHistoria(props) {

    const [historiaData, setHistoriaData] = useState("")
    const [notaLoading, setHistoriaLoading] = useState(true)

    useEffect(() => {
        console.log("Props IDHistoria: ", props.historia)
        props.historia ? 
        getData(`historia/${props.historia}`).then(rs => { console.log("Historia response: ", rs); setHistoriaData(rs); setHistoriaLoading(false) })
        :
        setHistoriaData([]);
    }, [props.historia])

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
            <h5>Historia </h5>
            {
                notaLoading ? <h5>Cargando Historia...</h5> :
                    historiaData.length > 0 ?
                        Object.keys(historiaData[0]).map(k => {
                            return <><Card.Grid key={k} style={gridStyle}>{k}</Card.Grid><Card.Grid style={gridStyle} size='small'>{historiaData[0][k]}</Card.Grid></>
                        })
                        :
                        <h6>No hay una historia asignada</h6>
            }
        </Card>
    </div>
}
