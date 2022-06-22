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
            <Card style={{width: '100%'}}>
                <Row>
                    <Col span={8}>

                        <Avatar size={128} icon={<UserOutlined />} />
                        <br />
                        <br />
                        <p>Nombre: {pacienteData.name} </p>
                        <p>Correo: {pacienteData.email} </p>
                        <p>Telefono: {pacienteData.telefono} </p>

                    </Col>
                    <Col span={8}>

                        <p>Estado: {pacienteData.estado}</p>
                        <p>Municipio: {pacienteData.municipio}</p>
                        <p>Colonia: {pacienteData.colonia}</p>
                        <p>Calle: {pacienteData.calle}</p>
                        <p>Codigo Postal:{pacienteData.codigopostal} </p>

                    </Col>
                </Row>
            </Card>
    }

    return (
        // <div className='mainContainer'>
        <div>
            <Space>
                <h4>Datos del Paciente</h4>
                <Button onClick={() => setEditing(true)} size='small' disabled={!props.paciente} type="primary" shape="circle" icon={<FormOutlined />} />
            </Space>
            {pacienteLoading ? <Loading /> :
                <Row>
                    <ProfileDetails />
                </Row>
            }
        </div>
    )
}
