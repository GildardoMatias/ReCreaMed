import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Table, InputNumber, Divider } from 'antd';
import Loading from '../../loading';
import { getData, updateData } from '../../resources';

export default function Configuration({ id_usuario, correo }) {

    const [profileData, setProfileData] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingCostoCita, setEditingCostoCita] = useState(false)

    useEffect(() => {
        getProfileData()
    }, [])

    const onFinish = async (values) => {
        const newData = profileData.configuracion ? { configuracion: { tratamientos_ofrecidos: [...profileData.configuracion.tratamientos_ofrecidos, values] } } : { configuracion: { tratamientos_ofrecidos: values } }
        await updateData(`/users/updateUser/${id_usuario}`, newData).then((rs) => { console.log(rs); getProfileData() })
    };

    const getProfileData = () => {
        getData(`userByMail/${correo}`).then((rs) => {
            localStorage.setItem('userData', JSON.stringify(rs[0])) // Save profile data into local storage again, due to changes
            setProfileData(rs[0]) // Must change on backend to findOne, and remove the [0]
        }).finally(() => { setLoading(false) })
    }

    const columns = [
        {
            title: 'Servicio',
            dataIndex: 'tratamiento',
            key: 'name',
        },
        {
            title: 'Costo',
            dataIndex: 'costo',
            key: 'costo',
        }
    ];

    // Form For edit Costo base de cita
    const CostoCitaForm = () => {
        return <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinishEditPrice}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Costo base de cita"
                name="costo_cita"
                rules={[{
                    required: true,
                    message: 'Please input your username!'
                }]}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item
                wrapperCol={{ offset: 8, span: 16 }}
            >
                <Button type="primary" htmlType="submit">
                    Guardar
                </Button>
            </Form.Item>
        </Form>
    }

    // Methods for edit base price for cita
    const onFinishEditPrice = (values) => {
        const newConfig = {
            configuracion: Object.assign(profileData.configuracion, values)
        }
        updateData(`/users/updateUser/${id_usuario}`, newConfig)
            .then(() => getProfileData())
            .finally(() => setEditingCostoCita(false))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if (loading) return <Loading />

    return (
        <div>
            <h4>Configuracion</h4>
            <br />
            {
                editingCostoCita ?
                    <div>
                        <h5>Editando</h5>
                        <CostoCitaForm />
                    </div>
                    :
                    <div style={{ display: 'flex', alignContent: 'center', columnGap: 12 }}>
                        <h5>
                            {
                                profileData.configuracion && profileData.configuracion.costo_cita ? `Costo de cita: ${profileData.configuracion.costo_cita}` : "Sin costo de cita definido"
                            }
                        </h5>
                        <Button type='primary' size='small' onClick={setEditingCostoCita}>Modificar</Button>
                    </div>
            }

            <Divider />

            <h5>Servicios Registrados</h5>

            <Table dataSource={profileData.configuracion?.tratamientos_ofrecidos} columns={columns} bordered />

            <h5>Agregar servicio</h5>
            <Form
                name="add_tratamiento_medic"
                onFinish={onFinish}
                labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }}
            >

                <div className='fila'>
                    <Form.Item label="Nuevo Servicio" style={{ marginBottom: 0 }} >

                        <Form.Item name="tratamiento" rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(70% - 8px)' }} >
                            <Input placeholder="Ingresa Descripcion" />
                        </Form.Item>

                        <Form.Item
                            name="costo" rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(30% - 8px)', margin: '0 8px' }} >
                            <InputNumber placeholder="Costo" />
                        </Form.Item>

                    </Form.Item>

                    <Form.Item style={{ marginLeft: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Agregar
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div >
    )
}