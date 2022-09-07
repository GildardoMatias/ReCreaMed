import React, { useState } from 'react'
import { useEffect } from 'react';
import { Table, Tag } from 'antd'
import { getData } from '../resources';
export default function EfectosResults() {

  const [efectosData, setEfectosData] = useState(null);
  useEffect(() => {
    getData('encuestas/tipo/efectos').then((res) => { setEfectosData(res); console.log(res) })


  }, [])

  const dataSource = [
    {
      key: '1',
      name: '625706dc9a6437369f835bd5',
      score: 20,
    },
    {
      key: '1',
      name: '62fd9367578d2b4669e0e0aa',
      score: 7,
    },
    {
      key: '1',
      name: '62fd9982578d2b4669e0e18b',
      score: 14,
    },
    {
      key: '1',
      name: '630398a0bd637f93fb6fb0fe',
      score: 22,
    },
    {
      key: '1',
      name: '63039acabd637f93fb6fb11b',
      score: 18,
    },
    {
      key: '1',
      name: '630398a0bd637f93fb6fb0fe',
      score: 22,
    },
    {
      key: '1',
      name: '63039acabd637f93fb6fb11b',
      score: 18,
    },
  ];

  const columns = [
    {
      title: 'Usuario',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Resultados',
      dataIndex: 'age',
      key: 'age',
    },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';

    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }

    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
  ];

  return (
    <div>
      <br />
      <h4>Resultados de listas de verificacion para efectos secundarios</h4>
      <br />
      <Table dataSource={dataSource} columns={columns} />

    </div>
  )
}
