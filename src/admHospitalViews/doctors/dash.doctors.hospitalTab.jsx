import React, { useEffect, useState } from 'react'
import { Table, Avatar, Button,message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { getData } from '../../resources'
import Loading from '../../loading'
import ReportsDoctors from './reports.doctors'

export default function HospitalTab(props) {
  const [doctorsData, setDoctorsData] = useState([])
  const [loading, setLoading] = useState(false)

  // Modal for details
  const [medicForDetails, setMedicForDetails] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOk = () => {
    setIsModalOpen(false);
  };

  // Before all, get DoctorsData
  useEffect(() => { getDoctorsData() }, [])
  const getDoctorsData = () => {
    getData(`users/hospital/${props.id_hospital}`).then((rs) => { setDoctorsData(rs) }).finally(() => setLoading(false))
  }
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (_, { avatar }) => {
        return avatar.length > 9 ?
          <img width={64} src={'https://api.recreamed.com/images/' + avatar} alt='ProfilePic' style={{borderRadius: 6}} /> :
          <Avatar size={64} icon={<UserOutlined />} className='btnIconCentered' />
      }
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
    {
      title: 'Reporte mensual de citas',
      dataIndex: 'reporte',
      key: 'reporte',
      render: (_, { _id }) => {
        return <div>
          <Button onClick={() => {message.info(_id) ; setMedicForDetails(_id); setIsModalOpen(true) }}>
            Ver reporte
          </Button>
        </div>
      }
    },

  ];

  if (loading) return <Loading />

  return <div>
    <h6>Doctores del hospital {props.hospital}</h6>

    <Table dataSource={doctorsData} columns={columns} />

    <ReportsDoctors isModalOpen={isModalOpen} handleOk={handleOk} id_medico={medicForDetails} />
  </div>
}
