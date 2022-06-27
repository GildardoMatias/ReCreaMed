import React, { useState, useEffect } from 'react'
import { Row, Col, Space, Button, Divider } from 'antd';
import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { API, usuario } from '.././resources';
import Loading from '.././loading';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';
import { PerfilEdit } from './perfilEdit';


export default function Perfil() {

    const [profileData, setProfileData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        getProfileData()
    }, [])

    const getProfileData = () => {
        fetch(API + 'userByMail/' + usuario.email)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProfileData(data[0]);
                setIsLoading(false);
            });
    }

    const DetailsProfile = () => {
        return <Row>
            <Col span={8}>
                <Avatar size={128} icon={<UserOutlined />} />
                <Divider />
                <p>Nombre: {profileData.name} </p>
                <p>Correo: {profileData.email} </p>
                <p>Telefono: {profileData.telefono} </p>
            </Col>
            <Col span={8}>
                <p>Estado: {profileData.estado}</p>
                <p>Municipio: {profileData.municipio}</p>
                <p>Colonia: {profileData.colonia}</p>
                <p>Calle: {profileData.calle}</p>
                <p>Codigo Postal:{profileData.codigopostal} </p>
            </Col>
            <Col span={8}>
                <p>Horarios</p>
                {
                    profileData.horarios.map((h) => {
                        return <div style={{paddingLeft: 12}}>
                            <p>Sucursal: {h.sucursal.nombre}</p>
                            <p>Horario: {h.horario}</p>
                        </div>
                    })
                }
                <p>Universidad: {profileData.universidad} </p>
                <p>Certificacion: {profileData.certificacion} </p>
                <p>Cedula: {profileData.cedula} </p>
            </Col>

        </Row>
    }

    return (
        <div className='mainContainer'>

            <Space>
                <h3>PERFIL</h3>
                <Button onClick={() => setEditing(true)} type="primary" shape="circle" icon={<FormOutlined />} />
            </Space>
            {isLoading ? <Loading /> :
                <Card>
                    {
                        editing ?

                            <>
                                <p>Editando</p>
                                <PerfilEdit perfil={profileData}/>
                                <Button onClick={() => setEditing(false)} type="primary" shape="circle" icon={<FormOutlined />} title='Cancelar' />
                            </> :
                            <DetailsProfile />
                    }
                </Card>
            }
        </div>
    )
}
