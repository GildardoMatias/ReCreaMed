import React, { useEffect, useState } from 'react'
import { Form, Input, Button, InputNumber, Modal, ColorPicker } from 'antd';
import { updateData, pre_colors } from '../../resources';

export default function AddService({ isOpen, handleClose, service, profileData, getProfileData }) {

    // const [initialService, setinitialService] = useState(null)

    // useEffect(() => {
    //     console.log('before', profileData)
    //     // setinitialService(service)
    // }, [service])

    const onFinish = async (values) => {
        if (values.color.metaColor) values.color = '#' + values.color.metaColor.originalInput;
        console.log(values)
        const newData = profileData.configuracion ? { configuracion: { tratamientos_ofrecidos: [...profileData.configuracion.tratamientos_ofrecidos, values] } } : { configuracion: { tratamientos_ofrecidos: values } }
        await updateData(`/users/updateUser/${profileData._id}`, newData).then((rs) => { console.log(rs); getProfileData(); handleClose() })
    };

    const onFinishEdit = async (values) => {
        if (values.color.metaColor) values.color = '#' + values.color.metaColor.originalInput;
        console.log(values)
        const { configuracion: { tratamientos_ofrecidos } } = profileData;
        const foundIndex = tratamientos_ofrecidos.findIndex((svc => svc._id === service._id));
        tratamientos_ofrecidos[foundIndex] = values;
        profileData.configuracion.tratamientos_ofrecidos = tratamientos_ofrecidos;
        console.log("after: ", profileData)
        await updateData(`/users/updateUser/${profileData._id}`, profileData).then((rs) => { console.log(rs); getProfileData(); handleClose() })

    }

    // useEffect(() => {
    //     return () => {
    //         setinitialService(null)
    //     }
    // }, [])

    return (
        <Modal title={service ? "Editar Servicio" : "Agregar Servicio"} open={isOpen} onCancel={handleClose} destroyOnClose
            footer={[
                <Button type="primary" htmlType="submit" form='add_tratamiento_medic'>
                    {service ? "Guardar" : "Agregar"}
                </Button>,
                <Button onClick={handleClose}>Cerrar</Button>
            ]}
        >
            <Form
                name="add_tratamiento_medic"
                onFinish={service ? onFinishEdit : onFinish}
                labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }}
                initialValues={service ? service : { color: '#3174ad' }}
            >

                {/* {JSON.stringify(service)} */}

                <Form.Item name="tratamiento" label="Tratamiento" rules={[{ required: true }]}  >
                    <Input placeholder="Ingresa Descripcion" />
                </Form.Item>

                <Form.Item name="observaciones" label="Observaciones" rules={[{ required: false }]}  >
                    <Input placeholder="Ingresa Observaciones" />
                </Form.Item>

                <Form.Item name="costo" label="Costo" rules={[{ required: true }]}  >
                    <InputNumber placeholder="Costo" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item name="color" label="Color en calendario" rules={[{ required: false }]}  >
                    <ColorPicker
                        presets={[
                            {
                                label: 'Colores recomendados',
                                colors: pre_colors,
                            },
                            {
                                label: 'Recientes',
                                colors: [],
                            },
                        ]}
                    />
                </Form.Item>

            </Form>
        </Modal>

    )
}
