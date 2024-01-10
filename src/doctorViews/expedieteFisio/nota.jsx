import React, { useEffect, useState } from 'react'
import { Card, Tabs, Row, Col, Button } from 'antd';
import Padecimiento from './padecimiento';
import { getData } from '../../resources'
import { PlusOutlined } from '@ant-design/icons';
import NuevaNota from './nuevaNota';

// It's called nota, but actually is the complete expedient 

export default function NotaFisio({ id_paciente }) {

    const [expedienteData, setExpedienteData] = useState(null)

    const [addExpedienteModalOpen, setAddExpedienteModalOpen] = useState(false)

    useEffect(() => {
        getExpedienteData()
    }, [])

    useEffect(() => {
        getExpedienteData()
    }, [addExpedienteModalOpen])

    const getExpedienteData = () => {
        getData(`fexpedientes/${id_paciente}`).then((rs) => {
            setExpedienteData(rs)
        })
    }

    const onChange = (key) => {
        console.log(key);
    };

    const items = [
        {
            key: '1',
            label: 'Nota 2',
            children: <Row gutter={8} style={{ backgroundColor: 'white' }}>


                {/* Mitad de la pantalla para Receta */}
                <Col span={6} >
                    {/* <DetalleReceta recetas={nota.recetas} id_nota={nota._id} paciente={props.paciente} /> */}

                    {/* <p>RECETAS</p>

                    <p>CITA RECIENTE</p>

                    <p>BITACORA</p> */}

                </Col>

                {/* la otra mitad de la pantalla para NOTA*/}
                <Col span={18}>
                    {/* <NotasEvolucion _notas_evolucion={nota.notas_evolucion} id_nota={nota._id} /> */}
                    {/* <p>PADECIMIENTO</p>

                    <p>RANGOS DE MOVIMIENTO</p>

                    <p>EXAMEN MANUAL MUSCULAR</p> */}
                </Col>

            </Row>
        },
        {
            key: '2',
            label: 'Nota 1',
            children: <Row gutter={8} style={{ backgroundColor: 'white' }}>


                {/* Mitad de la pantalla para Receta */}
                <Col span={6} >
                    {/* <DetalleReceta recetas={nota.recetas} id_nota={nota._id} paciente={props.paciente} /> */}

                    <p>RECETAS</p>

                    <p>CITA RECIENTE</p>

                    <p>BITACORA</p>

                </Col>

                {/* la otra mitad de la pantalla para NOTA*/}
                <Col span={18}>
                    {/* <NotasEvolucion _notas_evolucion={nota.notas_evolucion} id_nota={nota._id} /> */}
                    <Card title='PADECIMIENTO ACTUAL'>
                        <Padecimiento />

                        <p>RANGOS DE MOVIMIENTO</p>

                        <p>EXAMEN MANUAL MUSCULAR</p>
                    </Card>
                </Col>

            </Row>
        },
    ];

    return <Card style={{ marginTop: 15 }} >

        <div style={{ display: 'flex', flexDirectrion: 'row', gap: 10, alignItems: 'center' }}>
            <h5>Notas </h5>
            {
                <Button className='btnIconCentered' onClick={() => { setAddExpedienteModalOpen(true) }} size='small' type="primary" shape="circle" icon={<PlusOutlined />} ghost />
            }
        </div>

        {expedienteData && JSON.stringify(expedienteData)}

        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

        <NuevaNota id_paciente={id_paciente} isModalOpen={addExpedienteModalOpen} setIsModalOpen={setAddExpedienteModalOpen} />
    </Card>
}
