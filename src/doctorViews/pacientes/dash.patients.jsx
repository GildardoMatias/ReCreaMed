import React, { Component, useState, useEffect } from 'react'
import { Table } from 'antd'
import { API } from '../../resources'
import Loading from '../../loading'
import { usuario } from '../../resources'


export default function Dash() {

  const [pacientesData, setPacientesData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getPacientesData()
  }, [])

  const getPacientesData = () => {
    fetch(API + `mispacientes/${usuario._id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data); setPacientesData(data);
      })
      .finally(() => setIsLoading(false))
  }

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    // {
    //   title: 'Edad',
    //   dataIndex: 'age',
    //   key: 'age',
    // },
    {
      title: 'Medico',
      dataIndex: 'id_medicoasignado',
      key: 'id_medicoasignado',
    },
    {
      title: 'Municipio',
      dataIndex: 'municipio',
      key: 'municipio',
    },
    {
      title: 'Calle',
      dataIndex: 'calle',
      key: 'calle',
    },
    {
      title: 'N Exterior',
      dataIndex: 'numexterior',
      key: 'numexterior',
    },
    {
      title: 'Telefono',
      dataIndex: 'telefono',
      key: 'telefono',
    },

  ];

  return (
    <div>
      <h4>Pacientes</h4>
      {
        isLoading ? <Loading /> :
          <Table dataSource={pacientesData} columns={columns} />
      }
    </div>
  )

}
