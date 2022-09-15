import React, { useState } from 'react'
import { useEffect } from 'react';
import { Space, Table, Tag, Progress } from 'antd'
import { getData } from '../resources';
export default function EfectosResults() {

  const [efectosData, setEfectosData] = useState(null);
  useEffect(() => {
    getData('encuestas/tipo/efectos').then((res) => {
      setEfectosData(res);
      console.log(res)

    })
  }, [])

  const columns = [

    {
      title: 'Usuario',
      key: 'usuario',
      dataIndex: 'usuario',
      render: (_, { usuario }) => (
        <>
          {usuario.name}
        </>
      ),
    },
    // {
    //   title: 'Respuestas',
    //   key: 'respuestas',
    //   dataIndex: 'respuestas',
    //   render: (_, { respuestas }) => (
    //     <>
    //       <Space>
    //         <p>Aumento_de_la_Presión_Arterial:           {respuestas.Aumento_de_la_Presión_Arterial}</p><br />
    //         <p>Debilidad_o_Mareos_ligeros:           {respuestas.Debilidad_o_Mareos_ligeros}</p><br />
    //         <p>Dolor_de_cabeza:           {respuestas.Dolor_de_cabeza}</p><br />
    //         <p>Mareos:           {respuestas.Mareos}</p><br />
    //         <p>Nauseas:           {respuestas.Nauseas}</p><br />
    //         <p>Sentimientos_de_Ansiedad:           {respuestas.Sentimientos_de_Ansiedad}</p><br />
    //         <p>amnesia_0:           {respuestas.amnesia_0}</p><br />
    //         <p>amnesia_1:           {respuestas.amnesia_1}</p><br />
    //         <p>despersonalizacion_0:           {respuestas.despersonalizacion_0}</p><br />
    //         <p>despersonalizacion_1:           {respuestas.despersonalizacion_1}</p><br />
    //         <p>desrealizacion_0:           {respuestas.desrealizacion_0}</p><br />
    //         <p>desrealizacion_1:           {respuestas.desrealizacion_1}</p><br />
    //         <p>ketamina:           {respuestas.ketamina}</p><br />
    //         <p>ketaminaiv:           {respuestas.ketaminaiv}</p><br />
    //         <p>ketaminaivb:           {respuestas.ketaminaivb}</p><br />
    //       </Space>

    //     </>
    //   ),
    // },
    {
      title: '¿Parece que las cosas se mueven en cámara lenta ?',
      key: 'desrealizacion_0',
      dataIndex: 'respuestas',
      render: (_, { respuestas }) => (
        <>{respuestas.desrealizacion_0}</>
      ),
    },
    {
      title: '¿Te parecen irreales las cosas, como si estuvieras en un sueño?',
      key: 'desrealizacion_1',
      dataIndex: 'respuestas',
      render: (_, { respuestas }) => (
        <>{respuestas.desrealizacion_1}</>
      ),
    },
    {
      title: '¿Te sientes desconectado de tu propio cuerpo?',
      key: 'despersonalizacion_0',
      dataIndex: 'respuestas',
      render: (_, { respuestas }) => (
        <>{respuestas.despersonalizacion_0}</>
      ),
    },
    {
      title: 'Sientes que ha cambiado el sentido de tu propio cuerpo?: por ejemplo, tu cuerpo se siente inusualmente largo o inusualmente pequeño?',
      key: 'despersonalizacion_1',
      dataIndex: 'respuestas',
      render: (_, { respuestas }) => (
        <>{respuestas.despersonalizacion_1}</>
      ),
    },
    {
      title: 'Te has distraído, o has perdido el rastro de alguna manera de lo que esta pasando durante esta experiencia?',
      key: 'amnesia_0',
      dataIndex: 'respuestas',
      render: (_, { respuestas }) => (
        <>{respuestas.amnesia_0}</>
      ),
    },
    {
      title: 'Tiene lagunas (vacios) en su memoria?',
      key: 'amnesia_1',
      dataIndex: 'respuestas',
      render: (_, { respuestas }) => (
        <>{respuestas.amnesia_1}</>
      ),
    },
    {
      title: 'Gusto por la ketamina',
      key: 'ketamina',
      dataIndex: 'respuestas',
      render: (_, { respuestas }) => (
        <Space direction='vertical'>
          <>Gusto por la ketamina: <Progress percent={respuestas.ketamina * 10} /></>
          <>Anhelo/Apetito de ketamina: <Progress percent={respuestas.ketaminaiv * 10} /></>
          <>Deseo de Ketamina IV: <Progress percent={respuestas.ketaminaivb * 10} /></>
        </Space>
      ),
    },
    {
      title: 'Efectos',
      key: 'Efectos',
      dataIndex: 'respuestas',
      render: (_, { respuestas }) => (
        <div>
          {respuestas.Aumento_de_la_Presión_Arterial && <Tag color="red">Aumento de la presion arterial</Tag>}
          {respuestas.Debilidad_o_Mareos_ligeros && <Tag color="red">Debilidad o Mareos ligeros</Tag>}
          {respuestas.Dolor_de_cabeza && <Tag color="red">Dolor de cabeza</Tag>}
          {respuestas.Mareos && <Tag color="red">Mareos</Tag>}
          {respuestas.Nauseas && <Tag color="red">Nauseas</Tag>}
          {respuestas.Sentimientos_de_Ansiedad && <Tag color="red">Sentimientos de Ansiedad</Tag>}
        </div>
      ),
    },

  ];

  return (
    <div>
      <br />
      <h4>Resultados de listas de verificacion para efectos secundarios</h4>
      <br />
      <Table dataSource={efectosData} columns={columns} scroll={{ x: 1300 }} />

    </div>
  )
}
