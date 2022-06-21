import React, { useState, useEffect } from 'react'
import { Card, Button, Row, Space } from 'antd';
import { getData } from '../../resources';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';

export default function DetalleReceta(props) {

    const [recetaData, setRecetaData] = useState("")
    const [recetaLoading, setRecetaLoading] = useState(true)
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        console.log("Props IDReceta: ", props.receta)
        props.receta ?
            getData(`receta/${props.receta[0]}`).then(rs => { setRecetaData(rs); setRecetaLoading(false) })
            :
            finifhGet()

    }, [props.receta])

    const finifhGet = () => { setRecetaData([]); setRecetaLoading(false); }

    const gridStyle = {
        width: '100%',
        height: '32',
        textAlign: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return <div>
        <Card bordered={false}>
            <Space>
                <h5>Recetas </h5> 
                <Button onClick={() => setEditing(true)} size='small' type="primary" shape="circle" icon={<FormOutlined />} />
            </Space>
            {
                recetaLoading ? <h5>Cargando Receta...</h5> :
                    recetaData.length > 0 ?
                        Object.keys(recetaData[0]).map(k => {
                            return <><Card.Grid key={k} style={gridStyle}>{k} : {recetaData[0][k]}</Card.Grid></>
                        })
                        :
                        <h6>No hay una receta asignada</h6>
            }
        </Card>
    </div>
}
