import React, { useState, useEffect } from 'react'
import { Row, Col, Space, Button, Divider, Image } from 'antd';
import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { API, usuario } from '.././resources';
import Loading from '.././loading';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';
import PerfilEdit from './perfilEdit';

export default function PerfilAdministrador() {

  const [profileData, setProfileData] = useState([]);
  const [profileForEdit, setProfileForEdit] = useState([]);
  const [editing, setEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    getProfileData()
  }, [])

  useEffect(() => {
    getProfileData()
  }, [editing])

  const getProfileData = () => {
    fetch(API + 'userByMail/' + usuario.email)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setProfileData(data[0]);
        setIsLoading(false);
      });
  }

  const editPerfil = async (p) => {
    p.horarios.forEach((h) => { h.sucursal = h.sucursal._id })
    console.log('Horarios before edit profile: ', p.horarios);
    await setProfileForEdit(p)
    setEditing(true);
    console.log('Editar medico: ', p)
  }

  const DetailsProfile = () => {
    return <Row>
      <Col span={8}>
        {
          // Profile Pic
          profileData.avatar.length > 8 ?
            <Image style={{ borderRadius: 12 }} width={256} src={'https://api.recreamed.com/images/' + profileData.avatar} />
            :
            <Avatar size={128} icon={<UserOutlined />} style={{ marginLeft: 80 }} />
        }
        <br /><br />
        <p>Nombre: {profileData.name} </p>
        <p>Correo: {profileData.email} </p>
        <p>Telefono: {profileData.telefono} </p>
      </Col>
      {/* <Col span={8}>
                <p>Estado: {profileData.estado}</p>
                <p>Municipio: {profileData.municipio}</p>
                <p>Colonia: {profileData.colonia}</p>
                <p>Calle: {profileData.calle}</p>
                <p>Codigo Postal:{profileData.codigopostal} </p>
            </Col> */}
      <Col span={8}>
        <Card title='Horarios' style={{ borderRadius: 12 }}>
          {
            profileData.horarios.map((h) => {
              return <Card.Grid style={{ width: '100%' }} >
                <Row align="middle">
                  <Col span={6} offset={4}><img width={64} src={'https://api.recreamed.com/images/' + h.sucursal.logo} alt="Logo" /></Col>
                  <Col span={10}>{h.sucursal.nombre} <br /> {h.horario}</Col>
                </Row>
              </Card.Grid>
            })
          }
        </Card>
        <br />
        {/* <p>Universidad: {profileData.universidad} </p> */}
      </Col>



    </Row>
  }

  return (
    <div className='mainContainer'>

      <Space>
        <h3>PERFIL</h3>
        <Button onClick={() => editPerfil(profileData)} type="primary" shape="circle" icon={<FormOutlined />} />
      </Space>
      {isLoading ? <Loading /> :
        <Card style={{ borderRadius: 16 }}>
          {
            editing ?

              <>
                <PerfilEdit perfil={profileData} setEditing={setEditing} />
                <Button shape="circle" title='Cancelar' />
                <Button onClick={() => setEditing(false)}>Cancelar</Button>
              </> :
              <DetailsProfile />
          }
        </Card>
      }
    </div>
  )
}
