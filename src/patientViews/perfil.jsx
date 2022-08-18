import React, { useState, useEffect } from 'react'
import { Row, Col, Space, Button } from 'antd';
import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { API, usuario } from '.././resources';
import Loading from '.././loading';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';
import PerfilEdit from './perfilEdit';


export default function Perfil() {

    const [profileData, setProfileData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [profileForEdit, setProfileForEdit] = useState([]);
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
                <Card>
                    {
                        profileData.avatar.length > 8 ?
                            <img width={256} src={'https://api.recreamed.com/images/' + profileData.avatar} alt='ProfilePic' /> :
                            <Avatar size={128} icon={<UserOutlined />} />
                    }
                    <br />
                    <p>Nombre: {profileData.name} </p>
                    <p>Correo: {profileData.email} </p>
                    <p>Telefono: {profileData.telefono} </p>
                </Card>
            </Col>
            {/* <Col span={8}>
                <Card>
                    <p>Universidad: {profileData.universidad} </p>
                    <p>Certificacion: {profileData.certificacion} </p>
                    <p>Cedula: {profileData.cedula} </p>
                </Card>
            </Col> */}
            <Col span={8}>
                <Card>
                    <p>Estado: {profileData.estado}</p>
                    <p>Municipio: {profileData.municipio}</p>
                    <p>Colonia: {profileData.colonia}</p>
                    <p>Calle: {profileData.calle}</p>
                    <p>Codigo Postal:{profileData.codigopostal} </p>
                </Card>
            </Col>
        </Row>
    }
    const editPerfil = async (p) => {
        p.horarios.forEach((h) => { h.sucursal = h.sucursal._id })
        console.log('Horarios before edit profile: ', p.horarios);
        await setProfileForEdit(p)
        setEditing(true);
        console.log('Editar medico: ', p)
    }

    return (
        <div className='mainContainer'>

            <Space>
                <h3>PERFIL</h3>
                <Button onClick={() => editPerfil(profileData)} type="primary" shape="circle" icon={<FormOutlined />} />

            </Space>
            {isLoading ? <Loading /> :
                <Card>
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
