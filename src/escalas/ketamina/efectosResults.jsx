import React, { useState } from 'react'
import { useEffect } from 'react';
import { Space, Table, Tag, Progress } from 'antd'
import { Form, Select } from 'antd';
import { getData, usuario, sendDataBody } from '../../resources';
const { Option } = Select;

export default function EfectosResults() {

  const [efectosData, setEfectosData] = useState(null);
  const [medicosData, setMedicosData] = useState([])


  // useEffect(() => {
  //   const url = `encuestas/ketamina/medico/${usuario._id}`
  //   console.log(url);
  //   getData(url).then((res) => {
  //     setEfectosData(res);
  //     console.log(res)
  //   })
  // }, [])

  useEffect(() => {
    usuario.rol === 'Administrador' ? getDoctorsData() : getEncuestasData(usuario._id)
  }, [])
  const getDoctorsData = () => { //Para el caso que la sesion sea de Administrador
    const body = { ids: usuario.medicos_asignados }
    sendDataBody(`users/getMany`, body).then(rs => { setMedicosData(rs); console.log('medicosData: ', rs); })
  }
  const getEncuestasData = (medico) => {
    getData(`encuestas/ketamina/medico/${medico}`).then((rs) => {
      console.log(rs);
      setEfectosData(rs)
    })
  }
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
    {
      title: '¿Parece que las cosas se mueven en cámara lenta ?',
      key: 'desrealizacion_0',
      dataIndex: 'respuestas_ketamina',
      render: (_, { respuestas_ketamina }) => (
        <>{respuestas_ketamina.desrealizacion_0}</>
      ),
    },
    {
      title: '¿Te parecen irreales las cosas, como si estuvieras en un sueño?',
      key: 'desrealizacion_1',
      dataIndex: 'respuestas_ketamina',
      render: (_, { respuestas_ketamina }) => (
        <>{respuestas_ketamina.desrealizacion_1}</>
      ),
    },
    {
      title: '¿Te sientes desconectado de tu propio cuerpo?',
      key: 'despersonalizacion_0',
      dataIndex: 'respuestas_ketamina',
      render: (_, { respuestas_ketamina }) => (
        <>{respuestas_ketamina.despersonalizacion_0}</>
      ),
    },
    {
      title: 'Sientes que ha cambiado el sentido de tu propio cuerpo?: por ejemplo, tu cuerpo se siente inusualmente largo o inusualmente pequeño?',
      key: 'despersonalizacion_1',
      dataIndex: 'respuestas_ketamina',
      render: (_, { respuestas_ketamina }) => (
        <>{respuestas_ketamina.despersonalizacion_1}</>
      ),
    },
    {
      title: 'Te has distraído, o has perdido el rastro de alguna manera de lo que esta pasando durante esta experiencia?',
      key: 'amnesia_0',
      dataIndex: 'respuestas_ketamina',
      render: (_, { respuestas_ketamina }) => (
        <>{respuestas_ketamina.amnesia_0}</>
      ),
    },
    {
      title: 'Tiene lagunas (vacios) en su memoria?',
      key: 'amnesia_1',
      dataIndex: 'respuestas_ketamina',
      render: (_, { respuestas_ketamina }) => (
        <>{respuestas_ketamina.amnesia_1}</>
      ),
    },
    {
      title: 'Gusto por la ketamina',
      key: 'ketamina',
      dataIndex: 'respuestas_ketamina',
      render: (_, { respuestas_ketamina }) => (
        <Space direction='vertical'>
          <>Gusto por la ketamina: <Progress percent={respuestas_ketamina.ketamina * 10} /></>
          <>Anhelo/Apetito de ketamina: <Progress percent={respuestas_ketamina.ketaminaiv * 10} /></>
          <>Deseo de Ketamina IV: <Progress percent={respuestas_ketamina.ketaminaivb * 10} /></>
        </Space>
      ),
    },
    {
      title: 'Efectos',
      key: 'Efectos',
      dataIndex: 'respuestas_ketamina',
      render: (_, { respuestas_ketamina }) => (
        <div>
          {respuestas_ketamina.Aumento_de_la_Presión_Arterial && <Tag color="red">Aumento de la presion arterial</Tag>}
          {respuestas_ketamina.Debilidad_o_Mareos_ligeros && <Tag color="red">Debilidad o Mareos ligeros</Tag>}
          {respuestas_ketamina.Dolor_de_cabeza && <Tag color="red">Dolor de cabeza</Tag>}
          {respuestas_ketamina.Mareos && <Tag color="red">Mareos</Tag>}
          {respuestas_ketamina.Nauseas && <Tag color="red">Nauseas</Tag>}
          {respuestas_ketamina.Sentimientos_de_Ansiedad && <Tag color="red">Sentimientos de Ansiedad</Tag>}
        </div>
      ),
    },

  ];

  return (
    <div>
      <br />
      <h4>Resultados de listas de verificacion para efectos secundarios</h4>
      <br />
      {
        usuario.rol === 'Administrador' && <Form.Item label="Medico" name="usuario" rules={[{ required: true, message: 'Selecciona el paciente' }]}
          style={{ alignItems: 'center', paddingTop: 20 }}>
          <Select
            style={{ width: 260, }}
            onChange={getEncuestasData}
            placeholder='Selecciona un medico'
          >
            {
              medicosData.map((p) => {
                return <Option key={p._id} value={p._id}>{p.name}</Option>
              })
            }
          </Select>
        </Form.Item>
      }
      <br />
      <Table dataSource={efectosData} columns={columns} scroll={{ x: 1300 }} />

    </div>
  )
}
