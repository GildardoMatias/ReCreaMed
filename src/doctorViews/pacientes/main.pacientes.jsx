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
import dayjs from 'dayjs'
const { Option } = Select;

export default function MainPacientes() {

  const [pacientesData, setPacientesData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // const [paciente, setPaciente] = useState(null)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [activePatient, setActivePatient] = useState(pacientesData[0]?._id)

  useEffect(() => {
    getPacientesData()
  }, [])

  useEffect(() => {
    getPacientesData()
  }, [isRegisterModalOpen])

  const getPacientesData = () => {
    fetch(API + `mispacientes/${usuario._id}`)
      .then(response => response.json())
      .then(data => {
        data.forEach(paciente => {
          paciente.res_name = paciente.responsable.nombre;
          paciente.res_phone = paciente.responsable.telefono;
          paciente.fecha_nacimiento = dayjs(paciente.fecha_nacimiento);
        });
        // console.log(data); 
        setPacientesData(data);
        if (data && data.length > 0) setActivePatient(data[0])
      })
      .finally(() => setIsLoading(false))
  }




  const onChange = (data) => {
    const found = pacientesData.find(p => p._id === data)
    setActivePatient(found)
    console.log('active patient', found)
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  if (isLoading) return <Loading />

  return (
    <div className='mainContainer' style={{ backgroundColor: '#f5f6f8' }}>
      {/* <Col ></Col> */}
      <h3 >Pacientes</h3>
      <Row justify="start">
        <Col>
          <div className="my-select-container">
            <Select
              // Widget para buscar pacientes
              style={{ borderRadius: 8, width: 320 }}
              dropdownStyle={{ borderRadius: 8 }}
              showSearch
              placeholder="Buscar paciente"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              {
                pacientesData.map((p) => <Option key={p._id} value={p._id}>{p.name}</Option>)
              }
            </Select>
          </div>
        </Col>
        <Col style={{ marginLeft: 12 }}><Button className='btnIconCentered' style={{ height: 30 }} onClick={() => setIsRegisterModalOpen(!isRegisterModalOpen)} size='small' icon={<PlusOutlined />} shape='round' type="primary" title='Agregar paciente' >Agregar Paciente</Button> </Col>
      </Row> <div style={{ height: '16px' }}></div>


      {
        activePatient && <Expedientes paciente={activePatient} setIsEditModalOpen={setIsEditModalOpen} />
      }



      {/* Modal For Register */}
      <Register setIsModalOpen={setIsRegisterModalOpen} isModalOpen={isRegisterModalOpen} getPacientesData={getPacientesData} />

      {/* Modal For Edit */}
      <Register setIsModalOpen={setIsEditModalOpen} isModalOpen={isEditModalOpen} paciente={activePatient} getPacientesData={getPacientesData} />

    </div >
  )

}
