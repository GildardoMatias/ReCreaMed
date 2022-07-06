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
        props.recetas ?
            fetch(API + 'recetas/getMany', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'ids': props.recetas })
            }).then(res => res.json())
                .then(response => {
                    // console.log('Recetas Received:', response);
                    setRecetaData(response);
                    setRecetaLoading(false)
                })
                .catch(error => console.error('Error:', error))
            :
            finifhGet()

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
        <Card bordered={false} title={<>Recetas <Button onClick={() => setEditing(true)} size='small' type="primary" shape="circle" icon={<FormOutlined />} /></>}>
            {/* <Space>
                <h5>Recetas </h5>
                
            </Space> */}
            {
                recetaLoading ? <h5>Cargando Receta...</h5> :
                    recetaData.length > 0 ?

                        recetaData.map((r) => {
                            return <><Card.Grid key={r._id} style={gridStyle}> Prescripcion : {r.prescripcion}</Card.Grid></>
                        })
                        :
                        <h6>No hay una receta asignada</h6>
            }
        </Card>
    </div>
}
