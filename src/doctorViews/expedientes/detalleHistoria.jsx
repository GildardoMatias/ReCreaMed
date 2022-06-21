import React, { useState, useEffect } from 'react'
import { Card, Space, Button, Input, Form} from 'antd';
import { getData } from '../../resources';
import {  FormOutlined } from '@ant-design/icons';

export default function DetalleHistoria(props) {

    const [historiaData, setHistoriaData] = useState("")
    const [notaLoading, setHistoriaLoading] = useState(true)
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        console.log("Props IDHistoria: ", props.historia)
        props.historia ?
            getData(`historia/${props.historia}`).then(rs => { console.log("Historia response: ", rs); setHistoriaData(rs); setHistoriaLoading(false) })
            :
            finifhGet()
    }, [props.historia])

    const finifhGet = () => { setHistoriaData([]); setHistoriaLoading(false); }

    const gridStyle = {
        // width: '50%',
        // height: '40',
        textAlign: 'center',
        // display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    };

    const HistoriaDetails = () => {
        return editing ?  <><Input defaultValue={historiaData[0].historial} /><br/><Button onClick={() => setEditing(false)}>Guardar</Button></> : <Card style={gridStyle} size='small'>{historiaData[0].historial}</Card>  
    }


    return <div>
        <Card bordered={false}>
            <Space>
                <h5>Historia </h5>
                <Button onClick={() => setEditing(true)} size='small' disabled={!props.historia} type="primary" shape="circle" icon={<FormOutlined />} />
            </Space>
            {
                notaLoading ? <h5>Cargando Historia...</h5> :
                    historiaData.length > 0 ?

                        // Object.keys(historiaData[0]).map(k => {
                        //     return <><Card.Grid key={k} style={gridStyle}>{k}</Card.Grid><Card.Grid style={gridStyle} size='small'>{historiaData[0][k]}</Card.Grid></>
                        // })
                            <HistoriaDetails/>                   
                        :
                        <h6>No hay una historia asignada</h6>
            }
        </Card>
    </div>
}
