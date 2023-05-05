import React, { useEffect, useState } from 'react'
import { Table, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { getData } from '../../resources'
import Loading from '../../loading'

export default function HospitalTab(props) {
  const [receptorsrData, setReceptorsData] = useState([])
  const [loading, setLoading] = useState(false)

  // Before all, get DoctorsData
  useEffect(() => { getReceptorsData() }, [])
  const getReceptorsData = () => {
    getData('users_by_rol/Recepcion').then((rs) => { setReceptorsData(rs) }).finally(() => setLoading(false))
  }
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (_, { avatar }) => {
        return avatar.length > 9 ?
          <img width={64} src={'https://api.recreamed.com/images/' + avatar} alt='ProfilePic' /> :
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
  ];
  const myReceptors = (id_hospital) => {
    let doctorsFound = [];
    receptorsrData.forEach(doctor => {
      doctor.horarios.forEach(horario => {
        if (!doctorsFound.includes(doctor) && horario.sucursal._id === id_hospital) doctorsFound.push(doctor)
      });
    });
    console.log(`Founds for ${id_hospital}: `, doctorsFound)
    return doctorsFound;
  }
  const doctoresData = myReceptors(props.id_hospital); // Get medicos data before render TAble
  // Filter doctors of each hospital


  if (loading) return <Loading />

  return <div>
    <h6>Recepcionistas del hospital {props.hospital}</h6>
    <Table dataSource={doctoresData} columns={columns} />
  </div>
}
