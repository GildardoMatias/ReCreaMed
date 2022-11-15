import React, { useState, useEffect } from 'react'
import { Card, Collapse, Button, Tabs, Row, Col, Modal, Space, Typography, message } from 'antd';
import { getData, API, updateData, usuario } from '../../resources';
import { PlusOutlined, ExperimentOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons';
import { NuevaNota } from './nuevaNota';
import DetalleReceta from './detalleReceta';
const { Panel } = Collapse;
const { Paragraph } = Typography;

export default function DetalleNota(props) {

    const [notaData, setNotaData] = useState([]);
    const [notaLoading, setnotaLoading] = useState(true);
    const [view, setView] = useState('detalles');
    const [notaForEdit, setNotaForEdit] = useState("")
    // Add Nota Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => { setIsModalVisible(true) };
    const handleOk = () => { setIsModalVisible(false) };
    const handleCancel = () => { setIsModalVisible(false) };
    // End of Add Nota Modal
    // Edit Nota Modal
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const showEditModal = () => { setIsEditModalVisible(true) };
    const handleEditOk = () => { setIsEditModalVisible(false) };
    const handleEditCancel = () => { setIsEditModalVisible(false) };
    const editarNota = async (n) => { await setNotaForEdit(n); setIsEditModalVisible(true) }
    // End of Edit Nota Modal


    useEffect(() => {
        // console.log('Paciente received to detailNota: ', props.paciente)
        props.paciente ?
            getNotasData()
            :
            finishGet()
    }, [props.paciente])

    const getNotasData = () => {
        getData(`notas/${props.paciente}`).then(rs => {
            console.log('NotasData: ', rs);
            rs.forEach((nt, i) => {
                nt.label = 'Nota' + (i + 1);
            });
            setNotaData(rs);
            setnotaLoading(false)
        })
    }
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

    const createNota = async () => {
        let newNotaBody = {
            id_usuario: props.paciente,
            id_medico: usuario._id,
            edad: 1,
            talla: 1,
            imc: 1,
            peso: 1,
            temperatura: 1,
            presion_arterial: "---/---",
            frecuencia_cardiaca: 1,
            frecuencia_respiratoria: 1,
            estudios: [],
            Observaciones: "",
            recetas: []
        }
        const newNota = await fetch(API + 'notas/add', {
            method: 'POST',
            body: JSON.stringify(newNotaBody),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(response => {
                message.success(response.message || response.error);
                // response.message && response.message === ''
                return response;
            })
            .catch(error => console.error('Error:', error))

        // Add new nota to received notas
        props.prevExpNotas.push(newNota.id_nota)
        //Update nota at expedient
        fetch(API + 'expedientes/updateNotas/' + props.id_expediente, {
            method: 'PUT',
            body: JSON.stringify({ "notas": props.prevExpNotas }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(response => {
                console.log('Update Exp:', response);
                message.success(response.message || response.error);
            })
            .catch(error => console.error('Error:', error))
            .finally(() => { getNotasData() })
    };

    const updateNota = (originalNota, field, newString) => {
        originalNota[field] = newString;
        console.log(originalNota)
        updateData(`notas/update/${originalNota._id}`, originalNota).then((rs) => { getNotasData() })
    }
    const items = notaData.map((nota, i) => {
        return {
            label: `Nota ${i + 1}`,
            key: nota._id,
            children: <Row>
                {/* Mitad de la pantalla para NOTA*/}
                <Col span={12}>
                    <Collapse bordered={false}>
                        <Panel header="Detalles de la nota" key="1">
                            <Card >
                                <Card.Grid style={NotaGridStyle}>Edad: <Paragraph editable={{ onChange: (ns) => updateNota(nota, "edad", ns) }} >{nota.edad}</Paragraph></Card.Grid>
                                <Card.Grid style={NotaGridStyle}>Talla:<Paragraph editable={{ onChange: (ns) => updateNota(nota, "talla", ns) }} >{nota.talla}</Paragraph></Card.Grid>
                                <Card.Grid style={NotaGridStyle}>Peso: <Paragraph editable={{ onChange: (ns) => updateNota(nota, "peso", ns) }} >{nota.peso}</Paragraph></Card.Grid>
                                <Card.Grid style={NotaGridStyle}>IMC: <Paragraph editable={{ onChange: (ns) => updateNota(nota, "imc", ns) }} >{nota.imc}</Paragraph></Card.Grid>
                                <Card.Grid style={NotaGridStyle}>Temperatura: <Paragraph editable={{ onChange: (ns) => updateNota(nota, "temperatura", ns) }} >{nota.temperatura}</Paragraph></Card.Grid>
                                <Card.Grid style={NotaGridStyle}>Presion Arterial: <Paragraph editable={{ onChange: (ns) => updateNota(nota, "presion_arterial", ns) }} >{nota.presion_arterial}</Paragraph></Card.Grid>
                                <Card.Grid style={NotaGridStyle}>Frecuencia Cardiaca : <Paragraph editable={{ onChange: (ns) => updateNota(nota, "frecuencia_cardiaca", ns) }} >{nota.frecuencia_cardiaca}</Paragraph></Card.Grid>
                                <Card.Grid style={NotaGridStyle}>Frecuencia Respiratoria : <Paragraph editable={{ onChange: (ns) => updateNota(nota, "frecuencia_respiratoria", ns) }} >{nota.edad}</Paragraph></Card.Grid>
                            </Card>
                        </Panel>
                    </Collapse>

                    <Card title='Observaciones'>
                        <Paragraph editable={{ onChange: (ns) => updateNota(nota, "Observaciones", ns) }} >
                            {nota.Observaciones}
                        </Paragraph>
                    </Card>

                    <Card title='Diagnostico'>
                        {nota.diagnostico}
                    </Card>

                    <Card title='Entradas'>

                    </Card>
                    <Card title='Tratamiento'>

                    </Card>

                    <Card title='Estudios'>
                        {nota.estudios.map((e) => {
                            return <Card.Grid style={EstudioGridStyle}>
                                <a href={`${API}notas/estudios/download/${e}`}><ExperimentOutlined />{e}<DownloadOutlined /> </a>
                            </Card.Grid>
                        })}
                    </Card>
                    <Button style={{ float: 'right' }} onClick={() => { editarNota(nota) }} size='small' type="primary" icon={<EditOutlined />} >Editar Nota</Button>
                </Col>
                <Col span={12}>
                    {/* La otra mitad de la pantalla para receta */}
                    <DetalleReceta recetas={nota.recetas} id_nota={nota._id} />
                </Col>
            </Row>
        }
    }).reverse()

    return <div>

        <Space>
            <h5>Notas </h5>
            <Button onClick={createNota} size='small' type="primary" shape="circle" icon={<PlusOutlined />} />
        </Space>

        {
            notaLoading ? <h5>Cargando Nota...</h5> : <Tabs items={items} />
        }

        <Modal title="Nueva Nota" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={680} footer={[]} destroyOnClose>
            <NuevaNota id_expediente={props.id_expediente} paciente={props.paciente} prevExpNotas={props.prevExpNotas} setIsModalVisible={setIsModalVisible} />
        </Modal>

        <Modal title="Editar Nota" visible={isEditModalVisible} onOk={handleEditOk} onCancel={handleEditCancel} width={680} footer={[]} destroyOnClose>
            <NuevaNota nota={notaForEdit} setIsModalVisible={setIsEditModalVisible} />
        </Modal>

    </div>


}
