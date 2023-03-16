import React, { useState, useEffect } from 'react'
import { Button, Select, Tabs, Row, Col } from 'antd'
import { API } from '../../resources'
import Loading from '../../loading'
import { usuario } from '../../resources'
import Expedientes from '../expedientes/expedientes'
import DetallesPaciente from './detalles.paciente'
import Register from './register.patient'
import { PlusOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
const { Option } = Select;

export default function MainPacientes() {

  const [pacientesData, setPacientesData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [paciente, setPaciente] = useState(null)
  const [adding, setAdding] = useState(false)
  const [activePatient, setActivePatient] = useState(pacientesData[0]?._id)

  useEffect(() => {
    getPacientesData()
  }, [])

  useEffect(() => {
    getPacientesData()
  }, [adding])

  const getPacientesData = () => {
    fetch(API + `mispacientes/${usuario._id}`)
      .then(response => response.json())
      .then(data => {
        data.forEach(paciente => {
          paciente.value = paciente.name;
          paciente.key = paciente._id; // For new Tabs mode
          paciente.label = <TabLabel name={paciente.name} telefono={paciente.telefono} />
          paciente.children = <DetallesPaciente paciente={paciente._id} />
        });
        console.log(data); setPacientesData(data);
        if (data && data.length > 0) setPaciente(data[0]._id)
      })
      .finally(() => setIsLoading(false))
  }

  const TabLabel = ({ name, telefono }) => {
    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: -6 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}><UserOutlined />{name}</div>
      <div style={{ fontSize: 10, display: 'flex', alignItems: 'center' }}><MobileOutlined />{telefono}</div>
    </div>
  }
  const onChange = (data) => {
    console.log('onchangeSearchInput', data)
    setActivePatient(data)
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };


  return (
    <div className='mainContainer'>
      <Row justify="start">
        <Col ><h4 >Pacientes</h4> </Col>
        <Col style={{ marginLeft: 12 }}><Button className='btnIconCentered' style={{ marginTop: 4 }} onClick={() => setAdding(!adding)} size='small' type="primary" shape="circle" icon={<PlusOutlined />} /> </Col>
        <Col style={{ marginLeft: 16 }}>
          <div className="my-select-container">
            <Select
              // Widget para buscar pacientes
              style={{ borderRadius: 8 }}
              dropdownStyle={{ borderRadius: 8 }}
              showSearch
              placeholder="Buscar paciente"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              {
                pacientesData.map((p) => <Option value={p._id}>{p.name}</Option>)
              }
            </Select>
          </div>
        </Col>
      </Row> <div style={{ height: '16px' }}></div>
      {
        isLoading ? <Loading /> :
          adding ? <Register setAdding={setAdding} /> :
            <div style={{ border: '1px solid #D6D6D6', borderRadius: 12 }}>

              <Tabs items={pacientesData} activeKey={activePatient} tabPosition='left' size='small' centered onTabClick={(k, e) => { console.log('OnTABClick', k); setPaciente(k) }} style={{ marginTop: 6 }} />

            </div>
      }
      <br />
      <Expedientes paciente={paciente} />
    </div >
  )

}
