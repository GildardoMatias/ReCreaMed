import React, { useState, useEffect } from 'react'
import { Card, Space, Button } from 'antd';
import { getData } from '../../resources';
import { PlusOutlined, FormOutlined  } from '@ant-design/icons';

export default function DetalleNota(props) {

    const [notaData, setNotaData] = useState("")
    const [notaLoading, setnotaLoading] = useState(true)
    const [editing, setEditing] = useState(false)


    useEffect(() => {
        console.log("Props IDNota: ", props.nota)
        props.nota ?
            getData(`nota/${props.nota}`).then(rs => { setNotaData(rs); setnotaLoading(false) })
            :
            finifhGet()
    }, [props.nota])

    const finifhGet = () => { setNotaData([]); setnotaLoading(false); }


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
            <Space>
                <h5>Nota </h5> 
                <Button size='small'type="primary" shape="circle" icon={<PlusOutlined />} />
                <Button onClick={() => setEditing(true)} size='small' type="primary" shape="circle" icon={<FormOutlined />} />
            </Space>
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
