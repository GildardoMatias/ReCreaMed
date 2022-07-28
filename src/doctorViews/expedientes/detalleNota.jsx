import React, { useState, useEffect } from 'react'
import { Card, Collapse, Button, Tabs, Row, Col, Modal, Space } from 'antd';
import { getData, API } from '../../resources';
import { PlusOutlined, ExperimentOutlined, DownloadOutlined } from '@ant-design/icons';
import { NuevaNota } from './nuevaNota';
import DetalleReceta from './detalleReceta';
const { TabPane } = Tabs;
const { Panel } = Collapse;

export default function DetalleNota(props) {

    const [notaData, setNotaData] = useState("");
    const [notaLoading, setnotaLoading] = useState(true);
    const [view, setView] = useState('detalles');
    const [notaDetail, setNotaDetail] = useState("")
    // Add Nota Modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    // End of Add Nota Modal


    useEffect(() => {
        // console.log('Paciente received to detailNota: ', props.paciente)
        props.paciente ?
            getData(`notas/${props.paciente}`).then(rs => { console.log('NotasData: ', rs); setNotaData(rs); setnotaLoading(false) })
            :
            finishGet()
    }, [props.paciente])

    const finishGet = () => { setNotaData([]); setnotaLoading(false); }

    const gridStyle = {
        // width: '50%',
        width: '100%',
        height: '32',
        textAlign: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const NotaGridStyle = {
        width: '25%',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 255)'
    };
    const EstudioGridStyle = {
        width: '50%',
        // height: '32',
        textAlign: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center'
    };


    const NotaView = () => {
        switch (view) {
            case 'detalles':
                return <>{
                    notaData.length > 0 ?
                        Object.keys(notaData[0]).map(k => {
                            return <><Card.Grid key={k} style={gridStyle}>{k}</Card.Grid><Card.Grid style={gridStyle} size='small'>{notaData[0][k]}</Card.Grid></>
                        })
                        :
                        <h6>No hay una nota asignada</h6>
                }</>
            case 'adding':
                return <>Adding
                    <NuevaNota id_expediente={props.id_expediente} paciente={props.paciente} prevExpNotas={props.prevExpNotas} />
                    <Button onClick={() => setView('detalles')} >Cancelar</Button>
                </>
            case 'editing':
                return <>Editing
                    <Button onClick={() => setView('detalles')} >Cancelar</Button>
                </>
            default:
                <>Notas del paciente</>
        }
    }



    return <div>

        <Space>
            <h5>Notas </h5>
            <Button onClick={showModal} size='small' type="primary" shape="circle" icon={<PlusOutlined />} />
        </Space>

        <Tabs tabPosition='top' onTabClick={(k, e) => { console.log('OnTABClickNota', k); setNotaDetail(k) }}>

            {notaLoading ? <h5>Cargando Nota...</h5> :

                notaData.map((nota, i) => {
                    let index = i + 1;
                    return <TabPane tab={`Nota ${index}`} key={nota._id} style={{ width: '100%'}}>
                        <Row>
                            <Col span={12}>
                                <Collapse bordered={false}>
                                    <Panel header="Detalles de la nota" key="1">
                                        <Card >
                                            <Card.Grid style={NotaGridStyle}>Edad: {nota.edad}</Card.Grid>
                                            <Card.Grid style={NotaGridStyle}>Talla: {nota.talla}</Card.Grid>
                                            <Card.Grid style={NotaGridStyle}>Peso: {nota.peso}</Card.Grid>
                                            <Card.Grid style={NotaGridStyle}>IMC: {nota.imc}</Card.Grid>
                                            <Card.Grid style={NotaGridStyle}>Temperatura: {nota.temperatura}</Card.Grid>
                                            <Card.Grid style={NotaGridStyle}>Presion Arterial : {nota.presion_arterial}</Card.Grid>
                                            <Card.Grid style={NotaGridStyle}>Frecuencia Cardiaca : {nota.frecuencia_cardiaca}</Card.Grid>
                                            <Card.Grid style={NotaGridStyle}>Frecuencia Respiratoria : {nota.frecuencia_respiratoria}</Card.Grid>
                                        </Card>
                                    </Panel>
                                </Collapse>

                                <Card title='Observaciones'>
                                    {nota.Observaciones}
                                </Card>
                               
                                <Card title='Diagnostico'>
                                    {nota.diagnostico}
                                </Card>

                                <Card title='Estudios'>
                                    {nota.estudios.map((e) => {
                                        return <Card.Grid style={EstudioGridStyle}>
                                            <a href={`${API}notas/estudios/download/${e}`}><ExperimentOutlined />{e}<DownloadOutlined /> </a>
                                        </Card.Grid>
                                    })}
                                </Card>

                            </Col>
                            <Col span={12}>
                                <DetalleReceta recetas={nota.recetas} id_nota={nota._id} />
                            </Col>
                        </Row>
                    </TabPane>
                })
            }

        </Tabs>


        <Modal title="Nueva Nota" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={680}>
            <NuevaNota id_expediente={props.id_expediente} paciente={props.paciente} prevExpNotas={props.prevExpNotas} />

        </Modal>

    </div>
}
