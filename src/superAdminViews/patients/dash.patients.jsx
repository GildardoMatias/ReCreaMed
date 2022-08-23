import React, { useState, useEffect } from 'react'
import { Table, Space, Button, Card, Modal, Popconfirm } from 'antd'
import { API, deleteData } from '../../resources';
import Loading from '../../loading';
import Register from './register.patient'

export default function Dash() {

  const [usuario, setUsuario] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isLoading, setILoading] = useState(true);
  const [pacientesData, setPacientesData] = useState([]);
  const [patientForEdit, setPatientForEdit] = useState(null)
  const showModal = () => { setIsModalVisible(true); };
  const handleOk = () => { setIsModalVisible(false); };
  const handleCancel = () => { setIsModalVisible(false); };
  const handleOkEdit = () => { setIsEditModalVisible(false); };
  const handleCancelEdit = () => { setIsEditModalVisible(false); };

  useEffect(() => {
    getPacientesData()
  }, [])

  const getPacientesData = () => {
    fetch(API + 'users_by_rol/Paciente')
      .then(response => response.json())
      .then(data => {
        console.log(data); setPacientesData(data);
      })
      .finally(() => setILoading(false))
  }

  const editPatient = async (p) => {
    await setPatientForEdit(p)
    setIsEditModalVisible(true);
    console.log('Editar paciente: ', p)
  }

  const deletePatient = (patient) => {
    deleteData('/users/remove/' + patient._id).then(() => {
      console.log('removed: ', patient._id);
      getPacientesData()
    })
  }

  const columns = [
    {
      title: 'Foto',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (_, record) => (
        <img src={'https://api.recreamed.com/images/' + record.avatar} alt="Logo" width={64} />
      ),
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
      key: 'tel',
    },
    // {
    //   title: 'Detalles',
    //   key: 'detalles',
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <Button onClick={() => { setUsuario(record); showModal(); }}>Detalles</Button>
    //     </Space>
    //   )
    // },
    {
      title: 'Opciones',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button size='small' onClick={() => { editPatient(record) }}>
            Editar
          </Button>
          <Popconfirm
            title="Seguro que quiere borrar este paciente?"
            onConfirm={() => deletePatient(record)}
            // onCancel={cancel}
            okText="Si"
            cancelText="No"
          >
            <Button danger size='small'>
              Borrar
            </Button>
          </Popconfirm>

        </Space>
      ),
    }
  ];

  const gridStyle = {
    width: '50%',
    height: '50px',
    textAlign: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  function DetalleUsuario() {
    return <div>
      <Card bordered={false}>
        {
          Object.keys(usuario).map(k => {
            return <><Card.Grid style={gridStyle}>{k}</Card.Grid><Card.Grid style={gridStyle} size='small'>{usuario[k]}</Card.Grid></>
          })
        }
      </Card>
    </div>
  }

  return (
    <div>
      <h4>Pacientes</h4>
      {isLoading ? <Loading /> :

        <Table dataSource={pacientesData} columns={columns} />
      }
      <Modal width={800} title={<h4>Datos del paciente </h4>} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
        <DetalleUsuario />
      </Modal>

      <Modal width={1000} title={<h4>Editar Paciente</h4>} visible={isEditModalVisible} onOk={handleOkEdit} onCancel={handleCancelEdit} destroyOnClose
        footer={[]}
      >
        <Register paciente={patientForEdit} setIsModalVisible={setIsEditModalVisible}/>
      </Modal>
    </div>
  )

}
