import React, { useState, useEffect } from 'react'
import { getData, usuario } from '../../resources'
import getAllEscalas from '../getEscalas'
import { Button, Table, Modal } from 'antd'
import Pcl5Details from './pcl5.details'
import EscalasCreateGeneralLink from '../escalasCreateGeneralLink'

export default function Pcl5Results() {


  const [encuestasData, setEncuestasData] = useState([])
  const [loading, setLoading] = useState(true)

  // For Creating Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => { setIsModalOpen(true) };
  const handleOk = () => { setIsModalOpen(false) };
  const handleCancel = () => { setIsModalOpen(false) };

  // Modal for details
  const [escalaForDetails, setEscalaForDetails] = useState("")
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const showDetailsModal = () => { setIsDetailsModalOpen(true) };
  const handleDetailsOk = () => { setIsDetailsModalOpen(false) };
  const handleDetailsCancel = () => { setIsDetailsModalOpen(false) };

  useEffect(() => {
    (usuario.rol === 'Administrador' || usuario.rol === 'Recepcion' || usuario.rol === 'Enfermero') ? getAllEscalas('pcl_5', setEncuestasData, setLoading) : getEncuestasData(usuario._id)
  }, [])

  const getEncuestasData = (medico) => {
    getData(`encuestas/byDoctorAndTipo/${medico}/pcl_5`).then((rs) => {
      console.log(rs);
      setEncuestasData(rs)
    })
  }

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
      render: (_, { pcl_5 }) => (<>
        <Button onClick={() => { setEscalaForDetails(pcl_5); showDetailsModal() }}>Ver detalles</Button>
      </>),
    },
  ]

  return (
    <div>
      <h4 className='spacedTitle'>Resultados de encuestas PCL-5</h4>
      <Button type="primary" onClick={showModal}>
        Crear Link Encuesta PCL-5
      </Button>

      <br /><br />

      <h4>Detalles de encuestas</h4>
      <Table columns={detailsColumns} dataSource={encuestasData} bordered />

      <Modal title="Crear Encuesta PCL-5" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel}>Cerrar</Button>
        ]} destroyOnClose >
        <EscalasCreateGeneralLink tipo='pcl_5' />
      </Modal>

      <Pcl5Details escalaDetails={escalaForDetails} handleCancel={handleDetailsCancel} handleOk={handleDetailsOk} isModalOpen={isDetailsModalOpen} />

    </div>
  )
}