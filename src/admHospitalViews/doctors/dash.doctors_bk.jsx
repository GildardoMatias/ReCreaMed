import React, { useState, useEffect } from 'react'
import { Table, Tabs } from 'antd';
import { API, usuario, myHospitals } from '../../resources'
import Loading from '../../loading';

const ids_hospitales = usuario && usuario.horarios.map(function (item) {
  return item['sucursal']['_id'];
})


function HospitalTab({ id_hospital, medicosData }) {

  let doctorsFound = [];
  medicosData.forEach((doctor) => {
    doctor.horarios.forEach(h => {
      if (id_hospital === h.sucursal._id && !doctorsFound.includes(doctor)) { doctorsFound.push(doctor) }
    })
  })
  return <div>
    <h6>Doctores del hospital: {id_hospital}</h6>
    <ul>
      {
        doctorsFound.map((d) => <div>{d.name}</div>)
      }
    </ul>
  </div>
}

export default function Dash() {

  const [isLoading, setILoading] = useState(true);
  const [doctoresData, setDoctoresData] = useState([]);

  const sucursalesItems = myHospitals.map((h) => {
    return {
      key: h._id,
      label: h.nombre,
      children: <HospitalTab id_hospital={h} medicosData={doctoresData} />,
    }
  })

  useEffect(() => {
    getDoctoresData()
  }, [])

  // const findMyDoctors = (arr) => {
  //   let doctorsFound = [];
  //   arr.forEach((doctor) => {
  //     doctor.horarios.forEach(h => {
  //       if (id_sucursales.includes(h.sucursal._id) && !doctorsFound.includes(doctor)) { doctorsFound.push(doctor) }
  //     })
  //   })
  //   return doctorsFound;
  // }

  const getDoctoresData = () => {
    fetch(API + 'users_by_rol/Medico')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setDoctoresData(data)
      })
      .finally(() => setILoading(false))
  }

  const columns = [
    {
      title: 'Rol',
      dataIndex: 'rol',
      key: 'rol',
      onFilter: (value, record) => record.rol === "Medico",
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
  return (
    <div className='mainContainer'>
      <h1>Doctores</h1>

      <br />
      <Tabs defaultActiveKey="1" items={sucursalesItems} />
      <br />
      <br />
      {isLoading ? <Loading /> :
        <Table dataSource={doctoresData} columns={columns} />
      }
    </div>
  )
}
