import React, { useState, useEffect } from 'react'
import { API, getDataWithTrigger } from '../../resources';
import { getData } from '../../resources';
import { Button, Modal, Form, Input, Select, message } from 'antd';
const { Option } = Select;

export default function CreateExpedient(props) {
    //PacientesData ya viene en props
    const [historiasData, sethistoriasData] = useState([])
    const [historiasLoading, sethistoriasLoading] = useState(true)
    const [notasData, setNotasData] = useState([])
    const [notasLoading, setNotasLoading] = useState(true)
    const [recetasData, setRecetasData] = useState([])
    const [recetasLoading, setRecetasLoading] = useState(true)

    useEffect(() => {
        getData('historias').then(rs => {sethistoriasData(rs); sethistoriasLoading(false)});
        getData('notas').then(rs => {setNotasData(rs); setNotasLoading(false)});
        getData('recetas').then(rs => {setRecetasData(rs); setRecetasLoading(false)});
    }, [])


    //Save expedient
    const onFinish = (values) => {
        console.log('Valores:', values);
        fetch(API + 'expedientes/add', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => { console.log('Success:', response); message.success(response.message || response.error); })
            .catch(error => console.error('Error:', error))
        // getExpedientesData() 
    };
    const handleOk = () => {

    };

    const handleCancel = () => {
        props.setIsModalVisible(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Modal title="Nuevo expediente" visible={props.isModalVisible} onCancel={handleCancel}>
            <Form name="expediente" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
                <Form.Item label="Paciente" name="usuario" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Select
                        defaultValue={props.pacientesData[0] && props.pacientesData[0]._id}
                        placeholder='Selecciona un paciente'
                        style={{ width: 200 }}
                    // onChange={handleChange}
                    >
                        {
                            props.pacientesData.map(p => <Option value={p._id}>{p.name}</Option>)
                        }

                    </Select>
                </Form.Item>
                <Form.Item label="Historia Clinica" name="historia" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    {
                        historiasLoading ? <Input /> :
                            <Select
                                placeholder='Selecciona una Historia'
                                style={{ width: 200 }}
                            // onChange={handleChange}
                            >
                                {
                                   historiasData.map(h => <Option key={h._id} value={h._id}>{h.historial}</Option>)
                                }

                            </Select>
                    }

                </Form.Item>
                <Form.Item label="Notas Medicas" name="nota" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                {
                        notasLoading ? <Input /> :
                            <Select
                                placeholder='Selecciona una Nota'
                                style={{ width: 200 }}
                            // onChange={handleChange}
                            >
                                {
                                   notasData.map(n => <Option key={n._id} value={n._id}>{n.createdAt}</Option>)
                                }

                            </Select>
                    }
                </Form.Item>
                <Form.Item label="Receta" name="receta" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                {
                        recetasLoading ? <Input /> :
                            <Select
                                placeholder='Selecciona una Receta'
                                style={{ width: 200 }}
                            // onChange={handleChange}
                            >
                                {
                                   recetasData.map(r => <Option key={r._id} value={r._id}>{r.prescripcion}</Option>)
                                }

                            </Select>
                    }
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" form='expediente'>
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
