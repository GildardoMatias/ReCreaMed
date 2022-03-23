import React, { useState } from 'react'
import { Card, Button, Modal, Row, Col, Space, Table, Tag } from 'antd';
import { NuevaNota } from './nuevaNota';


export function DoctorNotas() {

    const [nota, setNota] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => { setIsModalVisible(true); };
    const handleOk = () => { setIsModalVisible(false); };
    const handleCancel = () => { setIsModalVisible(false); };

    const [isModalDetailVisible, setIsModalDetailVisible] = useState(false);
    const showDetailModal = () => { setIsModalDetailVisible(true); };
    const handleDetailOk = () => { setIsModalDetailVisible(false); };
    const handleDetailCancel = () => { setIsModalDetailVisible(false); };
    const columns = [
        {
            title: 'Paciente',
            dataIndex: 'Paciente',
            key: 'Paciente',
            render: text => <a>{text}</a>,
        }, {
            title: 'Edad',
            dataIndex: 'Edad',
            key: 'Edad',
        },
        // {
        //     title: 'Talla',
        //     dataIndex: 'Talla',
        //     key: 'Talla',
        // },
        {
            title: 'Peso',
            dataIndex: 'Peso',
            key: 'Peso',
        },

        {
            title: 'Observaciones',
            key: 'Observaciones',
            dataIndex: 'observaciones',
            render: observaciones => (
                <>
                    {observaciones.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'diabetes') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Detalles',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => { showDetailModal(); setNota(record) }}>Detalles</Button>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            fecha: '10/1/2022',
            Paciente: "Jhon Doe",
            Edad: 18,
            Talla: 32,
            Peso: "55 kg",
            IMC: 32,
            temperatura: "36 C",
            presion_arterial: "180 120",
            frec_cardiaca: "void",
            frec_respiratoria: 32,
            estudios: 'Analisis de sangre',
            observaciones: ['ocio', 'colesterol'],
        },
        {
            key: '2',
            fecha: '08/01/2022',
            Paciente: "Jane Doe",
            Edad: 18,
            Talla: 32,
            Peso: "55 kg",
            IMC: 32,
            temperatura: "36 C",
            presion_arterial: "180 120",
            frec_cardiaca: "void",
            frec_respiratoria: 32,
            estudios: 'Prueba de glucosa',
            observaciones: ['diabetes'],
        },
        {
            key: '3',
            fecha: '14/12/2021',
            Paciente: "Bob Stanley",
            Edad: 18,
            Talla: 32,
            Peso: "55 kg",
            IMC: 32,
            temperatura: "36 C",
            presion_arterial: "180 120",
            frec_cardiaca: "void",
            frec_respiratoria: 32,
            estudios: 'Revision',
            observaciones: ['vacio'],
        },
    ];

    const gridStyle = {
        width: '50%',
        height: '50px',
        textAlign: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    function DetalleNota() {
        return <div>
            <Card bordered={false}>
                {
                    Object.keys(nota).map(k => {
                        return <><Card.Grid style={gridStyle}>{k}</Card.Grid><Card.Grid style={gridStyle} size='small'>{nota[k]}</Card.Grid></>
                    })
                }
            </Card>
        </div>
    }
    return (
        <div className='mainContainer'>
            <Row>
                <Col span={8}><h4>Notas de los pacientes del medico</h4></Col>
                <Col>
                    <Button type="primary" onClick={showModal}>
                        Nueva Nota
                    </Button>
                </Col>
            </Row>

            
            <Table columns={columns} dataSource={data} />



            <Modal width={800} title={<h4>Crear Nota</h4>} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <NuevaNota />
            </Modal>
            <Modal width={800} title={<h4>Detalles de la nota </h4>} visible={isModalDetailVisible} onOk={handleDetailOk} onCancel={handleDetailCancel}>
                <DetalleNota />
            </Modal>
        </div>
    )
}
