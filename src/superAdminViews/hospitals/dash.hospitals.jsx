import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Modal, Popconfirm } from 'antd';
import Loading from '../../loading'
import { API, deleteData } from '../../resources'
import Register from './register.hospital';

export default function Dash() {

  const [isLoading, setILoading] = useState(true);
  const [hospitalesData, setHospitalesData] = useState([]);
  const [hospitalForEdit, setHospitalForEdit] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    getHospitalesData()
  }, [])

  useEffect(() => {
    getHospitalesData()
  }, [isModalVisible])

  const getHospitalesData = () => {
    fetch(API + 'sucursales')
      .then(response => response.json())
      .then(data => { console.log(data); setHospitalesData(data); setILoading(false); });
  }

  // Edit Hospital
  const editHospital = async (h) => {
    await setHospitalForEdit(h)
    setIsModalVisible(true);
    console.log('Editar hospital: ', h)
  }
  // Confitmar Borrar
  const confirm = (e) => {
    console.log('toDel: ', e);
    deleteData('sucursales/remove/' + e._id).then(() => getHospitalesData())
  };
  const cancel = (e) => {
    console.log(e);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //Start tabla data
  const columns = [
    {
      title: 'Logo',
      key: 'logo',
      render: (_, record) => (
        <img src={'https://api.recreamed.com/images/' + record.logo} alt="Logo" width={64} />
      ),
    },
    {
      title: 'Sucursal',
      dataIndex: 'nombre'
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
    },
    {
      title: 'Opciones',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button size='small' onClick={() => { editHospital(record) }}>
            Editar
          </Button>
          <Popconfirm
            title="Seguro que quiere borrar esta sucursal?"
            onConfirm={() => confirm(record)}
            onCancel={cancel}
            okText="Si"
            cancelText="No"
          >
            <Button danger size='small'>
              Borrar
            </Button>
          </Popconfirm>

        </Space>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }
  //End tabla data

  return (
    isLoading ? <Loading /> :
      <div>
        <h1>Hospitales</h1>
        <Table columns={columns} dataSource={hospitalesData} onChange={onChange} />

        <Modal width={800} title="Editar Hospital" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true} footer={[]}>
          <Register hospital={hospitalForEdit} setModalVisible={setIsModalVisible} />
        </Modal>
      </div>
  )

}

