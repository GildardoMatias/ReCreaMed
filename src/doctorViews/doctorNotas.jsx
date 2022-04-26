import React, { useState, useEffect } from 'react'
import { Card, Button, Modal, Row, Col, Space, Table, Tag } from 'antd';
import { NuevaNota } from './nuevaNota';
import { API } from '../resources';
import Loading from '../loading';


export function DoctorNotas() {

    const [nota, setNota] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [notasData, setNotasData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const showModal = () => { setIsModalVisible(true); };
    const handleOk = () => { setIsModalVisible(false); getNotasData();};
    const handleCancel = () => { setIsModalVisible(false); };

    const [isModalDetailVisible, setIsModalDetailVisible] = useState(false);
    const showDetailModal = () => { setIsModalDetailVisible(true); };
    const handleDetailOk = () => { setIsModalDetailVisible(false); };
    const handleDetailCancel = () => { setIsModalDetailVisible(false); };

    useEffect(() => {
      getNotasData()
    }, [])

    const getNotasData = () => {
        fetch( API + 'notas')
            .then(response => response.json())
            .then(data => {
                console.log(data); setNotasData(data);
                setIsLoading(false)
            })
            .finally(() => setIsLoading(false))
    }

    const columns = [
        {
            title: 'Paciente',
            dataIndex: 'id_usuario',
            key: 'Paciente',
            render: text => <a>{text}</a>,
        }, {
            title: 'Edad',
            dataIndex: 'edad',
            key: 'Edad',
        },
        {
            title: 'Talla',
            dataIndex: 'talla',
            key: 'Talla',
        },
        {
            title: 'IMC',
            dataIndex: 'imc',
            key: 'imc',
        },

        {
            title: 'Observaciones',
            key: 'Observaciones',
            dataIndex: 'observaciones',
            // render: observaciones => (
            //     <>
            //         {observaciones.map(tag => {
            //             let color = tag.length > 5 ? 'geekblue' : 'green';
            //             if (tag === 'diabetes') {
            //                 color = 'volcano';
            //             }
            //             return (
            //                 <Tag color={color} key={tag}>
            //                     {tag.toUpperCase()}
            //                 </Tag>
            //             );
            //         })}
            //     </>
            // ),
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

            { isLoading ? <Loading/> :  <Table columns={columns} dataSource={notasData} /> }




            <Modal width={800} title={<h4>Crear Nota</h4>} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <NuevaNota />
            </Modal>
            <Modal width={800} title={<h4>Detalles de la nota </h4>} visible={isModalDetailVisible} onOk={handleDetailOk} onCancel={handleDetailCancel}>
                <DetalleNota />
            </Modal>
        </div>
    )
}
