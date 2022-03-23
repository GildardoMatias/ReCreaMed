import React, { Component, useState } from 'react'
import { Table } from 'antd'


export default function Dash () {

  const [dataSource, setDataSource] = useState( [
    {
      key: '1',
      name: 'Antonio Lopez',
      age: 32,
      address: '10 Downing Street',
      xped: "Ir al exediente", 
      med: "Jhon Doe"
    },
    {
      key: '2',
      name: 'Benito Maximo',
      age: 42,
      address: '10 Downing Street',
      xped: "Ir al exediente", 
      med: "Jane Doe"
    },
  ])

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Edad',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Direccion',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Expediente',
      dataIndex: 'xped',
      key: 'xped',
      render: text => <a href='#'>{text}</a>,
    },
    {
      title: 'Medico',
      dataIndex: 'med',
      key: 'med',
    },
  ];

  return (
    <div>
      <h1>Pacientes</h1>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )

}
