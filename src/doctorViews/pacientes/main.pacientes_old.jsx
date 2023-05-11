import React, { useState, useEffect } from 'react'
import { Button, Select, List, Row, Col } from 'antd'
import { API } from '../../resources'
import Loading from '../../loading'
import { usuario } from '../../resources'
import Expedientes from '../expedientes/expedientes'
// import DetallesPaciente from './detalles.paciente_old'
import DetallesPaciente from './detalles.paciente'
import Register from './register.patient'
import { PlusOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
const { Option } = Select;

export default function MainPacientes() {

  const [pacientesData, setPacientesData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // const [paciente, setPaciente] = useState(null)
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
          paciente.res_name = paciente.responsable.nombre;
          paciente.res_phone = paciente.responsable.telefono;
          paciente.value = paciente.name;
          paciente.key = paciente._id; // For new Tabs mode
          paciente.tab = <TabLabel name={paciente.name} telefono={paciente.telefono} key={paciente._id} />
          // paciente.content = <DetallesPaciente paciente={paciente._id} />
        });
        console.log(data); setPacientesData(data);
        if (data && data.length > 0) setActivePatient(data[0])
      })
      .finally(() => setIsLoading(false))
  }

  const TabLabel = ({ name, telefono, key }) => {
    return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: -10 }}>
      <div><UserOutlined style={{ fontSize: 28 }} /></div>
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 6 }}>
        <div>{name}</div>
        <div style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 4 }}><MobileOutlined />{telefono}</div>
      </div>
    </div>
  }

  const SideMenu = ({ tabs, onChange }) => {
    // const [activeKey, setActiveKey] = useState(activePatient);

    const handleTabClick = (patientSetted) => {
      setActivePatient(patientSetted);
      if (onChange) onChange(patientSetted); // Only if needed an onChange external method
    };

    return (
      <div style={{ display: "flex", border: '1px solid #D6D6D6', borderRadius: 12 }}>
        <List
          style={{ width: "240px", height: '520px', overflowY: "scroll" }}
          dataSource={tabs}
          renderItem={(item) => (
            <List.Item
              // style={{ borderWidth: 0, borderColor: 'transparent' }}
              noBorder
              key={item.key}
              className={activePatient._id === item.key ? "active-tab" : ""}
              onClick={() => handleTabClick(item)}
            >
              {item.tab}
            </List.Item>
          )}
        />
        {/* <div style={{ flex: 1 }}>{tabs.find((item) => item.key === activePatient).content}</div> */}
        <div style={{ flex: 1 }}><DetallesPaciente paciente={activePatient} getPacientesData={getPacientesData} /></div>
      </div>
    );
  }

  const onChange = (data) => {
    console.log('onchangeSearchInput', data)
    const found = pacientesData.find(p => p._id === data)
    setActivePatient(found)
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  if (isLoading) return <Loading />

  return (
    <div className='mainContainer'>
      {/* <Col ></Col> */}
      <h4 >Pacientes</h4>
      <Row justify="start">
        <Col>
          <div className="my-select-container">
            <Select
              // Widget para buscar pacientes
              style={{ borderRadius: 8, width: 256 }}
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
        <Col style={{ marginLeft: 12 }}><Button className='btnIconCentered' style={{ marginTop: 4 }} onClick={() => setAdding(!adding)} size='small' type="primary" shape="circle" icon={<PlusOutlined />} /> </Col>
      </Row> <div style={{ height: '16px' }}></div>
      {

        adding ?
          <Register setAdding={setAdding} /> :
          <SideMenu tabs={pacientesData} />

      }
      <br />
      <Expedientes paciente={activePatient._id} />
    </div >
  )

}
