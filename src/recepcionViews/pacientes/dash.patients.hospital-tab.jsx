import React, { useEffect, useState } from 'react'
import { getData, deleteData } from '../../resources'
import { Table, Avatar, Space, Button, Popconfirm, Modal, Card } from 'antd'
import { UserOutlined, EditOutlined } from '@ant-design/icons'
import Register from './register.user'

export default function HospitalTab(props) {
    const [pacientesData, setPacientesData] = useState([])
    const [paciente, setPaciente] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(true)
    const [editingProfile, setEditingProfile] = useState(false)
    const showModal = () => { setIsModalVisible(true); };
    const handleOk = () => { setIsModalVisible(false); };
    const handleCancel = () => { setIsModalVisible(false); setEditingProfile(false) };


    useEffect(() => {
        getPacientesData()
    }, [])

    const getPacientesData = () => {
        getData('users_by_rol/Paciente').then((rs) => setPacientesData(rs)).finally(() => setLoading(false))
    }

    const deleteUser = (id_paciente) => {
        const newPatients = pacientesData.filter((p) => p._id !== id_paciente)
        deleteData(`users/remove/${id_paciente}`).then((rs) => {
            setPacientesData(newPatients)
        })
    }

    const columns = [
        {
            title: 'Rol',
            dataIndex: 'rol',
            key: 'rol',
            onFilter: (value, record) => record.rol === "Medico",
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (_, { avatar }) => {
                return avatar.length > 9 ?
                    <img width={64} src={'https://api.recreamed.com/images/' + avatar} alt='ProfilePic' /> :
                    <Avatar size={64} className='btnIconCentered' icon={<UserOutlined />} />
            }
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Medicos Asignados',
            dataIndex: 'medicos_asignados',
            key: 'medicos_asignados',
            render: (_, { medicos_asignados }) => <ul>{
                medicos_asignados.map((m) => <li key={m._id}>{m.name}</li>)
            }</ul>
        },
        {
            title: 'Correo',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Telefono',
            dataIndex: 'telefono',
            key: 'telefono',
        },
        {
            title: 'Acciones',
            key: 'detalles',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => { setPaciente(record); showModal(); }}>Detalles</Button>
                    <Popconfirm
                        title="Borrar Paciente"
                        description="Esta seguro que quiere eliminar al paciente?"
                        onConfirm={() => deleteUser(record._id)}
                        onCancel={(e) => console.log(e)}
                        okText="Si"
                        cancelText="No"
                    >
                        <Button danger>Eliminar</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    // Populate table
    // Find my patients by medico asignado
    const findPatientsOfMyMedicos = (id_hospital) => {
        let dl = [];
        // Check on each horario of each medico of medicos asignados of patient to see if share sucursal with my horarios as admin
        pacientesData.forEach(paciente => {
            paciente.medicos_asignados.forEach(med => {
                med.horarios.forEach(h => {
                    // if (ids_hospitales.includes(h.sucursal) && !dl.includes(paciente)) { console.log(paciente); dl.push(paciente) }
                    if (h.sucursal === id_hospital && !dl.includes(paciente)) { console.log(paciente); dl.push(paciente) }
                })
            });
        });
        return dl;
    }
    const pacientesDataFiltered = findPatientsOfMyMedicos(props.id_hospital); // Get medicos data before render TAble
    // Fill Modal
    const gridStyle = {
        width: '50%',
        height: '50px',
        textAlign: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
    function DetalleUsuario() {
        const datosSimples = [
            "rol",
            "name",
            "email",
            "telefono",
            "calle",
            "municipio",
            "estado",
            "codigopostal",
            "alcohol",
            "ciudad",
            "colonia",
            "cuales_drogas",
            "diagnostico",
            "drogas", "edad",
            "escolaridad",
            "estado_civil",
            "fuma", "lugar_de_nacimiento",
            "numexterior",
            "numinterior",
            "ocupacion",
            "peso", "sexo",
            "talla"
        ]

        return <div>
            {
                editingProfile ? <Register paciente={paciente} setAdding={setEditingProfile} /> :
                    <Card bordered={false} title={<Space><h4>Detalles del paciente </h4> <Button type='primary' ghost onClick={setEditingProfile} shape="circle" icon={<EditOutlined />} title='Editar' className='btnIconCentered' /></Space>}>
                        {
                            datosSimples.map(k => <><Card.Grid style={gridStyle}>{k}</Card.Grid><Card.Grid style={gridStyle} size='small'>{paciente[k]}</Card.Grid></>)
                        }
                    </Card>
            }
        </div>
    }
    if (loading) return <p>Cargando...</p>

    return <div>
        <h6>Doctors of {props.hospital}</h6>
        <Table dataSource={pacientesDataFiltered} columns={columns} />

        <Modal width={800} open={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
            <DetalleUsuario />
        </Modal>
    </div>
}
