import React, { useState, useEffect } from 'react'
import { Table, Space, Button, Card, Modal, Avatar } from 'antd'
import { API } from '../../resources';
import Loading from '../../loading';
import { UserOutlined } from '@ant-design/icons'

export default function Dash() {

  const [usuario, setUsuario] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => { setIsModalVisible(true); };
  const handleOk = () => { setIsModalVisible(false); };
  const handleCancel = () => { setIsModalVisible(false); };
  const [isLoading, setILoading] = useState(true);
  const [pacientesData, setPacientesData] = useState([]);

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

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (_, { avatar }) => {
        return avatar.length > 9 ?
          <img width={64} src={'https://api.recreamed.com/images/' + avatar} alt='ProfilePic' /> :
          <Avatar size={64} icon={<UserOutlined />} />
      }
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Medicos Asignados',
      dataIndex: 'medicos_asignados',
      key: 'medicos_asignados',
      render: (_, { medicos_asignados }) => <Space direction='vertical'>{
        medicos_asignados.map((m) => <div key={m}>{m}</div>)
      }</Space>
    },
    {
      title: 'Telefono',
      dataIndex: 'telefono',
      key: 'tel',
    },
    {
      title: 'Detalles',
      key: 'detalles',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => { setUsuario(record); showModal(); }}>Detalles</Button>
        </Space>
      )
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
    <div className='mainContainer'>
      <h4>Usuarios</h4>
      {isLoading ? <Loading /> :

        <Table dataSource={pacientesData} columns={columns} />
      }
      <Modal width={800} title={<h4>Detalles de la nota </h4>} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <DetalleUsuario />
      </Modal>
    </div>
  )

}
