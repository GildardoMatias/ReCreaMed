import React from 'react'
import { Card, Tabs, Row, Col } from 'antd';
import Padecimiento from './padecimiento';

export default function NotaFisio() {

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

                    <p>RECETAS</p>

                    <p>CITA RECIENTE</p>

                    <p>BITACORA</p>

                </Col>

                {/* la otra mitad de la pantalla para NOTA*/}
                <Col span={18}>
                    {/* <NotasEvolucion _notas_evolucion={nota.notas_evolucion} id_nota={nota._id} /> */}
                    <p>PADECIMIENTO</p>

                    <p>RANGOS DE MOVIMIENTO</p>

                    <p>EXAMEN MANUAL MUSCULAR</p>
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

    return <Card style={{ marginTop: 15 }} title='PADECIMIENTO ACTUAL'>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Card>
}
