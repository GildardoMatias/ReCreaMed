import React from 'react'
import { Modal, Form, Input, Slider, Divider, Radio, InputNumber, Button, Space, Select, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { sendDataBody } from '../../resources'

// It's called nota, but actually is the complete expedient 

export default function NuevaNota({ isModalOpen, setIsModalOpen, id_paciente }) {

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        values.usuario = id_paciente;
        sendDataBody('fexpedientes/add', values).then((rs) => {
            if (rs.message && rs.message === 'Datos guardados correctamente') {
                message.info(rs.message)
                setIsModalOpen(false)
            }
            else message.error(rs.error)
        })
        console.log('New Exp:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const marks = { 0: '0', 10: '10' };

    const questLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    return <Modal width={600} title="Nuevo Expediente Fisioterapia" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        footer={[
            <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>,
            <Button type='primary' htmlType='submit' form='add_expediente_fisio'>Guardar</Button>
        ]} destroyOnClose
    >
        <Form
            name="add_expediente_fisio"
            // labelCol={{ span: 12 }}
            // wrapperCol={{ span: 12 }}
            initialValues={{ examenes: [{}], goniometria: [{}] }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        // layout='vertical'
        >

            <Divider>Padecimiento Actual</Divider>

            <Form.Item label="¿Cuál es el motivo de su consulta/Lesión/Patología?" name="motivo" rules={[{ required: true, message: 'Please input your username!' }]} >
                <Input />
            </Form.Item>

            <Form.Item label="¿Cuánto tiempo lleva con el problema?" name="tiempo" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="¿En qué momento del día le duele más?" name="momento_dia" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="¿Con qué movimientos aumenta el dolor?" name="movimientos" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Localizacion del dolor" name="localizacion" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Select
                    onChange={(val) => console.log('selected ', val)}
                    options={[
                        {
                            value: 'Puntual',
                            label: 'Puntual',
                        },
                        {
                            value: 'Regional',
                            label: 'Regional',
                        },
                        {
                            value: 'Irradiado',
                            label: 'Irradiado',
                        }
                    ]}
                />
            </Form.Item>

            <Form.Item label="Especifique" name="localizacion_es" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Tipo de dolor" name="tipo" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Select
                    onChange={(val) => console.log('selected ', val)}
                    options={[
                        {
                            value: 'Muscular',
                            label: 'Muscular',
                        },
                        {
                            value: 'Superficial',
                            label: 'Superficial',
                        },
                        {
                            value: 'Punzante',
                            label: 'Punzante',
                        },
                        {
                            value: 'Profundo',
                            label: 'Profundo',
                        },
                        {
                            value: 'Ardor',
                            label: 'Ardor',
                        },
                        {
                            value: 'Hormigueo',
                            label: 'Hormigueo',
                        },
                        {
                            value: 'Articular',
                            label: 'Articular',
                        },
                    ]}
                />
            </Form.Item>

            <Form.Item label="Especifique" name="tipo_es" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Escala numerica analogica" name="ena" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Slider defaultValue={0} min={0} max={10} marks={marks} />
            </Form.Item>


            <Divider>Goniometria</Divider>

            <Form.List name="goniometria">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <div>
                                <Form.Item
                                    {...restField}
                                    label='Articulacion'
                                    name={[name, 'articulacion']}
                                    rules={[{ required: true, message: 'Missing first name' }]}
                                    {...questLayout}                                    
                                >
                                    <Input placeholder="articulacion" />
                                </Form.Item>

                                <Form.Item
                                    {...restField}
                                    label='Movimiento'
                                    name={[name, 'movimiento']}
                                    rules={[{ required: true, message: 'Missing last name' }]}
                                    {...questLayout}                                    
                                >
                                    <Input placeholder="movimiento" />
                                </Form.Item>

                                <Form.Item
                                    {...restField}
                                    label='Completa'
                                    name={[name, 'completa']}
                                    rules={[{ required: true, message: 'Missing first name' }]}
                                    {...questLayout}                                    
                                >
                                    <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                                        <Radio value={true}>Si</Radio>
                                        <Radio value={false}>No</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                    {...restField}
                                    label='Ayuda'
                                    name={[name, 'ayuda']}
                                    rules={[{ required: true, message: 'Missing last name' }]}
                                    {...questLayout}                                    
                                >
                                    <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                                        <Radio value={true}>Necesita ayuda</Radio>
                                        <Radio value={false}>Solo</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                    {...restField}
                                    label='Dolor'
                                    name={[name, 'dolor']}
                                    rules={[{ required: true, message: 'Missing first name' }]}
                                    {...questLayout}                                    
                                >
                                    <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                                        <Radio value={true}>Si</Radio>
                                        <Radio value={false}>No</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                    {...restField}
                                    label='Grados'
                                    name={[name, 'grados']}
                                    rules={[{ required: true, message: 'Missing last name' }]}
                                    {...questLayout}                                    
                                >
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>


                            </div>
                        ))}
                    </>
                )}
            </Form.List>

            <Divider>Examen manual muscular</Divider>
            <Form.List name="examenes">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <div>
                                <Form.Item
                                    {...restField}
                                    label='Grupo muscular'
                                    name={[name, 'grupo']}
                                    rules={[{ required: true, message: 'Missing grupo' }]}
                                    {...questLayout}                                    
                                >
                                    <Input placeholder="grupo" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    label='Referencia numerica'
                                    name={[name, 'referencia']}
                                    rules={[{ required: true, message: 'Missing referencia' }]}
                                    {...questLayout}                                    
                                >
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    label='Dolor'
                                    name={[name, 'dolor']}
                                    rules={[{ required: true, message: 'Missing dolor' }]}
                                    {...questLayout}                                    
                                >
                                    <Radio.Group onChange={(val) => console.log('Selected ', val)} >
                                        <Radio value={true}>Si</Radio>
                                        <Radio value={false}>No</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    label='Dinamometro'
                                    name={[name, 'dinamometro']}
                                    rules={[{ required: true, message: 'Missing dinamometro' }]}
                                    {...questLayout}                                    
                                >
                                    <Input placeholder="dinamometro" />
                                </Form.Item>

                            </div>
                        ))}

                    </>
                )}
            </Form.List>

        </Form>
    </Modal>
}
