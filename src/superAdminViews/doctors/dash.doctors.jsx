import React, { Component, useState, useEffect } from 'react'
import { Table, Space, Button, Popconfirm, Modal } from 'antd';
import { API, deleteData } from '../../resources'
import Loading from '../../loading';
import { HomeOutlined, ClockCircleOutlined } from '@ant-design/icons'
import Register from './register.doctor';

export default function Dash() {

  const [isLoading, setILoading] = useState(true);
  const [doctoresData, setDoctoresData] = useState([]);
  const [doctorForEdit, setDoctorForEdit] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => { getDoctoresData() }, [])

  const getDoctoresData = () => {
    fetch(API + 'users_by_rol/Medico')
      .then(response => response.json())
      .then(data => {
        console.log(data); setDoctoresData(data);
      })
      .finally(() => setILoading(false))
  }

  const editDoctor = async (d) => {
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

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Foto',
      key: 'avatar',
      render: (_, record) => (
        <img src={'https://api.recreamed.com/images/' + record.avatar} alt="Logo" width={64} />
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
      <h4>Doctores</h4>
      {isLoading ? <Loading /> :
        <Table dataSource={doctoresData} columns={columns} />
      }

      <Modal width='200' title="Editar Hospital 400" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
        <Register medico={doctorForEdit} />
      </Modal>
    </div>
  )
}
