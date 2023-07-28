import React from 'react'
import { Avatar, Card, Divider, Button, Row, Col } from 'antd';
import { FormOutlined, UserOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons';

export default function DetallesPaciente({ paciente, setEditing }) {
    return (<div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'skyblue', borderRadius: 8 }}>

        <div style={{ textAlign: 'center', marginTop: 8 }}>
            {
                paciente.avatar.length > 9 ?
                    <img width={82} src={'https://api.recreamed.com/images/' + paciente.avatar} alt='ProfilePic' style={{ alignSelf: 'center' }} /> :
                    <Avatar size={82} icon={<UserOutlined />} className='btnIconCentered' style={{ alignSelf: 'center' }} />
            }
            <div style={{ height: 8 }}></div>
            <p className='nombre'><UserOutlined style={{ marginRight: 10 }} /> {paciente.name}</p>
            <p className='datos'><MailOutlined style={{ marginRight: 10 }} /> {paciente.email}</p>
            <p className='datos'><MobileOutlined style={{ marginRight: 10 }} /> {paciente.telefono}</p>
        </div>

        {/* <Card style={{ marginTop: 16 }}> Before, parent was a div and two Card children
            <p className='nombre'>Datos del Paciente</p>
            <Row><Col span={10}><span className='desc'>Responsable:</span></Col><Col span={10}>{paciente.responsable.nombre}</Col> </Row>
            <Row><Col span={10}><span className='desc'>Sexo:</span></Col><Col span={10}>{paciente.sexo}</Col> </Row>
            <Row><Col span={10}><span className='desc'>Edad:</span></Col><Col span={10}>{paciente.edad}</Col> </Row>
            <Row><Col span={10}><span className='desc'>Peso:</span></Col><Col span={10}>{paciente.peso}</Col> </Row>
            <Row><Col span={10}><span className='desc'>Talla:</span></Col><Col span={10}>{paciente.talla}</Col></Row>
            <Row><Col span={10}><span className='desc'>Ocupacion:</span></Col><Col span={10}> {paciente.ocupacion}</Col></Row>
            <Row><Col span={10}><span className='desc'>Estado Civil:</span></Col><Col span={10}> {paciente.estado_civil}</Col></Row>
            <Row><Col span={10}><span className='desc'>Fuma:</span></Col><Col span={10}>{paciente.fuma ? 'Si' : 'No'}</Col> </Row>
            <Row><Col span={10}><span className='desc'>Alcohol:</span></Col><Col span={10}>{paciente.alcohol ? 'Si' : 'No'}</Col> </Row>
            <Row><Col span={10}><span className='desc'>Drogas:</span></Col><Col span={10}>{paciente.drogas}</Col> </Row>
            <Row><Col span={10}><span className='desc'>cuales_drogas:</span></Col><Col span={10}>{paciente.cuales_drogas}</Col> </Row>
            <Row><Col span={10}><span className='desc'>Diagnostico:</span></Col><Col span={10}>{paciente.peso}</Col> </Row>
            <Row><Col span={10}><span className='desc'>Enfermedades familiares:</span></Col><Col span={10}>{paciente.enfermedades_familiares.map((e) => <p>{e}</p>)}</Col> </Row>
            <Row><Col span={10} ><span className='desc'>Enfermedades Medicas:</span></Col><Col span={10}><div style={{ width: 160, height: 8 }}>{paciente.enfermedades_medicas.map((e) => <p style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{e}</p>)}</div></Col> </Row>
            <Button className='btnIconCentered' onClick={() => setEditing(true)} size='small' type="primary" shape="circle" icon={<FormOutlined className='sizedIcon' />} style={{ position: 'absolute', bottom: 18, right: 18 }} ghost />
        </Card> */}

    </div>)
}
