import React from 'react'
import { Avatar, Card, Divider, Button, Row, Col } from 'antd';
import { FormOutlined, UserOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons';
import DetallesFisioModal from './detalles.fisio.modal';

export default function DetallesPaciente({ paciente, setIsEditModalOpen }) {

    const TYPE = "fisio";

    return (<div style={{ marginTop: 16, paddingBottom: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'white', width: '25%', borderRadius: 8 }}>

        <div style={{ textAlign: 'center', marginTop: 8 }}>
            {
                paciente.avatar && paciente.avatar.length > 9 ?
                    <img width={82} src={'https://api.recreamed.com/images/' + paciente.avatar} alt='ProfilePic' style={{ alignSelf: 'center' }} /> :
                    <Avatar size={82} icon={<UserOutlined />} className='btnIconCentered' style={{ alignSelf: 'center' }} />
            }
            <div style={{ height: 8 }}></div>
            <p className='nombre'><UserOutlined style={{ marginRight: 10 }} /> {paciente.name}</p>
            <p className='datos'><MailOutlined style={{ marginRight: 10 }} /> {paciente.email}</p>
            <p className='datos'><MobileOutlined style={{ marginRight: 10 }} /> {paciente.telefono}</p>
            {/* {
                TYPE === 'fisio' && <DetallesFisioModal userData={paciente} />
            } */}

            <div style={{ display: 'flex', flexDirection: 'row-reverse', paddingRight: 16 }}>
                <Button className='btnIconCentered' onClick={() => setIsEditModalOpen(true)} size='small' type="primary" shape="circle" icon={<FormOutlined className='sizedIcon' />} ghost />
            </div>
        </div>

    </div>)
}
