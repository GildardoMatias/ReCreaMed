import React, { useState } from 'react'
import { useEffect } from 'react';
import { Space, Table, Tag, Progress, Button, Modal } from 'antd'
import { Form, Select } from 'antd';
import { getData, usuario, sendDataBody } from '../../resources';
import KetaminaCreateLink from './ketaminaCreateLink';
const { Option } = Select;

export default function KetaminaResults() {

  const [efectosData, setEfectosData] = useState(null);
  const [medicosData, setMedicosData] = useState([])
  const [countersData, setCountersData] = useState([])
  const [loadingCounters, setLoadingCounters] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    usuario.rol === 'Administrador' ? getDoctorsData() : getEncuestasData(usuario._id)
  }, [])

  // Modal For Create Link
  const showModal = () => { setIsModalOpen(true) };
  const handleOk = () => { setIsModalOpen(false) };
  const handleCancel = () => { setIsModalOpen(false) };

  const getDoctorsData = () => { //Para el caso que la sesion sea de Administrador
    const body = { ids: usuario.medicos_asignados }
    sendDataBody(`users/getMany`, body).then(rs => { setMedicosData(rs); console.log('medicosData: ', rs); })
  }

  const getEncuestasData = (medico) => {
    getData(`encuestas/ketamina/medico/${medico}`).then((rs) => {
      console.log('Encuestas ', rs);
      getCounters(rs, medico);
      setEfectosData(rs)
    })
  }

  const getCounters = (data, medico) => {
    const allEncuestas = [...data];
    const results = []
    getData(`mispacientes/${medico}`).then(rs => {
      rs.forEach(pac => {
        const aprs = allEncuestas.filter(enc => enc.usuario._id === pac._id)
        const latest = aprs.at(-1)
        results.push({
          'paciente': pac.name,
          'total': aprs.length,
          'semana': latest?.createdAt.substring(0, 10)
        })
      });
      console.log(results)
    }).finally(() => { setCountersData(results); setLoadingCounters(false) });
  }

  const counterColumns = [
    {
      title: 'Paciente',
      key: 'paciente',
      dataIndex: 'paciente',
    },
    {
      title: 'Fecha ultima encuesta',
      key: 'semana',
      dataIndex: 'semana',
    },
    {
      title: 'Total encuestas',
      key: 'total',
      dataIndex: 'total'
    }
  ];
  const columns = [

    {
      title: 'Usuario',
      key: 'usuario',
      dataIndex: 'usuario',
      render: (_, { usuario }) => (<>{usuario.name}</>),
      sorter: true,
    },
    {
      title: 'Fecha',
      key: 'fecha',
      dataIndex: 'createdAt',
      render: (fecha) => (<>{fecha.substring(0, 10)}</>),
      width: '9%'
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
      <Button type="primary" onClick={showModal}>
        Crear Link Ketamina
      </Button>
      <br />

      {
        usuario.rol === 'Administrador' && <Form.Item label="Selecciona un Medico" name="usuario" rules={[{ required: true, message: 'Selecciona el paciente' }]}
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

      <Table dataSource={countersData} columns={counterColumns} loading={loadingCounters} bordered />
      <br />
      <h4>Detalles de encuestas</h4>
      <br />
      <Table dataSource={efectosData} columns={columns} scroll={{ x: 1300 }} bordered />

      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <KetaminaCreateLink />
      </Modal>
    </div>
  )
}
