import React, { useEffect, useState } from 'react'
import { getData, deleteData, sendDataBody, } from '../../resources'
import Loading from '../../loading'
import { Table, Avatar, Space, Button, Popconfirm, Modal,  Input } from 'antd'
import { UserOutlined,  SearchOutlined } from '@ant-design/icons'
import { RegisterModal } from './register.user'
import Expedientes from '../../doctorViews/expedientes/expedientes'

// SHARED WITH RECEPTION / ENFERM

export default function HospitalTab(props) {
    const [value, setValue] = useState(''); // For search input
    const [pacientesData, setPacientesData] = useState([])
    const [paciente, setPaciente] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false) //For Edit patient
    const [loading, setLoading] = useState(true)
    // const [editingProfile, setEditingProfile] = useState(false)
    const showModal = () => { setIsModalVisible(true); };
    const handleOk = () => { setIsModalVisible(false); };
    const handleCancel = () => { setIsModalVisible(false);  };
    const [searchText, setSearchText] = useState('');//For search input

    useEffect(() => {
        getPacientes()
    }, [])

    const getPacientes = async () => {

        const meds = await getData(`users/hospital/${props.id_hospital}`)

        const idmeds = meds.map(doc => {
            return doc._id
        })


        sendDataBody('pacientes/medicos', { medicos: idmeds }).then((rs) => {
            setPacientesData(rs)
            setLoading(false)
        })
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
                    <img width={48} src={'https://api.recreamed.com/images/' + avatar} alt='ProfilePic' /> :
                    <Avatar size={48} className='btnIconCentered' icon={<UserOutlined />} />
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
        // {
        //     title: 'Correo',
        //     dataIndex: 'email',
        //     key: 'email',
        // },
        {
            title: 'Fecha de creacion',
            dataIndex: 'createdAt',
            key: 'createdAt',
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
                    <Button onClick={() => { setPaciente(record); showModal(); }}>
                        Expediente
                    </Button>
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

    const pacientesDataFiltered = pacientesData.filter((paciente) =>
        paciente.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Fill Modal
    // const gridStyle = {
    //     width: '50%',
    //     height: '50px',
    //     textAlign: 'center',
    //     display: 'inline-flex',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // };
    // function DetalleUsuario() {
    //     const datosSimples = [
    //         "rol",
    //         "name",
    //         "email",
    //         "telefono",
    //         "calle",
    //         "municipio",
    //         "estado",
    //         "codigopostal",
    //         "alcohol",
    //         "ciudad",
    //         "colonia",
    //         "cuales_drogas",
    //         "diagnostico",
    //         "drogas", "edad",
    //         "escolaridad",
    //         "estado_civil",
    //         "fuma", "lugar_de_nacimiento",
    //         "numexterior",
    //         "numinterior",
    //         "ocupacion",
    //         "peso", "sexo",
    //         "talla"
    //     ]

    //     return <div>
    //         {
    //             editingProfile ? <Register paciente={paciente} setAdding={setEditingProfile} /> :
    //                 <Card bordered={false} title={<Space><h4>Detalles del paciente </h4> <Button type='primary' ghost onClick={setEditingProfile} shape="circle" icon={<EditOutlined />} title='Editar' className='btnIconCentered' /></Space>}>
    //                     {
    //                         datosSimples.map(k => <><Card.Grid style={gridStyle}>{k}</Card.Grid><Card.Grid style={gridStyle} size='small'>{paciente[k]}</Card.Grid></>)
    //                     }
    //                 </Card>
    //         }
    //     </div>
    // }

    const handleSearch = e => {
        setValue(e.target.value)
        setSearchText(e.target.value);
    };

    if (loading) return <div style={{height: 400}}>
        <Loading />
    </div>

    return <div>
        <h6>Pacientes de {props.hospital}</h6>

        <Input
            style={{ width: '20em' }}
            placeholder="Buscar Paciente"
            value={value}
            onChange={handleSearch}
            addonAfter={<SearchOutlined />}
        />
        <div className='borderedTable'>
            <Table dataSource={pacientesDataFiltered} columns={columns} size='small' />
        </div>

        <Modal width={1200} open={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose>

            <Expedientes paciente={paciente} setIsEditModalOpen={setIsEditModalOpen} />

        </Modal>

        {/* Modal For Edit */}
        <RegisterModal getPacientesData={getPacientes} isModalOpen={isEditModalOpen} paciente={paciente} setIsModalOpen={setIsEditModalOpen} />

    </div >
}
