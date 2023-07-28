import React, { useState } from 'react'
import { Card, Button, Modal, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, TimePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';

import { updateData } from '../../resources'


export default function HojasEnfermeria({ hojas_enfermeria, id_nota }) {
    const [hojaEdit, setHojaEdit] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Modal for details
    const showModal = () => { setIsModalOpen(true) };
    const handleOk = () => { setIsModalOpen(false); setHojaEdit(null) };
    const handleCancel = () => { setHojaEdit(null); setIsModalOpen(false) };

    // Modal for Add
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const showAddModal = () => { setIsAddModalOpen(true) };
    const handleAddOk = () => { setIsAddModalOpen(false) };
    const handleAddCancel = () => { setIsAddModalOpen(false) };

    const gridStyle = { width: '20%', textAlign: 'center', height: '40' }
    const gridStyle2 = { width: '20%', textAlign: 'center', height: 60, padding: 4 }

    const onFinish = (values) => {
        console.log('prev hojas ', hojas_enfermeria)

        console.log('Success:', values);
        hojas_enfermeria.push(values)
        updateData(`notas/update/${id_nota}`, { hojas_enfermeria: hojas_enfermeria }).then((rs) => {
            console.log(rs)
            setIsAddModalOpen(false)
        })

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }


    return <Card style={{ marginTop: 8 }}>
        <div className='fila' style={{ marginBottom: 8 }}>
            <h6>Hojas de Enfermería</h6>
        </div>

        {
            hojas_enfermeria && hojas_enfermeria.map((hoja, i) => {
                hoja.aplicacion = i;
                return <Button key={i} type='link' onClick={() => { setHojaEdit(hoja); console.log(hoja); setIsModalOpen(true) }}>Aplicacion {i + 1}  {new Date(hoja.inicio?.hora).toLocaleDateString('es-MX')}</Button>
            })
        }
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            {/* <Button style={{ marginTop: 4 }}>Agregar</Button> */}
            <Button className='btnIconCentered' onClick={showAddModal} size='small' type="primary" shape="circle" icon={<PlusOutlined />} ghost />
        </div>

        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={720} footer={[
            <Button onClick={handleOk}>Cerrar</Button>
        ]}>
            {
                hojaEdit && <div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: 32, fontSize: 15, fontWeight: '500' }}> <span>Aplicacion {hojaEdit.aplicacion + 1}</span> <span>{hojaEdit.peso}kg</span> <span>{hojaEdit.dosis}</span> <span>{new Date(hojaEdit.createdAt).toLocaleDateString('es-Mx')}</span></div>

                    <Card style={{ marginTop: 10 }} bordered={false}>
                        <Card.Grid style={gridStyle}></Card.Grid>
                        <Card.Grid style={gridStyle}>HORA</Card.Grid>
                        <Card.Grid style={gridStyle}>FRECUENCIA CARDIACA</Card.Grid>
                        <Card.Grid style={gridStyle}>PRESIÓN ARTERIAL</Card.Grid>
                        <Card.Grid style={gridStyle}>SATURACION O₂</Card.Grid>

                        <Card.Grid style={gridStyle}>INICIO</Card.Grid>
                        <Card.Grid style={gridStyle}>{new Date(hojaEdit.inicio.hora).toLocaleTimeString()}</Card.Grid>
                        <Card.Grid style={gridStyle}>{hojaEdit.inicio.frecuencia_cardiaca}</Card.Grid>
                        <Card.Grid style={gridStyle}>{hojaEdit.inicio.presion_arterial}</Card.Grid>
                        <Card.Grid style={gridStyle}>{hojaEdit.inicio.saturacion_oxigeno}</Card.Grid>

                        <Card.Grid style={gridStyle}>TERMINO</Card.Grid>
                        <Card.Grid style={gridStyle}>{new Date(hojaEdit.termino.hora).toLocaleTimeString()}</Card.Grid>
                        <Card.Grid style={gridStyle}>{hojaEdit.termino.frecuencia_cardiaca}</Card.Grid>
                        <Card.Grid style={gridStyle}>{hojaEdit.termino.presion_arterial}</Card.Grid>
                        <Card.Grid style={gridStyle}>{hojaEdit.termino.saturacion_oxigeno}</Card.Grid>
                    </Card>

                    <div style={{ fontSize: 16, fontWeight: '500', marginTop: 8, marginBottom: 8 }}>Observaciones</div>

                    <Card size='small'>
                        {
                            hojaEdit.observaciones
                        }
                    </Card>

                </div>
            }

        </Modal>

        <Modal title='Nueva hoja de enfermería' open={isAddModalOpen} onOk={handleAddOk} onCancel={handleAddCancel} width={800} footer={[
            <Button onClick={handleAddOk}>Cerrar</Button>,
            <Button type="primary" htmlType="submit" form='add_hoja_enfermeria'>
                Guardar
            </Button>
        ]} destroyOnClose>


            <Form
                name="add_hoja_enfermeria"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout='vertical'
            >
                <Form.Item label="Peso" name="peso" rules={[{ required: true, message: 'Ingresa el peso' }]}>
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Dosis" name="dosis" rules={[{ required: true, message: 'Ingresa la dosis' }]}>
                    <Input />
                </Form.Item>


                <div className='fila'>
                    <span style={{ width: 64 }}>INICIO: </span>
                    <Form.Item label='Hora' name={['inicio', 'hora']} rules={[{ required: true }]} >
                        <TimePicker format='HH:mm' placeholder='Hora de inicio' locale={locale} />
                    </Form.Item>
                    <Form.Item label='Frecuencia cardiaca' name={['inicio', 'frecuencia_cardiaca']} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label='Presion arterial' name={['inicio', 'presion_arterial']} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Saturacion O₂' name={['inicio', 'saturacion_oxigeno']} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', columnGap: '10px' }}>
                    <span style={{ width: 64, }}>TERMINO:</span>
                    <Form.Item name={['termino', 'hora']} rules={[{ required: true }]} >
                        <TimePicker format='HH:mm' placeholder='Hora de fin' locale={locale} />
                    </Form.Item>
                    <Form.Item name={['termino', 'frecuencia_cardiaca']} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['termino', 'presion_arterial']} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['termino', 'saturacion_oxigeno']} srules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </div>

                <Form.Item
                    label="Observaciones"
                    name="observaciones"
                    rules={[{ required: true, message: 'Ingresa las observaciones' }]}
                >
                    <Input.TextArea />
                </Form.Item>

            </Form>
        </Modal>

    </Card>
}