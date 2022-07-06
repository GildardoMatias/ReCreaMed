import React, { useState, useEffect } from 'react'
import { Card, Collapse, Button, Modal, Form, Input, message, Tabs, Row, Col } from 'antd';
import { getData, API } from '../../resources';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';
import { NuevaNota } from './nuevaNota';
import DetalleReceta from './detalleReceta';
const { TabPane } = Tabs;
const { Panel } = Collapse;

export default function DetalleNota(props) {

    const [notaData, setNotaData] = useState("");
    const [notaLoading, setnotaLoading] = useState(true);
    const [view, setView] = useState('detalles');
    const [notaDetail, setNotaDetail] = useState("")
    // Modal
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

    // Finish Form of adding receta to expedient
    const onFinish = async (values) => {
        values.id_nota = props.notas[0];
        console.log('Success:', values);

        const newReceta = await fetch(API + 'recetas/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(res => res.json())
            .then(response => {
                console.log('Success:', response);
                message.info(response.message || response.error)
                response.message === 'Receta creada correctamente' ? setIsModalVisible(false) : console.log(response.error);
                return response;
            })
            .catch(error => console.error('Error:', error))


        // Update exoedient recetas
        fetch(API + 'expedientes/updateRecetas/' + props.id_expediente, {
            method: 'PUT',
            body: JSON.stringify({ "recetas": newReceta.id_receta }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(response => {
                console.log('Update Exp:', response);
                message.success(response.message || response.error);
            })
            .catch(error => console.error('Error:', error))

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    // End of Form

    useEffect(() => {
        // console.log('Paciente received to detailNota: ', props.paciente)
        props.paciente ?
            getData(`notas/${props.paciente}`).then(rs => {console.log(rs); setNotaData(rs); setnotaLoading(false) })
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
                            // return <><Card.Grid key={k} style={gridStyle}>{k}</Card.Grid><Card.Grid style={gridStyle} size='small'>{notaData[0][k]}</Card.Grid></>
                            return <><Card.Grid key={k} style={gridStyle}> {k} : {notaData[0][k]} {k === 'recetas' ? <Button onClick={() => setIsModalVisible(true)} size='small' type="primary" shape="circle" icon={<PlusOutlined />} /> : <></>}</Card.Grid></>
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
        {/* <Card bordered={false}>
            <Space>
            <Button onClick={() => setView('adding')} size='small' type="primary" shape="circle" icon={<PlusOutlined />} />
            <Button onClick={() => setView('editing')} size='small' type="primary" shape="circle" icon={<FormOutlined />} />
            </Space>
            {
                notaLoading ? <h5>Cargando Nota...</h5> :
                <NotaView />
            }
        </Card> */}
        <h5>Notas </h5>

        <Tabs tabPosition='top' onTabClick={(k, e) => { console.log('OnTABClickNota', k); setNotaDetail(k) }}>


            {notaLoading ? <h5>Cargando Nota...</h5> :

                notaData.map((nota, i) => {
                    let index = i + 1;
                    return <TabPane tab={`Nota ${index}`} key={nota._id} style={{ width: '100%' }}>
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

                                <Card title='Estudios'>
                                    {nota.estudios.map((e) => {
                                        return <Card.Grid style={EstudioGridStyle}>{e}</Card.Grid>
                                    })}
                                </Card>

                            </Col>
                            <Col span={12}>
                                <DetalleReceta recetas={nota.recetas} />
                            </Col>
                        </Row>


                    </TabPane>
                })
            }

        </Tabs>

        <Modal title="Nueva Receta" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            {/* <p>Nota: {notaData._id}</p> */}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Prescripcion"
                    name="prescripcion"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </div>
}
