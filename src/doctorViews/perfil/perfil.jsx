import React, { useState, useEffect } from 'react'
import { Row, Col, Space, Button, Divider, Image } from 'antd';
import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { API, usuario } from '../../resources';
import Loading from '../../loading';
import {  FormOutlined } from '@ant-design/icons';
import PerfilEdit from './perfilEdit';
import Configuration from './configuration';

export default function Perfil() {

    const [profileData, setProfileData] = useState([]);
    const [editing, setEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

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
        setEditing(true);
        console.log('Editar medico: ', p)
    }

    const DetailsProfile = () => {
        // Two columns of 8 spaces with 4 spaces around
        return <div>
            <Row>
                <Col span={8} offset={4}>
                    {
                        // Profile Pic
                        profileData.avatar.length > 8 ?
                            <Image style={{ borderRadius: 12 }} width={256} src={'https://api.recreamed.com/images/' + profileData.avatar} />
                            :
                            <Avatar size={128} icon={<UserOutlined />} className='btnIconCentered' />
                    }
                    <Divider />
                    <p className='nombre'>{profileData.name} </p>
                    <p className='datos'>{profileData.email} </p>
                    <p className='datos'>{profileData.telefono} </p>
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
                    <p><span className='desc'>Universidad:</span> {profileData.universidad} </p>
                    <p><span className='desc'>Certificacion:</span> {profileData.certificacion} </p>
                    <p><span className='desc'>Cedula:</span> {profileData.cedula} </p>
                </Col>



            </Row>
            <Configuration id_usuario={usuario._id} />
        </div>
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
                                <Button onClick={() => setEditing(false)}>Cancelar</Button>
                            </> :
                            <DetailsProfile />
                    }
                </Card>
            }
        </div>
    )
}
