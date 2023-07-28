import React, { useState, useEffect } from 'react'
import { Card, Button, Tabs, Row, Col, Modal, Space, Typography, message, Upload, Input, Select, Form, Divider } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const numbers = ['Primera', 'Segunda', 'Tercera']

export default function NotasEvolucion({ notas_evolucion }) {
    return notas_evolucion.map((nota_evo) => {
        return <Card title='Nota de evolucion' size='small' style={{ marginBottom: 8 }}>

            <Card size='small'>
                <div className='fila' style={{ marginBottom: 8 }}>
                    <span className='desc'>Signos Vitales</span>
                </div>


                <div className='fila'>
                    {
                        nota_evo.signos_vitales && nota_evo.signos_vitales.map((aplicacion, index) => {
                            return <Card.Grid title='segunda aplicacion' className='lcolumna' style={{ borderRadius: 6 }}>
                                <span className='datos'>{numbers[index]} aplicacion</span>
                                <div><span className='desc'>Temperatura</span>: {aplicacion.temperatura}°</div>
                                <div><span className='desc'>Saturacion</span>: {aplicacion.saturacion_oxigeno}</div>
                                <div><span className='desc'>Presion Arterial</span>: {aplicacion.presion_arterial}</div>
                            </Card.Grid>
                        })
                    }
                </div>

            </Card>
            {/* <Button style={{ marginTop: 4 }} >Agregar</Button> */}
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Button style={{ marginTop: 4 }} className='btnIconCentered' size='small' type="primary" shape="circle" icon={<PlusOutlined />} ghost />
            </div>

            <div >
                <div className='fila' style={{ marginBottom: 8 }}>
                    <h6>S</h6> <Card size='small' style={{ width: '100%' }}>{nota_evo.s}</Card>
                </div>
                <div className='fila' style={{ marginBottom: 8 }}>
                    <h6>O</h6><Card size='small' style={{ width: '100%' }}>{nota_evo.o}</Card>
                </div>
                <div className='fila' style={{ marginBottom: 8 }}>
                    <h6>A</h6><Card size='small' style={{ width: '100%' }}>{nota_evo.a}</Card>
                </div>
                <div className='fila' style={{ marginBottom: 8 }}>
                    <h6>P</h6><Card size='small' style={{ width: '100%' }}>{nota_evo.p}</Card>
                </div>
            </div>

            {/* <Button style={{ marginTop: 4 }} >Agregar</Button> */}
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Button style={{ marginTop: 4 }} className='btnIconCentered' size='small' type="primary" shape="circle" icon={<PlusOutlined />} ghost />
            </div>

        </Card >
    })
}
