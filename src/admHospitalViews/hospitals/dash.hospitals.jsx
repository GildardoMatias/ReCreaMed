import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import Loading  from '../../loading'
import { API } from '../../resources'


export default function Dash() {

  const [isLoading, setILoading] = useState(true);
  const [hospitalesData, setHospitalesData] = useState([]);

  useEffect(() => {
    getHospitalesData()
  }, [])

  const getHospitalesData = () => {
    fetch(API + 'sucursales')
      .then(response => response.json())
      .then(data => { console.log(data); setHospitalesData(data); setILoading(false); });
  }

  //Start tabla data
  const columns = [
    {
      title: 'Sucursal',
      dataIndex: 'nombre',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Ciudad_municipio',
      dataIndex: 'ciudad_municipio',
      defaultSortOrder: 'descend',
    },
    {
      title: 'Colonia',
      dataIndex: 'colonia',
    },

    {
      title: 'calle',
      dataIndex: 'calle',
    },
    {
      title: 'Telefono',
      dataIndex: 'telefono',
      defaultSortOrder: 'descend',
    }
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }
  //End tabla data

  return (
    isLoading ? <Loading /> :
      <div>
        <h1>Todos los hospitales</h1>
        <Table columns={columns} dataSource={hospitalesData} onChange={onChange} />
      </div>
  )

}

