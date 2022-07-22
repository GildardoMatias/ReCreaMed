import React, { useState, useEffect } from 'react'
import { getData } from '../../resources';
import { Row, Col } from 'antd';
import { Avatar, Card, Space, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Loading from '../../loading';
import { FormOutlined } from '@ant-design/icons';
import Register from './register.patient';


export default function DetallesPaciente(props) {
    const [pacienteData, setPacienteData] = useState([]);
    const [pacienteLoading, setPacienteLoading] = useState(true);
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        getData(`getuser/${props.paciente}`).then(rs => { console.log("DetallePac: ", rs); setPacienteData(rs); setPacienteLoading(false) });
    }, [props.paciente])

    const ProfileDetails = () => {
        return editing ?
            <>
                <Register setAdding={setEditing} paciente={pacienteData} />
                {/* Editando
                <Button onClick={() => setEditing(false)}>Guardar</Button> */}
            </> :
            <Card style={{ width: '98%', borderRadius: 12 }}>
                <Space><h5>Datos del Paciente</h5><Button onClick={() => setEditing(true)} size='small' disabled={!props.paciente} type="primary" shape="circle" icon={<FormOutlined />} /></Space>
                <Row>
                    <Col span={10}>
                        <Row justify="center"><Col span={12}><Avatar size={128} icon={<UserOutlined />} /></Col></Row>
                        <br />
                        <Row><Col span={8}>Nombre:</Col><Col span={10}>{pacienteData.name}</Col></Row>
                        <Row><Col span={8}>Correo:</Col><Col span={10}>{pacienteData.email}</Col></Row>
                        <Row><Col span={8}>Telefono:</Col><Col span={10}>{pacienteData.telefono}</Col></Row>
                    </Col>
                    <Col span={10}>
                        <Row><Col span={8}>Telefono:</Col><Col span={10}>{pacienteData.telefono}</Col></Row>
                        <Row><Col span={8}>Estado:</Col><Col span={10}> {pacienteData.estado}</Col></Row>
                        <Row><Col span={8}>Municipio:</Col><Col span={10}> {pacienteData.municipio}</Col></Row>
                        <Row><Col span={8}>Colonia:</Col><Col span={10}> {pacienteData.colonia}</Col></Row>
                        <Row><Col span={8}>Calle:</Col><Col span={10}> {pacienteData.calle}</Col></Row>
                        <Row><Col span={8}>Codigo Postal:</Col><Col span={10}>{pacienteData.codigopostal}</Col> </Row>
                    </Col>
                </Row>
            </Card>
    }

    return (
        // <div className='mainContainer'>
        <div>

            {pacienteLoading ? <Loading /> :
                <Row>
                    <ProfileDetails />
                </Row>
            }
        </div>
    )
}
