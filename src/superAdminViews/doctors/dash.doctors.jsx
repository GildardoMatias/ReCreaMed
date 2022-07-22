import React, { Component, useState, useEffect } from 'react'
import { Table, Space } from 'antd';
import { API } from '../../resources'
import Loading from '../../loading';
import { HomeOutlined, ClockCircleOutlined } from '@ant-design/icons'

export default function Dash() {

  const [isLoading, setILoading] = useState(true);
  const [doctoresData, setDoctoresData] = useState([]);

  useEffect(() => {
    getDoctoresData()
  }, [])

  const getDoctoresData = () => {
    fetch(API + 'users_by_rol/Medico')
      .then(response => response.json())
      .then(data => {
        console.log(data); setDoctoresData(data);
      })
      .finally(() => setILoading(false))
  }

  const columns = [
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

        <p>{record.horarios.map((h) => { return <Space size='small'><p><HomeOutlined style={{marginTop: -6}}/>{h.sucursal.nombre}</p><p><ClockCircleOutlined />{h.horario}</p></Space> })}</p>

      ),
    }
  ];
  return (
    <div>
      <h1>Doctores</h1>
      {isLoading ? <Loading /> :
        <Table dataSource={doctoresData} columns={columns} />
      }
    </div>
  )
}
