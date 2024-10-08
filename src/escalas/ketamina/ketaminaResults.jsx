import React, { useState } from 'react'
import { useEffect } from 'react';
import { Space, Table, Tag, Progress, Button, Modal } from 'antd'
import { Form, Select } from 'antd';
import { getData, usuario, sendDataBody, ids_hospitales } from '../../resources';
import LoadingIndicator from '../loadingIndicator'
import EscalasCreateGeneralLink from '../escalasCreateGeneralLink';
import Loading from '../../loading';
import getAllEscalas from '../getEscalas';
import KetaminaDetails from './ketaminaDetails';
const { Option } = Select;

export default function KetaminaResults() {

  const [ketaminaData, setKetaminaData] = useState(null);
  const [medicosData, setMedicosData] = useState([])
  const [countersData, setCountersData] = useState([])
  const [loadingCounters, setLoadingCounters] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true)

  // Modal for details
  const [escalaForDetails, setEscalaForDetails] = useState("")
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const showDetailsModal = () => { setIsDetailsModalOpen(true) };
  const handleDetailsOk = () => { setIsDetailsModalOpen(false) };
  const handleDetailsCancel = () => { setIsDetailsModalOpen(false) };



  useEffect(() => {
    // usuario.rol === 'Administrador' ? getDoctorsData() : getEncuestasData(usuario._id)

    // New Form
    // If session is recept/admin get escalas of all medicos of my hospital
    // Else if session is medico get escalas for me
    if (usuario.rol === 'Recepcion' || usuario.rol === 'Administrador') getAllEscalas('ketamina', setKetaminaData, setLoading)
    else getEncuestasData(usuario._id)

    // getEcuestasDataByHospital()
  }, [])

  // Modal For Create Link
  const showModal = () => { setIsModalOpen(true) };
  const handleOk = () => { setIsModalOpen(false) };
  const handleCancel = () => { setIsModalOpen(false) };

  const getDoctorsData = () => { //Para el caso que la sesion sea de Administrador
    sendDataBody('users/getMany/hospitals', { ids_hospitales: ids_hospitales }).then(rs => {
      setMedicosData(rs)
    })
  }



  // If session is medic
  const getEncuestasData = (medico) => {
    getData(`encuestas/ketamina/medico/${medico}`).then((rs) => {
      console.log('Encuestas ', rs);
      // getCounters(rs, medico);
      setKetaminaData(rs)
    }).finally(() => setLoading(false))
  }

  // If session is admin/recept
  const getEcuestasDataByHospital = async () => {
    let allEncs = [];
    // 1  get medicos of my hospital
    const myDoctors = await sendDataBody('users/getMany/hospitals', { ids_hospitales: ids_hospitales })
    // 2 get escalas of each medico
    myDoctors.forEach(async (doc) => {
      await getData(`encuestas/ketamina/medico/${doc._id}`).then((rs) => {
        allEncs = [...allEncs, rs]
      })
    });
    console.log('All Encuestas: ', allEncs)
  }


  // const getCounters = (data, medico) => {
  //   const allEncuestas = [...data];
  //   const results = []
  //   getData(`mispacientes/${medico}`).then(rs => {
  //     console.log('getCounters ketam data: ', data)
  //     rs.forEach(pac => {
  //       const aprs = allEncuestas.filter(enc => enc.usuario?._id === pac._id) // Usuario can be deleted
  //       const latest = aprs.at(-1)
  //       results.push({
  //         'paciente': pac.name,
  //         'total': aprs.length,
  //         'semana': latest?.createdAt.substring(0, 10)
  //       })
  //     });
  //     console.log(results)
  //   }).finally(() => { setCountersData(results); setLoadingCounters(false) });
  // }

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
      render: (_, { usuario }) => (<>{usuario ? usuario.name : "usuario eliminado"}</>),
      // sorter: true,
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

  const detailsColumns = [
    {
      title: 'Usuario',
      key: 'usuario',
      dataIndex: 'usuario',
      render: (_, { usuario }) => (<>{usuario ? usuario.name : "usuario no existente"}</>),
      sorter: true
    },
    {
      title: 'Acciones',
      key: 'actions',
      dataIndex: 'actions',
      render: (_, { respuestas_ketamina }) => (<>
        <Button onClick={() => { setEscalaForDetails(respuestas_ketamina); showDetailsModal() }}>Ver detalles</Button>
      </>),
    },
  ]


  // if ((usuario.rol === 'Recepcion' || usuario.rol === 'Administracion') && !ketaminaData) return <h5>Seleccione un medico para ver los resultados de sus encuestas</h5>

  if (loading) return <Loading />

  return (
    <div>
      <br />
      <h4>Resultados de listas de verificacion para efectos secundarios</h4>
      <br />
      <Button type="primary" onClick={showModal}>
        Generar Escala
      </Button>
      <br />

      {/* {
        (usuario.rol === 'Administrador' || usuario.rol === 'Recepcion') && <Form.Item label="Selecciona un Medico" name="usuario" rules={[{ required: true, message: 'Selecciona el paciente' }]}
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
      } */}
      <br />

      {/* <Table dataSource={countersData} columns={counterColumns} loading={{ indicator: <LoadingIndicator />, spinning: loadingCounters }} bordered /> */}
      <br />
      <h4>Detalles de encuestas</h4>
      <br />

      {/* <Table dataSource={ketaminaData} columns={columns} scroll={{ x: 1300 }} bordered /> */}

      <Table dataSource={ketaminaData} columns={detailsColumns} scroll={{ x: 1300 }} bordered />


      <Modal title="Generar Escala de Ketamina" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel}>Cerrar</Button>
        ]}
      >
        {/* <KetaminaCreateLink /> */}
        <EscalasCreateGeneralLink tipo="ketamina" />
      </Modal>

      <KetaminaDetails escalaDetails={escalaForDetails} handleCancel={handleDetailsCancel} handleOk={handleDetailsOk} isModalOpen={isDetailsModalOpen} />
    </div>
  )
}
