import React, { Component, useState, useEffect } from 'react'
import { Table } from 'antd';
import { API } from '../../resources'
import Loading from '../../loading';

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
      title: 'Rol',
      dataIndex: 'rol',
      key: 'rol',
      onFilter: (value, record) => record.rol === "Medico",
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
