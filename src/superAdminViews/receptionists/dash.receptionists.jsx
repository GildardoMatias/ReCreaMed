import React, { useState, useEffect } from 'react'
import { Table, Space, Button, Popconfirm, Modal, Avatar } from 'antd';
import { API, deleteData } from '../../resources'
import Loading from '../../loading';
import { HomeOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons'
import Register from './register.receptionist';

export default function Dash() {

  const [isLoading, setILoading] = useState(true);
  const [doctoresData, setDoctoresData] = useState([]);
  const [doctorForEdit, setDoctorForEdit] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => { getDoctoresData() }, [])
  useEffect(() => { getDoctoresData() }, [isModalVisible])

  const getDoctoresData = () => {
    fetch(API + 'users_by_rol/Recepcion')
      .then(response => response.json())
      .then(data => {
        console.log(data); setDoctoresData(data);
      })
      .finally(() => setILoading(false))
  }

  const editDoctor = async (rd) => {
    let d = JSON.parse(JSON.stringify(rd));
    d.horarios.forEach((h) => { h.sucursal = h.sucursal._id })
    console.log('Horarios before edit: ', d.horarios);
    await setDoctorForEdit(d)
    setIsModalVisible(true);
    console.log('Editar medico: ', d)
  }

  const deleteDoctor = (doctor) => {
    deleteData('/users/remove/' + doctor._id).then(() => {
      console.log('removed: ', doctor._id);
      getDoctoresData()
    })
  }



  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Foto',
      key: 'avatar',
      render: (_, { avatar }) => (
        avatar.lenght > 12 ?
          <img src={'https://api.recreamed.com/images/' + avatar} alt="Logo" width={64} />
          : <Avatar icon={<UserOutlined />} size={64} className='btnIconCentered' />

      ),
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Horarios',
      dataIndex: 'horarios',
      key: 'horarios',
      render: (_, record) => (

        <p>{record.horarios.map((h) => { return <Space size='small'><p><HomeOutlined style={{ marginTop: -6 }} />{h.sucursal.nombre}</p><p><ClockCircleOutlined />{h.horario}</p></Space> })}</p>

      ),
    },
    {
      title: 'Opciones',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button size='small' onClick={() => { editDoctor(record) }}>
            Editar
          </Button>
          <Popconfirm
            title="Seguro que quiere borrar este doctor?"
            onConfirm={() => deleteDoctor(record)}
            // onCancel={cancel}
            okText="Si"
            cancelText="No"
          >
            <Button danger size='small'>
              Borrar
            </Button>
          </Popconfirm>

        </Space>
      ),
    }
  ];
  return (
    <div>
      <h4>Recepcionistas</h4>
      {isLoading ? <Loading /> :
        <Table dataSource={doctoresData} columns={columns} />
      }

      <Modal width={900} title="Editar Medico" visible={isModalVisible} onCancel={handleCancel} destroyOnClose={true} footer={[]}>
        <Register medico={doctorForEdit} setIsModalVisible={setIsModalVisible} />
      </Modal>
    </div>
  )
}
