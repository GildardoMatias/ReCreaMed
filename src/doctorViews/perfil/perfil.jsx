import React, { useState, useEffect } from 'react'
import { Row, Col, Space, Button,  Image } from 'antd';
import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { API, usuario } from '../../resources';
import Loading from '../../loading';
import { FormOutlined } from '@ant-design/icons';
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
                setProfileData(data[0]);
                setIsLoading(false);
            });
    }

    const editPerfil = async (p) => {
        p.horarios.forEach((h) => { h.sucursal = h.sucursal._id })
        setEditing(true);
    }

    const MiniCard = ({ universidad, carrera, cedula = '' }) => {
        return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, textAlign: 'left' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '30%', borderBottom: 'solid 2px #f5f6f8'  }}><div className='desc'>Universidad:</div><div>{universidad}</div> </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '30%', borderBottom: 'solid 2px #f5f6f8'  }}><div className='desc'>Carrera:</div><div>{carrera}</div></div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '30%', borderBottom: 'solid 2px #f5f6f8'  }}><div className='desc'>Cedula:</div><div>{cedula}</div></div>
        </div>
    }

    const DetailsProfile = () => {
        // Two columns of 8 spaces with 4 spaces around
        return <div>

            <Row gutter={8} style={{ backgroundColor: '#f5f6f8', borderRadius: 12, padding: 8 }}>
                <Col span={8} >
                    <Card style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        {
                            // Profile Pic
                            profileData.avatar.length > 9 ?
                                <Image style={{ borderRadius: 12 }} width={256} src={'https://api.recreamed.com/images/' + profileData.avatar} alt='medic-profile-pic' />
                                :
                                <Avatar size={128} icon={<UserOutlined />} className='btnIconCentered' />
                        }
                        <br />
                        <br />
                        <br />
                        <p className='nombre'>{profileData.name} </p>
                        <p className='datos'>{profileData.rol} </p>
                        {
                            profileData.especialidad && <p className='datos'>{profileData.especialidad} </p>
                        }
                        <p className='datos'>{profileData.email} </p>
                        <p className='datos'>{profileData.telefono} </p>
                    </Card>
                </Col>

                <Col span={7}>
                    <Card title='Horarios' size='small' style={{ height: '100%' }} >
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

                    {/* <Card title='Datos Academicos' size='small' style={cardStyle}>
                        <p><span className='desc'>Certificacion:</span> {profileData.certificacion} </p>
                        <p><span className='desc'>Cedula:</span> {profileData.cedula} </p>
                    </Card> */}
                </Col>

                <Col span={9}>
                    <Card title='Universidades' size='small' style={{ height: '100%' }}>

                        {
                            profileData.universidades && profileData.universidades.map((u) => {
                                return <MiniCard {...u} />
                            })
                        }
                    </Card>
                </Col>

            </Row>
            <br />
            <Configuration id_usuario={usuario._id} correo={usuario.email} />
        </div>
    }

    return (
        <div className='mainContainer'>

            <Space>
                <h3>PERFIL</h3>
                <Button onClick={() => editPerfil(profileData)} type="primary" shape="circle" icon={<FormOutlined />} className='btnIconCentered' />
            </Space>
            {isLoading ? <Loading /> :
                <div>
                    {
                        editing ?

                            <>
                                <PerfilEdit perfil={profileData} setEditing={setEditing} />
                                <Button onClick={() => setEditing(false)}>Cancelar</Button>
                            </> :
                            <DetailsProfile />
                    }
                </div>
            }
        </div>
    )
}
