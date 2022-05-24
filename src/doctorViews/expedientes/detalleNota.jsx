import React, { useState, useEffect } from 'react'
import { Card } from 'antd';
import { getData } from '../../resources';

export default function DetalleNota(props) {

    const [notaData, setNotaData] = useState("")
    const [notaLoading, setnotaLoading] = useState(true)

    useEffect(() => {
        console.log("Props IDNota: ", props.nota)
        props.nota ? 
        getData(`nota/${props.nota}`).then(rs => {  setNotaData(rs); setnotaLoading(false) })
        :
        setNotaData([]);
    }, [props.nota])

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
            <h5>Nota </h5>
            {
                notaLoading ? <h5>Cargando Nota...</h5> :
                    notaData.length > 0 ?
                        Object.keys(notaData[0]).map(k => {
                            return <><Card.Grid key={k} style={gridStyle}>{k}</Card.Grid><Card.Grid style={gridStyle} size='small'>{notaData[0][k]}</Card.Grid></>
                        })
                        :
                        <h6>No hay una nota asignada</h6>
            }
        </Card>
    </div>
}
