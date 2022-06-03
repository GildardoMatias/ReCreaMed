import React, { Component, useState, useEffect } from 'react'
import { Table, Space, Button } from 'antd'
import { API } from '../../resources'
import Loading from '../../loading'
import { usuario } from '../../resources'
import Expedientes from '../expedientes/expedientes'
import DetallesPaciente from './detalles.paciente'



export default function MainPacientes() {

  const [pacientesData, setPacientesData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [paciente, setPaciente] = useState(null)
  const [view, setView] = useState('')

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
      render: (text, record)=><Button type="link" onClick={()=>{console.log(record); setPaciente(record._id)}}>{text}</Button>
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={()=>setPaciente(record._id)}>Expediente</Button>
          <Button>Ver datos</Button>
          <Button>Editar</Button>
        </Space>
      ),
    },

  ];

  const tablaPacientes = () => {

  }

  return (
    <div className='mainContainer'>
      <h4>Pacientes</h4>
      {
        isLoading ? <Loading /> :
          <Table dataSource={pacientesData} columns={columns} />
      }
      <Expedientes paciente={paciente}/>
      <DetallesPaciente paciente={paciente}/>
    </div>
  )

}
