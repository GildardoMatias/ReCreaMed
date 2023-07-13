import React, { useState, useEffect } from 'react'
import { Card, Collapse, Button, Tabs, Row, Col, Modal, Space, Typography, message, Upload, Input, Select, Form } from 'antd';
import { getData, API, updateData, usuario } from '../../resources';
import { PlusOutlined, ExperimentOutlined, DownloadOutlined, EditOutlined, InboxOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { NuevaNota } from './nuevaNota';
import DetalleReceta from './detalleReceta';
import LastCita from './lastCita'
import { diagnosticos } from '../../assets/diagnosticos2';
import Soap from './soap'
const { Panel } = Collapse;
const { Paragraph } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;
const { Option, OptGroup } = Select;



export default function DetalleNota(props) {

    const [notaData, setNotaData] = useState([]);
    const [notaLoading, setnotaLoading] = useState(true);
    const [notaForEdit, setNotaForEdit] = useState("")
    // Add Nota Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOk = () => { setIsModalVisible(false) };
    const handleCancel = () => { setIsModalVisible(false) };
    // End of Add Nota Modal
    // Edit Nota Modal
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const handleEditOk = () => { setIsEditModalVisible(false) };
    const handleEditCancel = () => { setIsEditModalVisible(false) };
    const editarNota = async (n) => { await setNotaForEdit(n); setIsEditModalVisible(true) }
    // End of Edit Nota Modal
    // Edit Nota fields
    const [editingEntradas, setEditingEntradas] = useState(false)
    const [editingDiagnostico, setEditingDiagnostico] = useState(false)

    const id_paciente = props.paciente;

    useEffect(() => {
        console.log('Paciente received to detailNota: ', id_paciente)
        id_paciente ?
            getNotasData()
            :
            finishGet()
    }, [])

    useEffect(() => {
        console.log('Paciente received to detailNota: ', id_paciente)
        id_paciente ?
            getNotasData()
            :
            finishGet()
    }, [id_paciente])

    const getNotasData = () => {
        console.log('satring notas for: ', id_paciente);
        getData(`notas/${id_paciente}`).then(rs => {
            console.log('NotasData: ', rs);
            rs.forEach((nt, i) => {
                nt.label = 'Nota' + (i + 1);
            });
            setNotaData(rs);
            setnotaLoading(false)
        })
    }
    const finishGet = () => { setNotaData([]); setnotaLoading(false); }

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
            id_usuario: id_paciente,
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
    const onEntryFinish = (nota, values) => {
        console.log(values)
        console.log('Before:', nota)
        nota.entradas = [...nota.entradas, values];
        console.log('After:', nota)
        updateData(`notas/update/${nota._id}`, nota).then((rs) => {
            getNotasData()
        }).finally(() => setEditingEntradas(false))
    }

    const onEntryFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // Upload File For Estudios
    const dragDropProps = {
        name: 'file',
        multiple: true,
        action: API + 'notas/estudios/upload', // Production

        onChange(info) {
            const { status } = info.file;

            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                console.log('New Files: ', info.file.response.file)
                // setEstudiosFiles([...estudiosFiles, info.file.response.file])
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },

        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const items = notaData.map((nota, i) => {
        return {
            label: `Nota ${i + 1}`,
            key: nota._id,
            children: <Row gutter={8}>
                {/* Mitad de la pantalla para NOTA*/}
                <Col span={12}>
                    {/* Detalle nota and soap will come into enfermero nota */}
                    {/* <Soap />
                    <Collapse bordered={false} style={{ backgroundColor: '#fff' }}>
                        <Panel header={<Tooltip title="Haga Click para mostrar u ocultar" placement="right"><span>Detalles de la nota</span></Tooltip>} key="1">
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
                    </Collapse> */}

                    <Card title='Observaciones'>
                        <Paragraph editable={{ onChange: (ns) => updateNota(nota, "Observaciones", ns) }} >
                            {nota.Observaciones}
                        </Paragraph>
                    </Card>

                    <Card title='Diagnostico'>

                        {
                            nota.diagnostico ? <div>{nota.diagnostico}</div> : <Select
                                showSearch
                                placeholder='Selecciona un diagnostico'
                                style={{ width: 400 }}
                                onChange={(newValue) => updateNota(nota, "diagnostico", newValue)}
                            >
                                {
                                    Object.keys(diagnosticos).map((k) => {
                                        return <OptGroup label={k}>
                                            {Object.keys(diagnosticos[k]).map((sk) => {
                                                return <Option value={diagnosticos[k][sk]}>{diagnosticos[k][sk]}</Option>
                                            })}
                                        </OptGroup>

                                    })
                                }
                            </Select>
                        }
                    </Card>

                    <Card title='Entradas'>
                        {
                            editingEntradas ? <Form
                                name="add_entry_form"
                                // labelCol={{ span: 8 }}
                                // wrapperCol={{ span: 16 }}
                                onFinish={(vals) => onEntryFinish(nota, vals)}
                                onFinishFailed={onEntryFinishFailed}
                                autoComplete="off"
                            >
                                <Space>
                                    <Form.Item
                                        // label="Nueva entrada"
                                        name="descripcion"
                                        rules={[{ required: true, message: 'Ingresa la descripcion' }]}
                                    >
                                        <TextArea rows={2} placeholder="Ingresa los detalles" />
                                    </Form.Item>
                                    <Form.Item
                                    // wrapperCol={{ offset: 8, span: 16 }}
                                    >
                                        <div className='fila'>
                                            <Button className='btnIconCentered' type="primary" shape="circle" size='small' htmlType="submit" icon={<SaveOutlined />} />
                                            <Button className='btnIconCentered' type="primary" shape="circle" size='small' onClick={() => setEditingEntradas(false)} icon={<CloseOutlined />} />
                                        </div>
                                    </Form.Item>
                                </Space>
                            </Form> : <div className='fila'>
                                <ul>
                                    {
                                        nota.entradas && nota.entradas.map((e) => <li key={e._id}>{e.createdAt?.substring(0, 10)} - {e.descripcion}</li>)
                                    }
                                </ul>
                                <Button className='btnIconCentered' type="primary" shape="circle" ghost onClick={() => { setEditingEntradas(true) }} size='small' icon={<PlusOutlined />} />
                            </div>
                        }

                    </Card>

                    {/* <Card title='Tratamiento'>
                        <Select
                            defaultValue="Tratamiento 1"
                            style={{ width: 120 }}
                            // onChange={handleChange}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Tratamiento 1',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Tratamiento 2',
                                },
                                {
                                    value: 'Yiminghe',
                                    label: 'Tratamiento 3',
                                },
                            ]}
                        />
                    </Card> */}

                    <Card title='Estudios'>
                        {nota.estudios.map((e) => {
                            return <Card.Grid style={EstudioGridStyle}>
                                <a href={`${API}notas/estudios/download/${e}`}><ExperimentOutlined />{e}<DownloadOutlined /> </a>
                            </Card.Grid>
                        })}

                        <Dragger {...dragDropProps} style={{ padding: 6 }}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Arrastra los archivos de estudio aquí, o da click para buscar</p>
                            <p className="ant-upload-hint">
                                Selecciona archivos en pdf o imagen que sean menores a 2 MB para poder subirlos
                            </p>
                        </Dragger>
                    </Card>
                    <Button style={{ float: 'right' }} onClick={() => { editarNota(nota) }} size='small' type="primary" icon={<EditOutlined />} className='btnIconCentered'>Editar Nota</Button>
                </Col>
                <Col span={12} >
                    {/* La otra mitad de la pantalla para receta */}
                    <DetalleReceta recetas={nota.recetas} id_nota={nota._id} paciente={props.paciente} />

                    {/* Debajo de la receta esta la ultima cita */}
                    <LastCita paciente={id_paciente} />
                </Col>
            </Row>
        }
    }).reverse()

    // return <div style={{backgroundColor: '#fff', padding: 16}}>
    return <Card >

        <Space>
            <h5>Notas </h5>
            <Button className='btnIconCentered' onClick={createNota} size='small' type="primary" shape="circle" icon={<PlusOutlined />} ghost />
        </Space>

        {
            notaLoading ? <h5>Cargando Nota...</h5> : <Tabs items={items} />
        }

        <Modal title="Nueva Nota" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={680} footer={[]} destroyOnClose>
            <NuevaNota id_expediente={props.id_expediente} paciente={id_paciente} prevExpNotas={props.prevExpNotas} setIsModalVisible={setIsModalVisible} />
        </Modal>

        <Modal title="Editar Nota" open={isEditModalVisible} onOk={handleEditOk} onCancel={handleEditCancel} width={680} footer={[]} destroyOnClose>
            <NuevaNota nota={notaForEdit} setIsModalVisible={setIsEditModalVisible} />
        </Modal>



    </Card>


}
