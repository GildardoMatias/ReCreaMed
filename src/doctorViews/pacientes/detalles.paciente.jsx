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
            </> :
            <Card style={{ width: '98%', borderRadius: 12 }} bordered={false}>
                <Space><h5>Datos del Paciente</h5><Button onClick={() => setEditing(true)} size='small' disabled={!props.paciente} type="primary" shape="circle" icon={<FormOutlined />} /></Space>
                <Row>
                    <Col span={8}>
                        <Row justify="center"><Col span={12}>
                            {
                                pacienteData.avatar.length > 9 ?
                                    <img width={128} src={'https://api.recreamed.com/images/' + pacienteData.avatar} alt='ProfilePic' /> :
                                    <Avatar size={128} icon={<UserOutlined />} />
                            }
                        </Col></Row>
                        <br />
                        <Row><Col span={8}>Nombre:</Col><Col span={10}>{pacienteData.name}</Col></Row>
                        <Row><Col span={8}>Correo:</Col><Col span={10}>{pacienteData.email}</Col></Row>
                        <Row><Col span={8}>Telefono:</Col><Col span={10}>{pacienteData.telefono}</Col></Row>
                        <Row><Col span={8}>Estado:</Col><Col span={10}> {pacienteData.estado}</Col></Row>
                        <Row><Col span={8}>Municipio:</Col><Col span={10}> {pacienteData.municipio}</Col></Row>
                        <Row><Col span={8}>Colonia:</Col><Col span={10}> {pacienteData.colonia}</Col></Row>
                        <Row><Col span={8}>Calle:</Col><Col span={10}> {pacienteData.calle}</Col></Row>
                    </Col>
                    <Col span={8}>
                        <Row><Col span={8}>C.P.:</Col><Col span={10}>{pacienteData.codigopostal}</Col> </Row>
                        <Row><Col span={8}>Sexo:</Col><Col span={10}>{pacienteData.sexo}</Col> </Row>
                        <Row><Col span={8}>Edad:</Col><Col span={10}>{pacienteData.edad}</Col> </Row>
                        <Row><Col span={8}>Peso:</Col><Col span={10}>{pacienteData.peso}</Col> </Row>
                        <Row><Col span={8}>Talla:</Col><Col span={10}>{pacienteData.talla}</Col></Row>
                        <Row><Col span={8}>Ocupacion:</Col><Col span={10}> {pacienteData.ocupacion}</Col></Row>
                        <Row><Col span={8}>Diagnostico:</Col><Col span={10}>{pacienteData.diagnostico}</Col> </Row>
                        <Row><Col span={8}>Estado Civil:</Col><Col span={10}> {pacienteData.estado_civil}</Col></Row>
                        <Row><Col span={8}>Escolaridad:</Col><Col span={10}> {pacienteData.escolaridad}</Col></Row>
                        <Row><Col span={8}>Ciudad:</Col><Col span={10}> {pacienteData.ciudad}</Col></Row>
                        <Row><Col span={8}>Luga de Nacimiento:</Col><Col span={10}>{pacienteData.lugar_de_nacimiento}</Col> </Row>
                        <Row><Col span={8}>Fuma:</Col><Col span={10}>{pacienteData.fuma}</Col> </Row>
                        <Row><Col span={8}>alcohol:</Col><Col span={10}>{pacienteData.alcohol}</Col> </Row>
                    </Col>
                    <Col span={8}>
                        <Row><Col span={10}>drogas:</Col><Col span={10}>{pacienteData.drogas}</Col> </Row>
                        <Row><Col span={10}>cuales_drogas:</Col><Col span={10}>{pacienteData.cuales_drogas}</Col> </Row>
                        <Row><Col span={10}>Diagnostico:</Col><Col span={10}>{pacienteData.peso}</Col> </Row>
                        <Row><Col span={10}>Enfermedades familiares:</Col><Col span={10}>{pacienteData.enfermedades_familiares.map((e) => <p>{e}</p>)}</Col> </Row>
                        <Row><Col span={10}>Enfermedades Medicas:</Col><Col span={10}>{pacienteData.enfermedades_medicas.map((e) => <p>{e}</p>)}</Col> </Row>
                        <Row><Col span={10}>Tratamiento Actual:</Col><Col span={10}>{pacienteData.tratamiento_actual.map((t) => <p>{t}</p>)}</Col> </Row>
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
