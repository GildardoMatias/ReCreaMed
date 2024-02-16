import React, { useEffect, useState } from 'react'
import { Card, Tabs, Row, Col, Button } from 'antd';
import Padecimiento from './padecimiento';
import { getData } from '../../resources'
import { PlusOutlined } from '@ant-design/icons';
import NuevaNota from './nuevaNota';
import FDetalleReceta from './detalleReceta';
import LastCita from '../expedientes/lastCita';
import Bitacora from './bitacora';
import Goniometria from './goniometria';
import ExamenManMusc from './examenManMusc';
import DetalleReceta from '../expedientes/detalleReceta'

// It's called nota, but actually is the complete expedient 

export default function NotaFisio({ id_paciente, pacienteData }) { // PacienteData is used for Recetas

    const mobile = window.matchMedia("(max-width: 500px)").matches;

    const [expedienteData, setExpedienteData] = useState(null)

    const [addExpedienteModalOpen, setAddExpedienteModalOpen] = useState(false)

    useEffect(() => {
        getExpedienteData()
    }, [id_paciente])

    useEffect(() => {
        getExpedienteData()
    }, [addExpedienteModalOpen])

    const getExpedienteData = () => {
        getData(`fexpedientes/${id_paciente}`).then((rs) => {
            console.log('ExpedienteData ', rs)
            setExpedienteData(rs)
        })
    }

    const onChange = (key) => {
        console.log(key);
    };

    const items = expedienteData ? expedienteData.map((nota, i) => { // 1 nota = 1 expedient ----- N notas = expedient = array of notas
        return {
            label: `Nota ${i + 1}`,
            key: nota._id,
            children: <Row gutter={8} style={{ backgroundColor: 'white' }}>

                {/* Mitad de la pantalla para Receta y last cita*/}
                <Col span={5} >

            
                    <LastCita paciente={id_paciente} />

                    <Bitacora bitacoras={nota.bitacoras} id_nota={nota._id} getExpedienteData={getExpedienteData} />
                </Col>

                {/* la otra mitad de la pantalla para NOTA*/}
                <Col span={19}>
                    <Card>

                        <Padecimiento fisio_data={nota} />

                        <div className={mobile ? 'columna' : 'fila'}>
                            <Goniometria id_expediente={nota._id} goniometria={nota.goniometria} getExpedienteData={getExpedienteData} />
                            <ExamenManMusc id_expediente={nota._id} examenes={nota.examenes} getExpedienteData={getExpedienteData} />
                        </div>



                    </Card>
                </Col>

            </Row>
        }
    }) : []


    return <Card style={{ marginTop: 15 }} >

        <div style={{ display: 'flex', flexDirectrion: 'row', gap: 10, alignItems: 'center' }}>
            <h5>Notas </h5>
            {
                <Button className='btnIconCentered' onClick={() => { setAddExpedienteModalOpen(true) }} size='small' type="primary" shape="circle" icon={<PlusOutlined />} ghost />
            }
        </div>


        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

        <NuevaNota id_paciente={id_paciente} isModalOpen={addExpedienteModalOpen} setIsModalOpen={setAddExpedienteModalOpen} />
    </Card>
}
