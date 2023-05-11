import React, { useState, useEffect } from 'react'
import { getData } from '../../resources';
import { Row, Col } from 'antd';
import { Avatar, Card, Divider, Button } from 'antd';
import Loading from '../../loading';
import { FormOutlined, UserOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons';
import Register from './register.patient';


export default function DetallesPaciente(props) {
    const [pacienteData, setPacienteData] = useState(props.paciente);
    // const [pacienteLoading, setPacienteLoading] = useState(true);
    const [editing, setEditing] = useState(false)

    // useEffect(() => {
    //     getData(`getuser/${props.paciente}`).then(rs => { console.log("DetallePac: ", rs); setPacienteData(rs); setPacienteLoading(false) });
    // }, [props.paciente])

    const ProfileDetails = () => {
        return editing ?
            <Register setAdding={setEditing} paciente={pacienteData} getPacientesData={props.getPacientesData}/>
            :
            <div style={{ width: '98%', borderRadius: 12 }} bordered={false}>
                {/* <div className='fila'><h5>Datos del Paciente</h5><Button className='btnIconCentered' onClick={() => setEditing(true)} size='small' disabled={!props.paciente} type="primary" ghost shape="circle" icon={<FormOutlined className='sizedIcon' />} /></div> */}
                <br />
                <Row >
                    <Col span={8} >
                        <div className='fila' style={{ display: 'flex', justifyContent: 'center' }}>
                            {
                                pacienteData.avatar.length > 9 ?
                                    <img width={128} src={'https://api.recreamed.com/images/' + pacienteData.avatar} alt='ProfilePic' style={{ alignSelf: 'center' }} /> :
                                    <Avatar size={128} icon={<UserOutlined />} className='btnIconCentered' style={{ alignSelf: 'center' }} />
                            }
                        </div>

                        <br />
                        <br />
                        <div style={{ margin: 'auto', width: '80%' }}>
                            <p className='nombre'><UserOutlined style={{ marginRight: 10 }} /> {pacienteData.name}</p>
                            <p className='datos'><MailOutlined style={{ marginRight: 10 }} /> {pacienteData.email}</p>
                            <p className='datos'><MobileOutlined style={{ marginRight: 10 }} /> {pacienteData.telefono}</p>
                        </div>
                    </Col>

                    <Col span={7} offset={1}
                    //  className='columnWithDescriptions'
                    >
                        <Row><Col span={10}><span className='desc'>Responsable:</span></Col><Col span={10}>{pacienteData.responsable.nombre}</Col> </Row>
                        <Row><Col span={10}><span className='desc'>Sexo:</span></Col><Col span={10}>{pacienteData.sexo}</Col> </Row>
                        <Row><Col span={10}><span className='desc'>Edad:</span></Col><Col span={10}>{pacienteData.edad}</Col> </Row>
                        <Row><Col span={10}><span className='desc'>Peso:</span></Col><Col span={10}>{pacienteData.peso}</Col> </Row>
                        <Row><Col span={10}><span className='desc'>Talla:</span></Col><Col span={10}>{pacienteData.talla}</Col></Row>
                        <Row><Col span={10}><span className='desc'>Ocupacion:</span></Col><Col span={10}> {pacienteData.ocupacion}</Col></Row>
                        <Row><Col span={10}><span className='desc'>Estado Civil:</span></Col><Col span={10}> {pacienteData.estado_civil}</Col></Row>
                        <Row><Col span={10}><span className='desc'>Fuma:</span></Col><Col span={10}>{pacienteData.fuma ? 'Si' : 'No'}</Col> </Row>
                        <Row><Col span={10}><span className='desc'>Alcohol:</span></Col><Col span={10}>{pacienteData.alcohol ? 'Si' : 'No'}</Col> </Row>
                        <Row><Col span={10}><span className='desc'>Drogas:</span></Col><Col span={10}>{pacienteData.drogas}</Col> </Row>
                        <Row><Col span={10}><span className='desc'>cuales_drogas:</span></Col><Col span={10}>{pacienteData.cuales_drogas}</Col> </Row>
                        <Row><Col span={10}><span className='desc'>Diagnostico:</span></Col><Col span={10}>{pacienteData.peso}</Col> </Row>
                        <Row><Col span={10}><span className='desc'>Enfermedades familiares:</span></Col><Col span={10}>{pacienteData.enfermedades_familiares.map((e) => <p>{e}</p>)}</Col> </Row>
                        <Row><Col span={10} ><span className='desc'>Enfermedades Medicas:</span></Col><Col span={10}><div style={{ width: 160, height: 8 }}>{pacienteData.enfermedades_medicas.map((e) => <p style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{e}</p>)}</div></Col> </Row>
                    </Col>
                    <Col span={7} offset={1}>
                        <Row><Col span={10}><span className='desc'>Tratamientos Actuales:</span></Col><Col span={10}>{pacienteData.tratamiento_actual.map((t) => <p>{t}</p>)}</Col> </Row>
                        <Row><Col span={10}><span className='desc'>Diagnostico:</span></Col><Col span={10}>{pacienteData.diagnostico}</Col> </Row>
                        <Row><Col span={10}><span className='desc'>Escolaridad:</span></Col><Col span={10}> {pacienteData.escolaridad}</Col></Row>
                        <Row><Col span={10}><span className='desc'>Ciudad:</span></Col><Col span={10}> {pacienteData.ciudad}</Col></Row>
                        <Row><Col span={10}><span className='desc'>Luga de Nacimiento:</span></Col><Col span={10}>{pacienteData.lugar_de_nacimiento}</Col> </Row>
                        <Divider plain style={{ color: '#b3bfc4' }}>Direccion</Divider>
                        <Row><Col span={10}><span className='desc'>N. Interior:</span></Col><Col span={10}> {pacienteData.numinterior}</Col></Row>
                        <Row><Col span={10}><span className='desc'>N. Exterior:</span></Col><Col span={10}> {pacienteData.numexterior}</Col></Row>
                        <Row><Col span={10}><span className='desc'>Calle:</span></Col><Col span={10}> {pacienteData.calle}</Col></Row>
                        <Row><Col span={10}><span className='desc'>Colonia:</span></Col><Col span={10}> {pacienteData.colonia}</Col></Row>
                        <Row><Col span={10}><span className='desc'>Municipio:</span></Col><Col span={10}> {pacienteData.municipio}</Col></Row>
                        <Row><Col span={10}><span className='desc'>Estado:</span></Col><Col span={10}> {pacienteData.estado}</Col></Row>
                        <Row><Col span={10}><span className='desc'>C.P.:</span></Col><Col span={10}>{pacienteData.codigopostal}</Col> </Row>
                    </Col>
                </Row >
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6, marginBottom: 6 }}><Button className='btnIconCentered' onClick={() => setEditing(true)} disabled={!props.paciente} type="primary" ghost title='Editar Datos' icon={<FormOutlined className='sizedIcon' />} >Editar Datos</Button></div>

            </div >
    }

    return (
        // <div className='mainContainer'>
        <div>

            <Row>
                <ProfileDetails />
            </Row>

        </div>
    )
}
