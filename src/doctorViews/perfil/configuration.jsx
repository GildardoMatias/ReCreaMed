import React, { useState, useEffect } from 'react'
import { Form, Button, Table, InputNumber, Divider, Popconfirm } from 'antd';
import Loading from '../../loading';
import { getData, updateData } from '../../resources';
import AddService from './service.add';

export default function Configuration({ id_usuario, correo }) {

    const [profileData, setProfileData] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingCostoCita, setEditingCostoCita] = useState(false)
    const [isModalOpen, setisModalOpen] = useState(false)
    const [servicioForEdit, setServicioForEdit] = useState(null)

    useEffect(() => {
        getProfileData()

        // deleteServices()
    }, [])

    const getProfileData = () => {
        getData(`userByMail/${correo}`).then((rs) => {
            localStorage.setItem('userData', JSON.stringify(rs[0])) // Save profile data into local storage again, due to changes
            setProfileData(rs[0]) // Must change on backend to findOne, and remove the [0]
        }).finally(() => { setLoading(false) })
    }

    const confirmDelete = async (val) => {

        const { configuracion: { tratamientos_ofrecidos } } = profileData;
        const foundIndex = tratamientos_ofrecidos.findIndex((svc => svc._id === val._id));
        tratamientos_ofrecidos.splice(foundIndex, 1)
        profileData.configuracion.tratamientos_ofrecidos = tratamientos_ofrecidos;
        console.log("after: ", profileData)
        await updateData(`/users/updateUser/${profileData._id}`, profileData).then((rs) => { console.log(rs); getProfileData() })

        // const newData = { configuracion: {} }
        // updateData(`/users/updateUser/${id_usuario}`, newData).then((rs) => { console.log(rs); getProfileData() })
        console.log(val)
    }

    const columns = [
        {
            title: 'Servicio',
            dataIndex: 'tratamiento',
            key: 'name',
        },
        {
            title: 'Observaciones',
            dataIndex: 'observaciones',
            key: 'observaciones',
        },
        {
            title: 'Costo',
            dataIndex: 'costo',
            key: 'costo',
        },
        {
            title: 'Opciones',
            dataIndex: 'opciones',
            key: 'opciones',
            render: (_, record) => {
                return <div className='fila'>
                    <Button ghost type='primary' onClick={() => handleEditService(record)}>Editar</Button>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => confirmDelete(record)}
                        onCancel={() => console.log('Canceled')}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button ghost danger>Eliminar</Button>
                    </Popconfirm>
                </div>
            }
        }
    ];


    const handleEditService = (record) => {

        setServicioForEdit(record)
        setisModalOpen(true)
    }
    const handleClose = () => {
        setServicioForEdit(null)
        setisModalOpen(false);
    }

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

            <h5>Servicios Registrados</h5> <Button onClick={() => setisModalOpen(true)}>Agergar Servicio</Button>

            <Table dataSource={profileData.configuracion?.tratamientos_ofrecidos} columns={columns} bordered />

            <AddService isOpen={isModalOpen} handleClose={handleClose} service={servicioForEdit} profileData={profileData} getProfileData={getProfileData} />

        </div >
    )
}