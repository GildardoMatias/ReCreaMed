import React, { useState, useEffect } from 'react'
import { Row, Col, Space, Button } from 'antd';
import { Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { API } from '.././resources';
import Loading from '.././loading';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';


export default function Perfil() {

    const [profileData, setProfileData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProfileData()
    }, [])

    const getProfileData = () => {
        fetch(API + 'userByMail/medico@realidadcreativa.com')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProfileData(data[0]);
                setIsLoading(false);
            });
    }

    const detailsProfile = () => {
        return <>
        </>
    }

    return (
        <div className='mainContainer'>

            <Space>
                <h3>PERFIL</h3>
                <Button type="primary" shape="circle" icon={<FormOutlined />} />
            </Space>
            {isLoading ? <Loading /> :
                <Row>
                    <Col span={8}>
                        <Card>
                            <Avatar size={128} icon={<UserOutlined />} />
                            <br />
                            <p>Nombre: {profileData.name} </p>
                            <p>Correo: {profileData.email} </p>
                            <p>Telefono: {profileData.telefono} </p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <p>Universidad: {profileData.universidad} </p>
                            <p>Certificacion: {profileData.certificacion} </p>
                            <p>Cedula: {profileData.cedula} </p>
                        </Card>
                    </Col>
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
        </div>
    )
}
