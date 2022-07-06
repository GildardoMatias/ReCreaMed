import React, { useState, useEffect } from 'react'
import { Space, Button, Select, Tabs } from 'antd'
import { API } from '../../resources'
import Loading from '../../loading'
import { usuario } from '../../resources'
import Expedientes from '../expedientes/expedientes'
import DetallesPaciente from './detalles.paciente'
import Register from './register.patient'
import { PlusOutlined, FormOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
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

  const getPacientesData = () => {
    fetch(API + `mispacientes/${usuario._id}`)
      .then(response => response.json())
      .then(data => {
        data.forEach(paciente => {
          paciente.value = paciente.name;
        });
        console.log(data); setPacientesData(data);
      })
      .finally(() => setIsLoading(false))
  }

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  const onChange = (data) => {
    console.log('onchangeSearchInput', data)
    setActivePatient(data)
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  return (
    <div className='mainContainer'>

      <Space>
        <h4>Pacientes </h4>
        <Button onClick={() => setAdding(!adding)} size='small' type="primary" shape="circle" icon={<PlusOutlined />} />
        <div className="my-select-container">
            <Select
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
      
      </Space>
      {
        isLoading ? <Loading /> :
          adding ? <Register setAdding={setAdding} /> :
            <Tabs activeKey={activePatient} tabPosition='left' onTabClick={(k, e) => { console.log('OnTABClick', k); setPaciente(k) }}>
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
