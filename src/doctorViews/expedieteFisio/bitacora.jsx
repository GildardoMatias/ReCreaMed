import React, { useState } from 'react'
import { Card, Modal, Form, Input, Button, message, Row, Col, Select } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { updateData } from '../../resources';

// APARATOLOGIA WILL VE THE ONE THAT BE USED INSTEAD OF ALL OTHERS TECNICAS, EJERCICIOS, ETC
//Aparatologia as BITACORA.ENTRY

export default function Bitacora({ bitacoras, id_nota, getExpedienteData }) {

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const showCreteModal = () => { setIsCreateModalOpen(true) };
    const handleCreteOk = () => { setIsCreateModalOpen(false) };
    const handleCreateCancel = () => { setIsCreateModalOpen(false) };
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const [bitacoraForDetails, setbitacoraForDetails] = useState(null)
    const showDetailsModal = () => { setIsDetailsModalOpen(true) };
    const handleDetailsOk = () => { setIsDetailsModalOpen(false) };
    const handleDetailsCancel = () => { setIsDetailsModalOpen(false) };

    const [othersEnabled, setOthersEnabled] = useState(false)
    const handleChange = (val) => {
        // alert(`Val selected: ${val}`)
        setOthersEnabled(val === 'Otros')
    }

    const onFinish = (values) => {
        console.log('new Data', values)
        const newBitacora = othersEnabled ? { aparatologia: values.otros } : { aparatologia: values.aparatologia }
        const newBitacoras = [...bitacoras, newBitacora]
        console.log('AllNewBitacora ', newBitacoras)
        updateData(`fexpedientes/update/${id_nota}`, { bitacoras: newBitacoras }).then((rs) => {
            if (rs.message && rs.message === 'Datos actualizados correctamente') {
                getExpedienteData()
                setIsCreateModalOpen(false)
            } else message.error(rs.error)
        })
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const Question = ({ label, answer }) => {
        // return <Row style={{ height: 30, borderBottom: '1px solid #d9d9d9', marginBottom: 6 }}> Used when multiple
        return <Row style={{ height: 30, borderBottom: '1px solid #d9d9d9',borderTop: '1px solid #d9d9d9', marginBottom: 6 }}>
            <Col span={11} className='desc'>{label}</Col>
            <Col >{answer}</Col>
        </Row>
    }

    return <Card style={{ marginTop: 8 }}>
        <div className='fila'>
            <h6>Bitacoras</h6>
            <PlusCircleOutlined color='#1b70f7' onClick={showCreteModal} />
        </div>

        {
            bitacoras.map((btc, i) => {
                return <Button key={i} type='link' onClick={() => { setbitacoraForDetails(btc); showDetailsModal() }}>Aplicación {i + 1}  {new Date(btc.createdAt).toLocaleDateString('es-MX')}</Button>
            })
        }

        <Modal title="Detalles Bitacora" open={isDetailsModalOpen} onOk={handleDetailsOk} onCancel={handleDetailsCancel} width={600}
            footer={[<Button onClick={handleDetailsOk} type='primary'>Ok</Button>]}>
            {
                bitacoraForDetails && <div>
                    <Question label='Registro de bitácora:' answer={bitacoraForDetails.aparatologia} />
                    {/* <Question label='Tecnicas manuales' answer={bitacoraForDetails.tecnicas} />
                    <Question label='Ejercicio' answer={bitacoraForDetails.ejercicio} />
                    <Question label='Otros' answer={bitacoraForDetails.otros} />
                    <Question label='Estado en el que llega el paciente' answer={bitacoraForDetails.estado_llegada} />
                    <Question label='Estado en el que se retira el paciente' answer={bitacoraForDetails.estado_salida} />
                    <Question label='Fisioterapeuta que atendió' answer={bitacoraForDetails.fisioterapeuta} /> */}
                </div>
            }

        </Modal>

        <Modal title="Registrar Bitacora" open={isCreateModalOpen} onOk={handleCreteOk} onCancel={handleCreateCancel} destroyOnClose
            footer={[
                <Button onClick={handleCreateCancel}>Cancelar</Button>,
                <Button type='primary' htmlType='submit' form='add_bitacora_medic'>Guardar</Button>
            ]}>

            <Form
                name="add_bitacora_medic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item label="Seleccione" name="aparatologia" rules={[{ required: true, message: 'Please input your aparatologia' }]}>
                    <Select
                        onChange={handleChange}
                        options={[
                            {
                                value: 'Aparatologia',
                                label: 'Aparatologia',
                            },
                            {
                                value: 'Electroterapia',
                                label: 'Electroterapia',
                            },
                            {
                                value: 'Ultrasonido',
                                label: 'Ultrasonido',
                            },
                            {
                                value: 'Laser',
                                label: 'Laser',
                            },
                            {
                                value: 'Radiofrecuencia',
                                label: 'Radiofrecuencia',
                            },
                            {
                                value: 'Ondas de choque',
                                label: 'Ondas de choque',
                            },
                            {
                                value: 'Laser',
                                label: 'Laser',
                            },
                            {
                                value: 'Galvaniz. spa.',
                                label: 'Galvaniz. spa.',
                            },
                            {
                                value: 'Microc.',
                                label: 'Microc.',
                            },
                            {
                                value: 'Otros',
                                label: 'Otros',
                            },
                        ]}
                    />

                </Form.Item>
                {/* <Form.Item label="Aparatologia" name="aparatologia" rules={[{ required: true, message: 'Please input your aparatologia' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Tecnicas manuales" name="tecnicas" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Ejercicio" name="ejercicio" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input />
                </Form.Item> */}

                {
                    othersEnabled && <Form.Item label="Otros" name="otros" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input />
                    </Form.Item>
                }
                {/* <Form.Item label="Estado en el que llega el paciente" name="estado_llegada" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Estado en el que se retira el paciente" name="estado_salida" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Fisioterapeuta que atendió" name="fisioterapeuta" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input />
                </Form.Item> */}

            </Form>

        </Modal>

    </Card>
}
