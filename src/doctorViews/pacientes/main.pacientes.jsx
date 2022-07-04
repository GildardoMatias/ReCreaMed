import React, { Component, useState, useEffect } from 'react'
import { Table, Space, Button, List, Row, Col, Tabs } from 'antd'
import { API } from '../../resources'
import Loading from '../../loading'
import { usuario } from '../../resources'
import Expedientes from '../expedientes/expedientes'
import DetallesPaciente from './detalles.paciente'
import Register from './register.patient'
import { PlusOutlined, FormOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

export default function MainPacientes() {

  const [pacientesData, setPacientesData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [paciente, setPaciente] = useState(null)
  const [adding, setAdding] = useState(false)

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


  return (
    <div className='mainContainer'>

      <Space>
        <h4>Pacientes </h4>
        <Button onClick={() => setAdding(!adding)} size='small' type="primary" shape="circle" icon={<PlusOutlined />} />
      </Space>
      {
        isLoading ? <Loading /> :
          adding ? <Register setAdding={setAdding} /> :
            <Tabs tabPosition='left' onTabClick={(k, e) => { console.log('OnTABClick', k); setPaciente(k) }}>
              {
                pacientesData.map((pt) => {
                  return <TabPane tab={pt.name + " " + pt.telefono} key={pt._id} onClick={() => { setPaciente(pt._id) }}>
                    <DetallesPaciente paciente={pt._id} />
                  </TabPane>
                })
              }
            </Tabs>
      }

      <br />
      <br />

      <Expedientes paciente={paciente} />


    </div >
  )

}
