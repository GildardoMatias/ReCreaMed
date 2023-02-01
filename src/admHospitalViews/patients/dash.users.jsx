import React, { useState, useEffect } from 'react'
import { Table, Space, Button, Card, Modal, Avatar, message, Popconfirm } from 'antd'
import { API, deleteData, usuario } from '../../resources';
import Loading from '../../loading';
import { UserOutlined } from '@ant-design/icons'
import Register from './register.user'

const id_sucursales = usuario && usuario.horarios.map(function (item) {
  return item['sucursal']['_id'];
})

export default function Dash() {

  const [paciente, setPaciente] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => { setIsModalVisible(true); };
  const handleOk = () => { setIsModalVisible(false); };
  const handleCancel = () => { setIsModalVisible(false); setEditingProfile(false) };
  const [isLoading, setILoading] = useState(true);
  const [pacientesData, setPacientesData] = useState([]);
  const [editingProfile, setEditingProfile] = useState(false)


  useEffect(() => {
    getPacientesData()
  }, [])


  const findPatientsOfMyMedicos = (arr) => { // Find my patients by medico asignado
    let dl = [];
    // Check on each horario of each medico of medicos asignados of patient to see if share sucursal with my horarios as admin
    arr.forEach(paciente => {
      paciente.medicos_asignados.forEach(med => {
        med.horarios.forEach(h => {
          if (id_sucursales.includes(h.sucursal) && !dl.includes(paciente)) { console.log(paciente); dl.push(paciente) }
        })
      });
    });
    // console.log('final result', dl);
    return dl;
  }
  const getPacientesData = () => {
    fetch(API + 'users_by_rol/Paciente')
      .then(response => response.json())
      .then(data => {
        // console.log(data); 
        setPacientesData(findPatientsOfMyMedicos(data));
      })
      .finally(() => setILoading(false))
  }

  const deleteUser = (id_paciente) => {
    const newPatients = pacientesData.filter((p) => p._id !== id_paciente)
    deleteData(`users/remove/${id_paciente}`).then((rs) => {
      setPacientesData(newPatients)
    })
  }

  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  }
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (_, { avatar }) => {
        return avatar.length > 9 ?
          <img width={64} src={'https://api.recreamed.com/images/' + avatar} alt='ProfilePic' /> :
          <Avatar size={64} icon={<UserOutlined />} />
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
      title: 'Telefono',
      dataIndex: 'telefono',
      key: 'tel',
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
            onCancel={cancel}
            okText="Si"
            cancelText="No"
          >
            <Button danger>Eliminar</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

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
          <Card bordered={false} title={<Space><h4>Detalles del paciente </h4> <Button onClick={setEditingProfile}>Editar</Button></Space>}>
            {
              datosSimples.map(k => <><Card.Grid style={gridStyle}>{k}</Card.Grid><Card.Grid style={gridStyle} size='small'>{paciente[k]}</Card.Grid></>)
            }
          </Card>
      }
    </div>
  }



  return (
    <div className='mainContainer'>
      <h4>Usuarios</h4>
      {isLoading ? <Loading /> :

        <Table dataSource={pacientesData} columns={columns} />
      }
      <Modal width={800} open={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
        <DetalleUsuario />
      </Modal>
    </div>
  )

}
