import React, { useState, useEffect } from 'react'
import { Card, Space, Button, Input, Form, message } from 'antd';
import { getData, API } from '../../resources';
import { FormOutlined } from '@ant-design/icons';

export default function DetalleHistoria(props) {
    const { TextArea } = Input;
    const [historiaData, setHistoriaData] = useState("")
    const [notaLoading, setHistoriaLoading] = useState(true)
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        //     console.log("Props IDHistoria: ", props.historia)
        props.historia ?
            getHistoriaData()
            :
            finifhGet()
    }, [props.historia])

    const finifhGet = () => { setHistoriaData([]); setHistoriaLoading(false); }

    const getHistoriaData = () => {
        getData(`historia/${props.historia}`).then(rs => { setHistoriaData(rs); setHistoriaLoading(false) })
    }

    const gridStyle = {
        width: '100%',
        // height: '40',
        // textAlign: 'center',
        // display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    };

    const updateHistoria = (values) => {
        setEditing(false)
        fetch(API + 'historias/update/' + historiaData[0]._id, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                console.log('Success:', response);
                message.success(response.message || response.error);
            })
            .finally(() => {
                getHistoriaData()
                setEditing(false)
            })
        console.log('New Historia', values);
    }


    const HistoriaDetails = () => {
        return <Card style={gridStyle} >
            <h5>Historia Clinica</h5>

            {
                editing ?
                    <>
                        <Form name='historiaForm' initialValues={{ historial: historiaData[0].historial }} onFinish={updateHistoria}>
                            <Form.Item name='historial'>
                                <TextArea rows={4} />
                            </Form.Item>
                            <Space>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Guardar</Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={() => setEditing(false)}>Cancelar</Button>
                                </Form.Item>
                            </Space>
                        </Form>
                    </>
                    :
                    <div>
                        <span style={{ whiteSpace: 'pre-line', textAlign: 'left', wordWrap:'normal'}}>{historiaData[0].historial}</span>
                        <Button className='btnIconCentered' onClick={() => setEditing(true)} size='small' disabled={!props.historia} type="primary" shape="circle" icon={<FormOutlined className='sizedIcon' />} style={{ position: 'absolute', bottom: 18, right: 18 }} ghost/>
                    </div>
            }</Card>
    }


    return <div>
        {/* <Space>
            <Button className='btnIconCentered' onClick={() => setEditing(true)} size='small' disabled={!props.historia} type="primary" shape="circle" icon={<FormOutlined className='sizedIcon' />} />
        </Space> */}
        {
            notaLoading ? <h5>Cargando Historia...</h5> :
                historiaData.length > 0 ?
                    <HistoriaDetails />
                    :
                    <h6>No hay una historia asignada</h6>
        }
        <br />
    </div>
}

