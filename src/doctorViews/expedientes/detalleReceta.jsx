import React, { useState, useEffect } from 'react'
import { Card, Button, Row, Space } from 'antd';
import { API } from '../../resources';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';

//Los IDS de las recetas son tomados y enviados desde el expediente
// Estan siendo agregadas y actualizadas directamente al expediente desde el form de detallenota->Agregar Receta
export default function DetalleReceta(props) {

    const [recetaData, setRecetaData] = useState([])
    const [recetaLoading, setRecetaLoading] = useState(true)
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        console.log("Props IDReceta: ", props.recetas)
        props.recetas ?
            fetch(API + 'recetas/getMany', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'ids': props.recetas })
            }).then(res => res.json())
                .then(response => {
                    console.log('Recetas Received:', response);
                    setRecetaData(response);
                    setRecetaLoading(false)
                })
                .catch(error => console.error('Error:', error))
            :
            finifhGet()
        console.log('Recetas: ', recetaData)

    }, [props.recetas])

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
                        // Object.keys(recetaData[0]).map(k => {
                        //     return <><Card.Grid key={k} style={gridStyle}>{k} : {recetaData[0][k]}</Card.Grid></>
                        // })
                        recetaData.map((r) => {
                            return <><Card.Grid key={r._id} style={gridStyle}> Prescripcion : {r.prescripcion}</Card.Grid></>
                        })
                        :
                        <h6>No hay una receta asignada</h6>
            }
        </Card>
    </div>
}
